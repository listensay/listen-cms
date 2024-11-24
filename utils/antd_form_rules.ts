export const rules = {
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入描述',
      trigger: 'blur',
    },
  ],
  cover: [
    {
      required: true,
      message: '请上传缩略图',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '请输入类型',
      trigger: 'blur',
    },
  ],
}
