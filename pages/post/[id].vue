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

</script>

<template>
  <div>
    <div class="post bg-white rounded-md shadow-md h-full p-6">
      <Head>
        <Title>{{ detail.title }}</Title>
        <Meta name="description" :content="detail.description" />
      </Head>
      <div class="text-lg mb-4">{{ detail.title }}</div>
      <article class="prose prose-slate">{{ detail.content }}</article>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
