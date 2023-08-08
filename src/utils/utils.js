import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export function friendTime(time) {
  if (!time) {
    return dayjs().format('YYYY/M/D')
  }
  if (dayjs(time).isBetween(dayjs().startOf('day'), dayjs().endOf('day'))) {
    return dayjs(time).format('HH:mm')
  } else if (dayjs(time).isBetween(dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day'))) {
    return '昨天'
  } else {
    return dayjs(time).format('YY/M/D')
  }
}