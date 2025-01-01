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
    <div class="p-6 pt-10">
      <article 
        class="mx-auto prose prose-lg prose-slate "
      >
        <div class="mb-8 text-3xl font-bold">{{ detail.title }}</div>
        <div v-html="detail.content"></div>
      </article>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
