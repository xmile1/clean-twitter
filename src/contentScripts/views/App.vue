<script setup lang="ts">
import "uno.css";
import { hideTweetsWithKeyword } from "../scripts/keywordHider";
import { storageDemo } from "~/logic/storage";
const showTurnOffIcon = ref(false);

const toolbarPosition = ref({ top: 0, left: 0 });
const showToolbar = ref(false);
const target = ref<HTMLElement>();
const currentSelectedText = ref("");

const handleSelection = async (event) => {
  // Get the selected text
  const selection = window.getSelection();
  const selectedText = selection.toString();

  if (selectedText) {
    // Get the range of the selection
    const range = selection.getRangeAt(0);
    currentSelectedText.value = selectedText;

    // Get the position of the selection
    const rect = range.getBoundingClientRect();
    const position = {
      left: rect.left + window.scrollX - 24,
      top: rect.top + window.scrollY + 24,
      // width: rect.width,
      // height: rect.height,
    };

    toolbarPosition.value = position;
    await nextTick();
    showToolbar.value = true;

    // Do something with the selected text and position
    console.log("Selec", selectedText);
    console.log("Position:", position);
  }

  //  if no selection and the element does not contain our element, set to false
  console.log("event.target, ", event.target, target.value);
  const toolbar = document.getElementById("vitesse-webext");
  if (!selectedText && toolbar && !toolbar.contains(event.target)) {
    // Handle the click outside event
    console.log("Clicked outside");
    showToolbar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mouseup", handleSelection);
});

watch(
  () => storageDemo.value,
  (keywords) => {
    console.log("did it watch", keywords);
    hideTweetsWithKeyword(keywords.keywords, storageDemo.value.hideTweetCompletely);
  }
);

const handleAddKeyword = (event) => {
  // const selection = window.getSelection();
  // if (!selection) return;
  // const selectedText = selection.toString();

  console.log("selectedText", currentSelectedText.value);
  if (!currentSelectedText.value) return;

  storageDemo.value.keywords.push(currentSelectedText.value);
  showToolbar.value = false;

  // get the selection on the screen
  // if its more than one line do not proceed.
  // storageDemo.value.keywords.push(value);
};
</script>

<template>
  <span
    v-if="showToolbar && storageDemo.showFloatingIcon"
    id="the-special-plugin"
    ref="target"
    class="nn"
    :style="{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px` }"
    @mouseleave="showTurnOffIcon = false"
  >
    <div class="tool">
      <div class="item" @click.stop="handleAddKeyword">
        <svg viewBox="0 0 24 24" @mouseenter="showTurnOffIcon = true">
          <path
            d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
            fill="#1d9bf0"
          />
        </svg>
        <span class="tooltip-text"> Mute tweets with this keyword </span>
      </div>
      <div v-if="showTurnOffIcon" class="item" @click.stop="storageDemo.showFloatingIcon = false">
        <svg viewBox="0 0 24 24">
          <path
            d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13"
            fill="#1d9bf0"
          />
        </svg>
        <span class="tooltip-text"> Turn off floating icon </span>
      </div>
    </div>
  </span>
</template>

<style scoped>
.nn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999999;
  font-family: "TwitterChirp";
  font-size: 12px;
}

.tool {
  position: relative;
  display: flex;
  border-radius: 16px;
  background: rgb(255, 255, 255);
  padding: 2px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
}

.tool svg {
  width: 20px;
  cursor: pointer;
}

.item {
  display: flex;
  border-radius: 20px;
  padding: 4px;
}

.item:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

svg:hover + .tooltip-text {
  visibility: visible;
}

.tooltip-text {
  position: absolute;
  left: -50%;
  bottom: 100%; /* put it on the top */
  background-color: black;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  width: max-content;
  visibility: hidden;
  /* transition: visibility 0.25s ease-in-out; */
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #000000;
    color: #ffffff;
  }
}
</style>
