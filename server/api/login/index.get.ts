import { hellper } from '~/server/utils'

export default defineEventHandler(() => {
  return hellper().success({
    list: [1,2,3],
    count: 19
  })
})