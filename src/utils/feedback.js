import { message, notification } from "ant-design-vue";

export const toast = ({
  type = "success",
  content = "提示语",
  duration = 3,
}) => {
  message.open({
    type,
    content,
    duration,
  });
};

export const notify = ({
  type = "success",
  message = "提示",
  description = "内容",
  duration = 3,
}) => {
  notification.open({
    type,
    message,
    description,
    duration,
  });
};
