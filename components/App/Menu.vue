<script setup>
defineProps({
  tabs: {
    type: Array,
    default: () => []
  },
  router: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['change'])

const changeMenu = (tab, index) => {
  currentPath.value = tab.url
  emits('change', index)
}

const route = useRoute()
const currentPath = ref(route.fullPath)
</script>

<template>
  <div style="width: 256px" class="bg-white border-zinc-100 border rounded-md">
    <div class="p-5">
      <dl>
        <template v-for="item in tabs" :key="item.id">
          <dd v-if="item.items">
            <ul>
              <li 
                v-for="(tab, index) in item.items" :key="tab.url"
                :class="`${currentPath === tab.url ? ' bg-zinc-100 rounded-md' : ''}`"
                @click="changeMenu(tab, index)"
              >
                <template v-if="router">
                  <nuxt-link :to="tab.url" class="block p-4 py-3 my-2 rounded-md">{{ tab.label }}</nuxt-link>
                </template>
                <template v-else>
                  <div class="block p-4 py-3 my-2 rounded-md">{{ tab.label }}</div>
                </template>
              </li>
            </ul>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>