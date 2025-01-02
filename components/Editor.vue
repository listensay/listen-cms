<script setup>
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown'

const content = defineModel()

const editor = useEditor({
  content: content.value,
  extensions: [
    StarterKit, 
    Markdown, 
    Image.configure({
      inline: true,
      allowBase64: true,
    })
  ],
  autofocus: true
})

const addImage = (e) => {
  e.preventDefault()
  visible.value = true
}

const visible = ref(false)
const image = ref('')

watch(image, () => {
  visible.value = false
  if(image.value) {
    editor.value.chain().focus().setImage({ src: image.value, alt: 'photo', title: 'photo' }).run()
  }
})

onMounted(() => {
  editor.value.on('transaction', () => {
    content.value = editor.value.getHTML()
  })
})
</script>

<template>
  <div class="editor h-[600px] overflow-y-auto">
    <div>
      <BubbleMenu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        class="bubble-list"
      >
        <button class="item" :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          <Icon name="bi:type-bold" size="12"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
          <Icon name="bi:type-italic" size="12"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
          <Icon name="bi:type-strikethrough" size="12"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
          <Icon name="bi:code-slash" size="12"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
          <Icon name="bi:code" size="12"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
          <Icon name="bi:chat-left-quote" size="12"></Icon>
        </button>
      </BubbleMenu>
      <FloatingMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }" class="floating-list left-20">
        <button class="item" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <Icon name="bi:type-h2" size="11"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          <Icon name="bi:type-h3" size="11"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
          <Icon name="bi:list-ul" size="11"></Icon>
        </button>
        <button class="item" :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
          <Icon name="bi:list-ol" size="11"></Icon>
        </button>
        <button class="item" @click="addImage">
          <Icon name="material-symbols:add-photo-alternate-rounded" size="11"></Icon>
        </button>
      </FloatingMenu>
      <div class="max-w-full p-4 prose-sm prose">
        <TiptapEditorContent :editor="editor"/>
      </div>
    </div>
    <a-modal v-model:open="visible" title="缩略图选择" width="80vw">
      <Images v-model="image" :choose="true" />
    </a-modal>
  </div>
</template>

<style lang="less">
.editor {
  .ProseMirror {
    outline: none;
  }

  .bubble-list {
    @apply bg-white text-zinc-700 flex items-center p-2 rounded-3xl border-zinc-200 shadow-2xl;
    .item {
      @apply flex items-center text-sm border-r p-2 rounded-sm mx-1 border-none;
      &.is-active {
        @apply bg-slate-200;
      }
    }
  }

  .floating-list {
    @apply bg-white text-zinc-700 flex items-center p-2 rounded-md;
    .item {
      @apply flex items-center bg-slate-900 text-white text-sm border-r p-2 rounded-sm mx-1;
    }
  }
}
</style>