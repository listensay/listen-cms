/**
 * 响应帮助函数
 */
export function hellper() {
  return {
    success: function(data: any = null) {
      return {
        statusCode: 200,
        statusMessage: 'OK',
        success: true,
        body: data ,
      }
    },
    error: function(code: number) {
      switch(code) {
        case 400: 
          throw createError({
            status: code,
            statusMessage: 'Bad Request',
            message: '访问错误',
            stack: ''
          });
        case 401: 
          throw createError({
            status: code,
            statusMessage: 'Bad Request',
            message: '权限不足',
            stack: ''
          });
        default: 
          throw createError({
            status: 500,
            statusMessage: 'Bad Request',
            message: '服务器内部错误',
            stack: ''
          });
      }
    }
  }
}