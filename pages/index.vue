<template>
  <div>
    <!-- Auth view -->
    <template v-if="!isLoggedIn">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-violet-700 mb-1">Welcome to PartySpace</h1>
        <p class="text-gray-500">Sign in or create an account to get started</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AuthLogin @logged-in="onAuth" />
        <AuthRegister @registered="onAuth" />
      </div>
    </template>

    <!-- Dashboard view -->
    <template v-else>
      <Dashboard />
    </template>
  </div>
</template>

<script setup>
const { isLoggedIn, userId } = useAuth()

// Re-check auth on mount (handles page refresh)
onMounted(() => {
  const stored = localStorage.getItem('partySpace_user')
  if (stored) userId.value = parseInt(stored)
})

const onAuth = () => {
  // isLoggedIn is reactive — view will switch automatically
}
</script>
