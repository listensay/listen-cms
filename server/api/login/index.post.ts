export default defineEventHandler(async () => {
  try {
    return hellper().success(await checkPassword('123456', '$2b$10$UClYachgb8tY5f/Avf7g2enMNBxd4ww.fCh9ChdTEduU6TjLYomDm'))
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})