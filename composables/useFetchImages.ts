export default function useFetchImages() {
 return {
  auth: {
    /**
     * 获取图片列表
     * @param page 页码
     * @param total 数量
     * @returns 图片列表
     */
    getImages: async (page: number = 1, total: number = 10, categoryId: number = 0) => {
      return await useRequestGet('/api/images', { page, total, categoryId })
    },
    /**
     * 创建图片
     * @param data 图片数据
     * @returns 图片数据
     */
    createImage: async (data: any) => {
      return await useRequestPost('/api/images', data)
    }
  }
 } 
}