export default function useFetchPost() {
  return {
    getPost(id: number) {
      const result = useRequestGet('/api/post', { id })
      return result
    }
  }
}