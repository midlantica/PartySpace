<template>
  <div class="ps-card">
    <h2 class="text-xl font-semibold text-gray-800 mb-5">Sign In</h2>
    <form @submit.prevent="handleLogin">
      <div class="ps-fieldset">
        <label class="ps-label" for="login-email">Email address</label>
        <input
          id="login-email"
          v-model="form.email"
          type="email"
          class="ps-input"
          placeholder="you@example.com"
          required
          autofocus
        />
      </div>
      <div class="ps-fieldset">
        <label class="ps-label" for="login-password">Password</label>
        <input
          id="login-password"
          v-model="form.password"
          type="password"
          class="ps-input"
          placeholder="••••••••"
          required
        />
      </div>
      <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
      <button type="submit" class="ps-btn-primary w-full mt-1" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign In' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(['logged-in'])
const { login } = useAuth()

const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(form.email, form.password)
    emit('logged-in')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
