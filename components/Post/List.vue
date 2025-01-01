<script setup>
import useHomeStore from '~/stores/home'

const homeStore = useHomeStore()
const { fetchGetPosts } = homeStore
const { posts } = storeToRefs(homeStore)

const page = ref(1)
const pageTotal = ref(10)

try {
  await fetchGetPosts({ page: page.value, total: pageTotal.value })
} catch (error) {
  console.log(error)
}

</script>

<template>
  <div class="w-full h-full p-4 post">
    <ul>
      <li v-for="post in posts" :key="post.id" class="m-6">
        <nuxt-link :to="`/post/${post.id}`" class="flex items-center py-4 pt-0 pb-8">
          <div class="mr-6">
            <img :src="post.cover" class="w-20 h-20 rounded-2xl" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>{{ post.title }}</div>
            </div>
            <time class="block my-2" :datetime="$dayjs(post.updatedAt).toString()">{{ $dayjs(post.updatedAt).format("YYYY-MM-DD").toString() }} </time>
            <div>{{ post.description }}</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped></style>
