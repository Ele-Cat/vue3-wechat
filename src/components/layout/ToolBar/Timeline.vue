<template>
  <div class="timeline" :class="{ fade: visible }">
    <div class="box" :class="{ fade: visible }" :style="style">
      <div class="header" ref="el" :class="{ 'scroll-out': scrollTop >= 300 }">
        <div class="header-left">
          <BellOutlined />
          <RedoOutlined v-if="!isLoading" @click="timelineFetch" />
          <LoadingOutlined v-else />
        </div>
        <i
          class="wechatfont wechat-close"
          title="关闭"
          @click.stop="emit('close')"
        ></i>
        <div class="title" v-show="scrollTop >= 300">朋友圈</div>
      </div>
      <perfect-scrollbar ref="scrollBox">
        <div class="scroll-box">
          <a-watermark v-bind="watermarkModel">
            <div class="cover">
              <img src="http://img.adoutu.com/article/1606320535770.gif" alt="" />
              <div class="user-info">
                <p>{{ useUserInfoStore.user.name }}</p>
                <img
                  :src="useUserInfoStore.user.avatar"
                  alt=""
                  @click.stop="handleAvatarClick"
                />
              </div>
            </div>
            <div class="timeline-box">
              <div
                v-for="item in timelines.data"
                class="timeline-item"
                :key="item.id"
              >
                <img
                  class="avatar"
                  :src="item.avatar"
                  alt=""
                  @click="handleAvatarClick"
                />
                <div class="timeline-info">
                  <span class="author" @click="handleAvatarClick">{{
                    item.author
                  }}</span>
                  <p class="content">{{ item.content }}</p>
                  <div class="img-video">
                    <!-- <video v-if="item.type === 'video'" src="http://ml.v.api.aa1.cn/girl-11-02//video/%E6%88%91%E4%BC%9A%E6%B0%B8%E8%BF%9C%E5%9C%A8%E8%BF%99%E9%87%8C-%E7%AD%89%E4%BD%A0%E5%9B%9E%E5%A4%B4---%E6%8A%96%E9%9F%B3.mp4"></video> -->
                    <video
                      v-if="item.type === 'video'"
                      :src="item.videoUrl"
                      controls
                    />
                    <!-- <div v-if="item.type === 'video'">假装视频</div> -->
                    <div class="img-box" :class="'img-' + item.imgCount" v-else>
                      <a-image-preview-group>
                        <a-image
                          src="http://img.adoutu.com/article/1606320535073.gif"
                          v-for="(img, idx) in item.imgCount"
                          :key="idx"
                          alt=""
                          :previewMask="false"
                        />
                      </a-image-preview-group>
                      <!-- <img :src="item.avatar" v-for="(img, idx) in item.imgCount" :key="idx" alt=""> -->
                    </div>
                  </div>
                  <div class="timeline-extra">
                    <p>{{ friendTime(item.time) }}</p>
                    <div class="more">
                      <div class="handler" v-if="item.handlerVisible">
                        <div @click="handleLike(item)">
                          <HeartOutlined />
                          赞
                        </div>
                        <div @click="handleRemark(item)">
                          <MessageOutlined />
                          评论
                        </div>
                      </div>
                      <ellipsis-outlined ref="moreHandler" class="extra-more" @click="item.handlerVisible = true" />
                    </div>
                  </div>
                  <div
                    class="star-remark"
                    v-if="item.starUser || item.remarkLists"
                  >
                    <div
                      class="star-box"
                      v-if="item.starUser && item.starUser.length"
                    >
                      <HeartOutlined class="star" />
                      <div v-for="(n, i) in item.starUser" :key="i">
                        <span class="user" @click="handleAvatarClick">{{
                          n
                        }}</span
                        ><span v-if="i < item.starUser.length - 1">，</span>
                      </div>
                    </div>
                    <div
                      class="gutter"
                      v-if="
                        item.starUser &&
                        item.starUser.length &&
                        item.remarkLists &&
                        item.remarkLists.length
                      "
                    ></div>
                    <div
                      class="remark-box"
                      v-if="item.remarkLists && item.remarkLists.length"
                    >
                      <div
                        v-for="(n, i) in item.remarkLists"
                        :key="i"
                        class="remark-item"
                      >
                        <span class="user" @click="handleAvatarClick">{{
                          n.user
                        }}</span
                        >：<span class="content">{{ n.content }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-watermark>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
  <RelativeBox :visible="infoVisible" @close="infoVisible = false">
    <UserInfo :user="user" type="own" />
  </RelativeBox>
</template>
<script setup>
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import { onMounted, reactive, ref, watch } from "vue";
import { useDraggable, useScroll, onClickOutside } from "@vueuse/core";
import {
  BellOutlined,
  RedoOutlined,
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { friendTime } from "@/utils/utils";
import RelativeBox from "@/components/common/RelativeBox/Index.vue";
import UserInfo from "@/components/common/UserInfo/Index.vue";
import useStore from "@/store";
import Mock from "mockjs";
import { getVideoApi } from "@/api/timeline";
const { useUserInfoStore, useRelativeBoxStore } = useStore();

const user = ref({})
watch(() => useUserInfoStore.user, (newVal) => {
  user.value = newVal
}, {
  immediate: true,
  deep: true,
})

const props = defineProps({
  visible: {
    // 标题
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits();

const el = ref();
const { x, y, style } = useDraggable(el, {
  initialValue: {
    x: window.innerWidth / 2 - 250,
    y: 50,
  },
});

const infoVisible = ref(false);
// 点击头像，展示信息
const handleAvatarClick = (e) => {
  infoVisible.value = true;
  useRelativeBoxStore.showBox(e.clientY, e.clientX);
};

const getVideo = async () => {
  const { data } = await getVideoApi();
  return data.mp4;
};

const timelines = ref([]);
onMounted(async () => {
  timelines.value = reactive(
    Mock.mock({
      "data|10-30": [
        {
          id: "@guid",
          content: "@ctitle(8, 100)",
          author: "@cname",
          time: "@date('yyyy-MM-dd')",
          "type|1": ["image", "video"],
          videoUrl: await getVideo(),
          "starUser|0-12": ["@cname"],
          "remarkLists|0-6": [
            {
              user: "@cname",
              content: "@ctitle(6, 80)",
            },
          ],
          "imgCount|1": [1, 2, 3, 4, 5, 6, 7, 8, 9],
          avatar: "@dataImage('44x44', '@author')",
          handlerVisible: false,
        },
      ],
    })
  );
});

const isLoading = ref(false)
const timelineFetch = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}

const scrollBox = ref(null);
const { y: scrollTop } = useScroll(scrollBox);

const watermarkModel = reactive({
  content: "演示水印",
  font: {
    fontSize: 22,
  },
  rotate: -35,
  gap: [100, 100],
});

const handleLike = (item) => {
  item.handlerVisible = false
  console.log('item: ', item);
}

const handleRemark = (item) => {
  item.handlerVisible = false
}

const moreHandler = ref(null)
onClickOutside(moreHandler, (event) => {
  timelines.value.data.map(item => {
    item.handlerVisible = false
  })
})
</script>

<style lang="less" scoped>
.timeline {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  user-select: none;
  display: none;

  &.fade {
    display: block;
    transition: background 0.4s;
    background: rgba(0, 0, 0, 0.05);
  }

  .box {
    width: 500px;
    height: calc(100vh - 100px);
    background: #fff;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    opacity: 0;
    box-shadow: 0 0 4px #666;
    overflow: hidden;
    &.fade {
      transition: opacity 0.4s;
      opacity: 1;
    }

    .header {
      width: 100%;
      display: flex;
      position: absolute;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: move;
      z-index: 9999;
      background-color: transparent;
      color: #fff;
      transition: background 0.3s;

      &.scroll-out {
        background-color: #ededed;
        color: #7b7b7b;
      }

      .header-left {
        display: flex;
        align-items: center;
        height: 100%;

        .anticon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 100%;
          line-height: 100%;
          cursor: pointer;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }

      i {
        font-size: 14px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: #fa5151;
        }
      }

      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
      }
    }

    .cover {
      position: relative;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        object-fit: cover;
      }

      .user-info {
        position: absolute;
        bottom: -12px;
        right: 24px;
        display: flex;
        align-items: center;

        p {
          color: #fff;
          margin-top: -18px;
        }

        img {
          width: 60px;
          height: 60px;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }

    .timeline-box {
      padding: 2px 24px 20px;
      font-size: 14px;

      .timeline-item {
        display: flex;
        padding: 24px 0 0;

        .avatar {
          width: 36px;
          height: 36px;
          margin-right: 14px;
          border-radius: 4px;
          cursor: pointer;
        }

        .timeline-info {
          flex: 1;
          border-bottom: 1px solid #f3f3f3;
          padding-bottom: 14px;

          .author {
            color: #576b95;
            line-height: 1.6;
            cursor: pointer;
          }

          .content {
            line-height: 1.4;
            margin-top: 4px;
            word-break: break-all;
            user-select: text;
          }

          .img-video {
            margin-top: 10px;

            .img-box {
              display: flex;
              flex-wrap: wrap;

              :deep(.ant-image) {
                width: 126px;
                height: 126px;
                margin: 0 4px 4px 0;

                .ant-image-img {
                  height: 100%;
                  object-fit: cover;
                  cursor: pointer;
                }
              }

              &.img-1 {
                :deep(.ant-image) {
                  width: auto;
                  max-width: 300px;
                  height: auto;
                }
              }

              &.img-4 {
                :deep(.ant-image):nth-of-type(2n) {
                  margin-right: 130px;
                }
              }
            }

            video {
              display: block;
              max-width: 40%;
              max-height: 140px;
              object-fit: contain;
            }
          }

          .timeline-extra {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            font-size: 12px;
            color: #999;

            .more {
              position: relative;

              .handler {
                width: 184px;
                height: 38px;
                line-height: 38px;
                position: absolute;
                left: -188px;
                top: -10px;
                display: flex;
                border-radius: 6px;
                color: #eee;
                font-size: 14px;
                overflow: hidden;

                div {
                  position: relative;
                  flex: 1;
                  text-align: center;
                  cursor: pointer;
                  background-color: #4c4c4c;

                  &:nth-of-type(1)::after {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 9px;
                    width: 1px;
                    height: 20px;
                    background-color: #454545;
                  }

                  span {
                    margin-right: 4px;
                  }

                  &:hover {
                    background-color: #444444;
                  }
                }
              }

              .extra-more {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 32px;
                height: 20px;
                border-radius: 4px;
                color: #576b95;
                font-size: 18px;
                cursor: pointer;
                background-color: #f7f7f7;

                &:hover {
                  background-color: #dedede;
                }
              }
            }
          }

          .star-remark {
            margin: 16px 0 0;
            padding: 14px;
            border-radius: 6px;
            background-color: #f9f9f9;
            line-height: 18px;

            .star-box {
              display: flex;
              flex-wrap: wrap;
              color: #576b95;
              line-height: 20px;

              .star {
                margin-right: 12px;
                font-size: 16px;
              }

              .user {
                cursor: pointer;

                &:hover {
                  text-decoration: underline;
                }
              }
            }

            .gutter {
              height: 6px;
            }

            .remark-box {
              .remark-item {
                margin-bottom: 4px;

                &:nth-last-of-type(1) {
                  padding-bottom: 0;
                }

                .user {
                  cursor: pointer;
                  color: #576b95;
                }

                .content {
                  user-select: text;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
