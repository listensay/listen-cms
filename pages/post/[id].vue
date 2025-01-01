<script setup>
import useHomeStore from '~/stores/home'

const route = useRoute()
const id = route.params.id
const homeStore = useHomeStore()
const { fetchGetPost } = homeStore

const detail = ref(null)

try {
  const reuslt = await fetchGetPost(id)
  detail.value = reuslt
} catch (error) {
  console.log(error)
}

await useFetchPost().viewPost(id)

useHead({
  title: detail.value.title,
  meta: [
    {
      name: 'description',
      content: detail.value.description,
    },
  ],
})
</script>

<template>
  <div>
    <div class="p-6 pt-10">
      <article 
        class="mx-auto prose prose-lg prose-slate "
      >
        <div class="mb-8 text-3xl font-bold">{{ detail.title }}</div>
        <div class="flex items-center text-sm text-gray-500">
          <time class="block my-2" :datetime="$dayjs(detail.updatedAt).toString()">发布时间 {{ $dayjs(detail.updatedAt).format("YYYY-MM-DD").toString() }} </time>
           <div class="mx-2"> · </div>
          <div>阅读 {{ detail.views }}</div>
        </div>
        <div v-html="detail.content"></div>
      </article>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
