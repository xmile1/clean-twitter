<script setup lang="ts">
import 'uno.css'
import { hideTweetsWithKeyword } from '../scripts/keywordHider'
import { storageDemo } from '~/logic/storage'
import { useAddKeyword } from '~/composables/useAddKeyword'
import IconVolumeMute from '~icons/mdi/volume-mute'
import IconPower from '~icons/mdi/power'

const showTurnOffIcon = ref(false)
const toolbarPosition = ref({ top: 0, left: 0 })
const showToolbar = ref(false)
const currentSelectedText = ref('')

const { addKeyword } = useAddKeyword()

const handleTextSelection = async (event: any) => {
  const selection = window.getSelection()
  const selectedText = selection ? selection.toString() : null

  if (selection && selectedText) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    toolbarPosition.value = {
      left: rect.left + window.scrollX - 24,
      top: rect.top + window.scrollY + 24,
    }

    currentSelectedText.value = selectedText
    showToolbar.value = true
  }

  // hide toolbar on click outside
  const toolbar = document.getElementById(__NAME__)
  if (!selectedText && toolbar && !toolbar.contains(event.target))
    showToolbar.value = false
}

onMounted(() => {
  document.addEventListener('mouseup', handleTextSelection)
})

watch(
  () => storageDemo.value,
  (localStorage) => {
    hideTweetsWithKeyword(localStorage.keywords, storageDemo.value.hideTweetCompletely)
  },
)

const handleAddKeyword = () => {
  addKeyword(currentSelectedText.value)
  showToolbar.value = false
}

const handleTurnOffFloatingIcon = () => {
  storageDemo.value.showFloatingIcon = false
  showToolbar.value = false
}
</script>

<template>
  <span
    v-if="showToolbar && storageDemo.showFloatingIcon"
    class="toolbar"
    :style="{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px` }"
    @mouseleave="showTurnOffIcon = false"
  >
    <div class="tools">
      <div class="tool" @click.stop="handleAddKeyword">
        <IconVolumeMute class="h-20px w-20px text-#1d9bf0 cursor-pointer" @mouseenter="showTurnOffIcon = true" />
        <span class="tooltip-text"> Mute tweets with this keyword </span>
      </div>
      <div v-if="showTurnOffIcon" class="tool" @click.stop="handleTurnOffFloatingIcon">
        <IconPower class="h-20px w-20px text-#1d9bf0 cursor-pointer" />
        <span class="tooltip-text"> Turn off floating icon </span>
      </div>
    </div>
  </span>
</template>

<style scoped>
.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999999;
  font-family: "TwitterChirp";
  font-size: 12px;
}

.tools {
  position: relative;
  display: flex;
  border-radius: 16px;
  background: rgb(255, 255, 255);
  padding: 2px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
}

.tool {
  display: flex;
  border-radius: 20px;
  padding: 4px;
}

.tool:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.tooltip-text {
  position: absolute;
  left: -50%;
  bottom: 100%;
  background-color: rgb(46, 46, 46);
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  width: max-content;
  visibility: hidden;
}
svg:hover + .tooltip-text {
  visibility: visible;
}
</style>
