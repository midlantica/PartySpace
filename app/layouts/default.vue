<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
