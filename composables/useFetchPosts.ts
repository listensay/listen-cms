export interface pageInfo {
  page: number
  total: number
}

export default function useFetchPosts() {
  return {
    getPosts(data: pageInfo) {
      const result = useRequestGet('/api/posts', { ...data })
      return result
    }
  }
}