import fs from 'fs'
import formidable from 'formidable'

// 上传路径
const uploadDir = './public/images/'

// 创建上传目录
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export default defineEventHandler(async (event) => {

  const user = useAuth(event)
  if(!user) {
    setResponseStatus(event, 401)
    return hellper().error(401, '未登录', false)
  }

  // 上传配置
  const form = formidable({
    uploadDir,
    multiples: true, // 支持多文件
    maxFileSize: 20 * 1024 * 1024, // 5MB 大小限制
    keepExtensions: true, // 保留文件扩展名
    // 文件名重命名
    filename: (name: string, ext: string) => {
      return `${name}-${new Date().getTime()}${ext}`
    },
    // 文件过滤
    filter: (part: any) => {
      // 判断文件名是否为图片格式
      if (part.originalFilename?.match(/\.(jpg|jpeg|png)$/i)) {
        return true
      }
      return false
    }
  })

  const upload = () => {
    return new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, _fields, files: any) => {
        if (err) {
          if (err.message.includes('options.maxTotalFileSize')) {
            return reject(new Error('图片超出限制！最大限制 5MB'))
          }
          return reject(err)
        }

        const result = []
        for (const key in files) {
          result.push({
            name: files[key][0].newFilename,
            url: '/images/' + files[key][0].newFilename
          })
        }
        resolve(result)
      })
    })
  }

  try {
    const data = await upload()
    return hellper().success('上传成功', data)
  } catch (err: any) {
    console.log(err)
    return hellper().error(400, '上传失败！')
  }
})
