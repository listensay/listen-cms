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
    <div class="h-full p-6 bg-white post">
      <div class="mb-4 text-lg">{{ detail.title }}</div>
      <article 
        class="max-w-full prose prose-slate"
        v-html="detail.content"
      />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
