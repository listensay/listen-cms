const useAuth = (event: any) => {
  if(event.context.auth.success) {
    return event.context.auth.user
  } else {
    return false
  }
}

export default useAuth