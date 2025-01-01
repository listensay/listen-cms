<script setup>
import useHomeStore from '~/stores/home'

const tabs = [
  {
      label: '基本管理',
      id: 1,
      items: [
        {
            label: 'Home',
            icon: 'pi pi-chart-pie',
            url: '/'
        },
        {
          label: 'About',
            icon: 'pi pi-home',
            url: '/about'
        },
      ]
  }
]

const homeStore = useHomeStore()
const result = await homeStore.fetchGetCategorys({ page: 1, total: 10, type: 1 })
const categorys = ref(result.list)
</script>

<template>
  <div class="h-[100vh] p-16 mx-auto overflow-hidden">
    <div class="flex w-full h-full overflow-auto border-2 border-black rounded-md shadow-lg">
      <div class="flex-shrink-0 w-64 border-r-2 border-black">
        <AppMenu :tabs="tabs" :border="false" rounded="" color="bg-[#f5f3ff]" />
      </div>
      <div class="relative flex-1">
        <div class="flex items-center w-full h-16 px-6 border-b-2 border-black shadow-sm bg-green-50">
          <div v-for="item in categorys" :key="item.id" class="mr-2 last:mr-0">
            {{ item.name }}
          </div>
        </div>
        <div class="flex" style="height: calc(100% - 4rem);">
          <div class="flex-shrink-0 border-r-2 border-black w-72 bg-rose-50">
            <div>
              <img src="@/assets/images/avatar.png" alt="avatar">
              <div class="relative h-full p-4 -mt-8 bg-rose-50 rounded-t-3xl">
                <div class="mb-2 text-xl">背影如正面</div>
                <div>不要倒在黎明前的黑夜里</div>
              </div>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto bg-orange-50">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
