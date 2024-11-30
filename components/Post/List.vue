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
  <div class="post bg-white p-4 w-full h-full rounded-md shadow-md">
    <ul>
      <li v-for="post in posts" :key="post.id" class="border-b m-6 last:border-b-0">
        <nuxt-link :to="`/post/${post.id}`" class="flex  py-4 pt-0 pb-8">
          <div class="mr-4">
            <NuxtImg :src="post.cover" width="40" height="40" class="rounded-full" />
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-center mb-2 font-medium">
              <div>{{ post.title }}</div>
              <time :datetime="$dayjs(post.updatedAt).toString()"> {{ $dayjs(post.updatedAt).toString() }} </time>
            </div>
            <div class="mb-2 text-xs">{{ post.author.nickname }}</div>
            <div class="text-slate-600">{{ post.description }}</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped></style>
