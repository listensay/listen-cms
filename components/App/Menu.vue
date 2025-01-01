<script setup>
defineProps({
  tabs: {
    type: Array,
    default: () => []
  },
  router: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'bg-white'
  },
  border: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: String,
    default: 'rounded-md'
  },
  textColor: {
    type: String,
    default: 'text-gray-900'
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
  <div :class="`${color} ${ border ? 'border-zinc-100': 'border-none' } border ${textColor} ${rounded} h-full`">
    <div class="p-5">
      <dl>
        <div v-for="item in tabs" :key="item.id">
          <dd v-if="item.items">
            <ul>
              <li 
                v-for="(tab, index) in item.items" :key="tab.url"
                :class="`${currentPath === tab.url ? ' bg-black text-white rounded-3xl' : ''}`"
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
        </div>
      </dl>
    </div>
  </div>
</template>