<template>
  <div>
    <!-- Auth view -->
    <template v-if="!loggedIn">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1a3a8f] mb-1">Welcome to PartySpace</h1>
        <p class="text-gray-500">Sign in or create an account to get started</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AuthLogin />
        <AuthRegister />
      </div>
    </template>

    <!-- Dashboard view -->
    <template v-else>
      <Dashboard />
    </template>
  </div>
</template>

<script setup>
  const { loggedIn } = useUserSession()
</script>
