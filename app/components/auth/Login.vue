<template>
  <div>
    <h2 class="text-xl font-bold mb-1">Sign In</h2>
    <div v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</div>
    <div class="mb-3">
      <label class="ps-label">Email address</label>
      <input v-model="email" type="email" class="ps-input" placeholder="you@example.com" />
    </div>
    <div class="mb-4">
      <label class="ps-label">Password</label>
      <input v-model="password" type="password" class="ps-input" placeholder="••••••••" />
    </div>
    <UiButton variant="blue" corners="full" size="md" class="w-full" @click="handleLogin">
      Sign In
    </UiButton>
  </div>
</template>

<script setup>
  const { login } = useAuth()
  const email = ref('')
  const password = ref('')
  const error = ref('')

  const handleLogin = async () => {
    error.value = ''
    try {
      await login(email.value, password.value)
    } catch (e) {
      error.value = e.message || 'Login failed'
    }
  }
</script>
