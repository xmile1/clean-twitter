<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
import IconClean from '~icons/carbon/clean'
import { useAddKeyword } from '~/composables/useAddKeyword'

const newKeyword = ref('')
const { addKeyword } = useAddKeyword()

const handleChange = () => {
  addKeyword(newKeyword.value)
  newKeyword.value = ''
}

const handleRemoveKeyword = (index: number) => {
  storageDemo.value.keywords.splice(index, 1)
}
</script>

<template>
  <main class="w-[300px] text-gray-700">
    <div class="px-6 py-4 flex items-center">
      <IconClean class="text-xl" color="#1d9bf0" />
      <h1 class="text-base font-bold ml-2">
        Clean twitter (X.com)
      </h1>
    </div>

    <hr>

    <div class="px-7 pt-4 flex flex-col">
      <h3 class="text-sm font-bold">
        Keywords
      </h3>
      <div
        class="border border-gray100 rounded mt-1 p-2 flex flex-wrap items-start h-160px overflow-auto"
      >
        <div class="flex flex-wrap items-start overflow-y-auto gap-1">
          <div
            v-for="(keyword, index) in storageDemo.keywords"
            :key="keyword"
            class="pill"
          >
            {{ keyword }}
            <button
              class="cursor-pointer text-base"
              @click="handleRemoveKeyword(index)"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <textarea
        v-model="newKeyword"
        autofocus
        class="border border-gray300 mt-3 rounded p-2 resize-none"
        placeholder="Enter a new keyword and press enter to add it"
        @keyup.enter="handleChange"
      />
      <button
        :disable="!newKeyword"
        class="mt-2 bg-#1d9bf0 text-white px-4 py-2 rounded font-bold"
        @click="handleChange"
      >
        Add keyword
      </button>
    </div>

    <hr class="my-4">

    <div class="px-7 pb-4 flex flex-col">
      <h3 class="text-sm font-bold">
        Options
      </h3>
      <div class="mt-1 flex gap-2">
        <input
          id="show-icon"
          v-model="storageDemo.showFloatingIcon"
          type="checkbox"
          name="show-icon"
        >
        <label for="show-icon">Show floating icon</label>
      </div>

      <div class="mt-1 flex gap-2">
        <input
          id="hide-tweet"
          v-model="storageDemo.hideTweetCompletely"
          type="checkbox"
          name="hide-tweet"
        >
        <label for="hide-tweet">Hide matched tweet completely</label>
      </div>

      <div class="mt-1 flex gap-2">
        <input
          id="hide-ads"
          v-model="storageDemo.hideTwitterAds"
          type="checkbox"
          name="hide-ads"
        >
        <label for="hide-ads">Hide Ads</label>
      </div>

      <div class="mt-1 flex gap-2">
        <input
          id="hide-ads"
          v-model="storageDemo.hideTwitterAdsCompletely"
          type="checkbox"
          name="hide-ads"
        >
        <label for="hide-ads">Hide Ads completely</label>
      </div>

      <div class="mt-1 flex gap-2">
        <input
          id="hide-follow-people"
          v-model="storageDemo.hidePeopleToFollowSuggestion"
          type="checkbox"
          name="hide-follow-people"
        >
        <label for="hide-follow-people">Hide People to follow suggestions</label>
      </div>

      <div class="mt-1 flex gap-2">
        <input
          id="hide-subscribe"
          v-model="storageDemo.hideSubscriptionSuggesstion"
          type="checkbox"
          name="hide-subscribe"
        >
        <label for="hide-subscribe">Hide Subscribe suggestions</label>
      </div>
      <!-- Hide ads completely -->
    </div>
  </main>
</template>

<style scoped>
.pill {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 12px;
  padding: 0 8px;
  height: min-content;
  word-break: break-all;
  gap: 8px
}

input[type="checkbox"] {
  accent-color: #1d9bf0;
}
</style>
