<script setup lang="ts">
  const props = defineProps<{
    title: string;
    isOpened: boolean;
    onClose: () => void;
    onSubmit: () => void;
  }>();
</script>

<template>
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    :class="{
      'flex overflow-y-auto overflow-x-hidden fixed items-center justify-center z-50 w-full h-screen top-0 left-0': true,
      hidden: !props.isOpened,
    }"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black opacity-50" @click="onClose"></div>

    <div class="relative p-4 w-full max-w-2xl max-h-full items-center">
      <div class="relative rounded-lg shadow bg-white">
        <!-- Header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600"
        >
          <h3 class="text-xl font-semibold text-primary">{{ props.title }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="default-modal"
            @click="onClose"
          >
            <img src="@/assets/icons/close-icon.svg" width="26" height="26" />
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <slot />
        </div>
        <!-- Footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-600 rounded-b">
          <button
            data-modal-hide="default-modal"
            type="submit"
            class="text-white bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="onSubmit"
          >
            Submit
          </button>
          <button
            data-modal-hide="default-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-red focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            @click="onClose"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
