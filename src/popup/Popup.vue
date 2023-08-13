<script setup lang="ts">
import { storageDemo } from "~/logic/storage";
const newKeyword = ref("");

const handleChange = () => {
  if (!newKeyword.value.trim()) return;
  // check if it exists
  if (storageDemo.value.keywords.includes(newKeyword.value.trim())) return;

  storageDemo.value.keywords.unshift(newKeyword.value);
  newKeyword.value = "";
};

const handleRemoveKeyword = (index: number) => {
  storageDemo.value.keywords.splice(index, 1);
};

const blockedWords = computed(() => {
  return storageDemo.value.keywords;
});
</script>

<template>
  <main class="w-[300px] text-gray-700">
    <div class="px-6 py-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="clean-icon">
        <title>delete-variant</title>
        <path
          d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z"
        />
      </svg>
      <h1 class="text-base font-bold ml-2">Clean twitter</h1>
    </div>
    <hr />
    <div class="px-7 pt-4 flex flex-col">
      <h3 class="text-sm font-bold">Keywords</h3>
      <div
        class="border border-gray100 rounded mt-1 pill-container flex flex-wrap items-start h-160 overflow-auto"
      >
        <div class="flex flex-wrap items-start overflow-y-auto gap-1">
          <div
            v-for="(keyword, index) in blockedWords"
            :key="keyword"
            class="pill align-self-start break-all"
          >
            {{ keyword
            }}<button class="close-button" @click="handleRemoveKeyword(index)">&times;</button>
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
    <hr class="my-4" />
    <div class="px-7 pb-4 flex flex-col">
      <h3 class="text-sm font-bold">Options</h3>
      <div class="form-group mt-1 flex gap-2">
        <input
          id="show-icon"
          v-model="storageDemo.showFloatingIcon"
          type="checkbox"
          class="text-green-500"
          name="show-icon"
        />
        <label for="show-icon">Show floating icon</label>
      </div>
      <div class="form-group mt-1 flex gap-2">
        <input
          id="hide-tweet"
          v-model="storageDemo.hideTweetCompletely"
          type="checkbox"
          name="hide-tweet"
        />
        <label for="hide-tweet">Hide matched tweet completely</label>
      </div>

      <!-- Uspport mute from home time line  -->
    </div>
  </main>
</template>

<style scoped>
.pill-container {
  height: 160px;
  overflow: auto;
  padding: 8px;
}

.pill {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 12px;
  padding: 0 8px;
  height: min-content;
}

.close-button {
  margin-left: 8px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.clean-icon {
  width: 24px;
}

input[type="checkbox"] {
  accent-color: #1d9bf0;
}
</style>
