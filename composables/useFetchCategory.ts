export default function useCategoryFetch() {
  return {
    auth: {
      /**
       * 获取分类列表
       * @param page 页码
       * @param total 数量
       * @param type 类型 0:文章, 1:图片
       * @returns 分类列表
       */
      getCategories: async (page: number = 1, total: number = 10, type: number = 0) => {
        return await useRequestGet('/api/auth/category', { page, total, type})
      }
    }
  }
}