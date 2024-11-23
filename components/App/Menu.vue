<script setup>
defineProps({
  tabs: Array
})

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
                v-for="tab in item.items" :key="tab.url"
                :class="`${currentPath === tab.url ? ' bg-zinc-100 rounded-md' : ''}`"
                @click="currentPath = tab.url"
              >
                <nuxt-link :to="tab.url" class="block p-4 py-3 my-2 rounded-md">{{ tab.label }}</nuxt-link>
              </li>
            </ul>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>