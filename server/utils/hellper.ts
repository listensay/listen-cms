/**
 * 响应帮助函数
 */
export function hellper() {
  return {
    success: function(message: string, data: any = null, ) {
      return {
        statusCode: 200,
        message,
        success: true,
        body: data,
      }
    },
    error: function(code?: number, message?: string, isThrow: boolean = true) {
      if(isThrow) {
        switch(code) {
          case 400: 
            throw createError({
              status: code,
              statusMessage: 'Bad Request',
              message,
              stack: ''
            })
          case 401: 
            throw createError({
              status: code,
              statusMessage: 'Bad Request',
              message: '权限不足',
              stack: ''
            })
          default: 
            throw createError({
              status: 500,
              statusMessage: 'Bad Request',
              message: '服务器内部错误',
              stack: ''
            })
        }
      } else {
        switch(code) {
          case 400: 
            return {
              statusCode: 400,
              message,
              success: false,
              body: null,
            }
          case 401: 
            return {
              statusCode: 401,
              message,
              success: false,
              body: null,
            }
          default: 
            return {
              statusCode: 500,
              message,
              success: false,
              body: null,
            }
        }
      }
    }
  }
}