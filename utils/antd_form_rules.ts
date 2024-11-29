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
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  avatar: [
    {
      required: true,
      message: '请上传头像',
      trigger: 'change',
    },
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur',
    },
  ],
  desc: [
    {
      required: true,
      message: '请输入个人简介',
      trigger: 'blur',
    },
  ]
}
