<script setup>
const submit = () => {

}
</script>

<template>
  <div class="login">
    <div class="flex h-[100vh]">
      <div class="flex-1 flex justify-center items-center">
        <div>
          <div class="mb-4 text-3xl">Hello</div>
          <div class="mb-8 text-zinc-600">欢迎使用Listenc-cms</div>

          <form @submit="submit">
            <div class="mb-4">
              <FloatLabel>
                <InputText id="username" v-model="value" />
                <label for="username">Username</label>
              </FloatLabel>
            </div>
            <div class="mb-4">
              <FloatLabel>
                <InputText id="username" v-model="value" />
                <label for="username">Username</label>
              </FloatLabel>
            </div>
            <div class="mb-6">
              <Button label="Submit" />
            </div>

            <button>123</button>

          </form>
        </div>
      </div>
      <div class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
