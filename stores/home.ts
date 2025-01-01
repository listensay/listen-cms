const useHomeStore = defineStore('home', () => {
  const posts = ref(null)

  const fetchGetPosts = async (data: pageInfo) => {
    try {
      const result = await useFetchPosts().getPosts(data)
      posts.value = result.body.posts
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetPost = async (id: number) => {
    try {
      const result = await useFetchPost().getPost(id)
      return result.body
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetCategorys = async (data: CategoryPageInfo) => {
    try {
      const result = await useFetchCategory().getCategories(data)
      return result.body
    } catch (error) {
      console.log(error)
    }
  }

  return {
    posts,
    fetchGetPosts,
    fetchGetPost,
    fetchGetCategorys
  }
})

export default useHomeStore