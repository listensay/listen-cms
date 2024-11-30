export interface pageInfo {
  page: number
  pageSize: number
}

export default function useFetchPosts() {
  return {
    getPosts(data: pageInfo) {
      const result = useRequestGet('/api/posts', { ...data })
      return result
    }
  }
}