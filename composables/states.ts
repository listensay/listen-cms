export const useUser = () => useState('user', () => {
  return {
    isLogin: !!useCookie('token'),
    userinfo: {}
  }
})

export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
