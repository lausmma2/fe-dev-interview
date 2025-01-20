<script setup lang="ts">
  const props = defineProps<{
    title: string;
    isOpened: boolean;
    // eslint-disable-next-line func-call-spacing
    onClose: () => void;
  }>();
</script>

<template>
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    :class="{
      'flex overflow-y-auto overflow-x-hidden fixed items-center justify-center z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full': true,
      hidden: !props.isOpened,
    }"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative rounded-lg shadow bg-gray-200">
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
        <!-- Body -->
        <div class="p-4 md:p-5 space-y-4">
          <slot />
        </div>
        <!-- Footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-600 rounded-b">
          <button
            data-modal-hide="default-modal"
            type="button"
            class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            I accept
          </button>
          <button
            data-modal-hide="default-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-red focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            @click="onClose"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
