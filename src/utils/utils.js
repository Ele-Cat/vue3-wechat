import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import pinyin from 'js-pinyin';
import Mock from "mockjs";

/**
 * 返回友好的时间信息
 * @param {dateTime} datetime dayjs时间
 * @param {string} type 类型：默认date 可选：datetime
 * @returns 
 */
export function friendTime(time, type) {
  if (!time) {
    return dayjs().format('YYYY/M/D')
  }
  if (dayjs(time).isBetween(dayjs().startOf('day'), dayjs().endOf('day'))) {
    return dayjs(time).format('HH:mm')
  } else if (dayjs(time).isBetween(dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day'))) {
    return type === 'datetime' ? dayjs(time).format('昨天 HH:mm') : '昨天'
  } else {
    return dayjs(time).format(type === 'datetime' ? 'YYYY年M月D日 HH:mm' : 'YY/M/D')
  }
}

/**
 * 返回通过拼音A-Z排序后的数组
 * @param {array} list 原数组
 * @param {string} sign 标志属性
 * @returns [{
 *   initial: 'A',
 *   children: [{name: '阿真'}, {name: '阿强'}]
 * },{
 *   initial: 'C',
 *   children: [{name: 'c'}, {name: '层次'}]
 * },{
 *   initial: '#',
 *   children: [{name: '**'}, {name: '123'}]
 * }]
 */
export function listSortByPinyin(list, sign = 'name') {
  let letterObj = {};
  letterObj['#'] = []
  list.map((item) => {
    item.pinyin = pinyin.getFullChars(item[sign]);
    const Initials = item.pinyin[0].toUpperCase();
    const pattern = new RegExp("[`\\-~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？12345678990]"); //特殊符号
    // 如果对象里有当前字母项则直接 push 一个对象,如果没有则创建一个新的键并赋值;
    if (pattern.test(Initials)) {
      // 处理起始为特殊字符
      letterObj['#'].push(item);
    } else if (letterObj[Initials]) {
      letterObj[Initials].push(item);
    } else {
      letterObj[Initials] = [item];
    }
  });
  // 将数据转为数组，并按字母顺利排列
  let filterData = [];
  for (let key in letterObj) {
    // 对子列表先进行一次排序
    letterObj[key].sort((a, b) => {
      return a.pinyin.localeCompare(b.pinyin);
    });
    const obj = { letter: key, list: letterObj[key] };
    filterData.push(obj);
  }
  // 对外层数组进行排序
  filterData.sort((a, b) => {
    return a.letter.localeCompare(b.letter);
  });
  // 处理特殊字符#
  let noSpecialLetterArr = filterData.find(item => item.letter === '#')['list'].length === 0
  if (noSpecialLetterArr) {
    // 如果没有特殊字符的类型，移除
    filterData.shift()
  } else {
    // 如果有特殊字符的类型，移到最后去
    filterData = filterData.concat(filterData.shift())
  }

  return filterData
}

/**
 * 获取已使用的LocalStorage大小
 * @returns 0.12MB（以MB为单位）
 */
export function getUsedLocalStorageSize() {
  let usedSize = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    usedSize += key.length + value.length;
  }

  return (usedSize / (1024 * 1024)).toFixed(2);
}

/**
 * 返回一个随机id
 * @returns 返回一个随机id
 */
export function guid() {
  return Mock.mock("@guid")
}