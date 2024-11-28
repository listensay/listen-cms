<script setup>
let user

try {
  user = await useFetchUserProfile().auth.getUserInfo()
} catch (error) {
  console.log(error)
}

console.log(user)
</script>

<template>
  <div class="profile">
    <div class="h-full flex">
      <div class="bg-white rounded-lg shadow-xl pb-8 w-96 mr-6">
          <div class="w-full h-[200px]">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg">
          </div>
          <div class="flex flex-col items-center -mt-20">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" class="w-36 border-4 border-white rounded-full">
              <div class="flex items-center space-x-2 mt-2 mb-2">
                  <p class="text-2xl">Amanda Ross</p>
              </div>
              <p class="text-gray-700 mb-2">Senior Software Engineer at Tailwind CSS</p>
              <p class="text-sm text-gray-500 mb-2">New York, USA</p>
          </div>
      </div>

      <!-- <div class="bg-white rounded-lg shadow-xl flex-1">
        123
      </div> -->

    </div>
  </div>
</template>

<style lang="less" scoped></style>
