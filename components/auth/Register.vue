<template>
  <div class="ps-card">
    <h2 class="text-xl font-semibold text-gray-800 mb-1">Create Account</h2>
    <p class="text-gray-500 text-sm mb-5">New here? Register below.</p>
    <form @submit.prevent="handleRegister">
      <div class="ps-fieldset">
        <label class="ps-label" for="reg-name">Name</label>
        <input
          id="reg-name"
          v-model="form.name"
          type="text"
          class="ps-input"
          placeholder="Your name"
          required
        />
      </div>
      <div class="ps-fieldset">
        <label class="ps-label" for="reg-email">Email</label>
        <input
          id="reg-email"
          v-model="form.email"
          type="email"
          class="ps-input"
          placeholder="you@example.com"
          required
        />
      </div>
      <div class="ps-fieldset">
        <label class="ps-label" for="reg-password">Password</label>
        <input
          id="reg-password"
          v-model="form.password"
          type="password"
          class="ps-input"
          placeholder="••••••••"
          required
        />
      </div>
      <div class="ps-fieldset">
        <label class="ps-label" for="reg-verify">Verify Password</label>
        <input
          id="reg-verify"
          v-model="form.verify"
          type="password"
          class="ps-input"
          placeholder="••••••••"
          required
        />
      </div>
      <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
      <button type="submit" class="ps-btn-primary w-full mt-1" :disabled="loading">
        {{ loading ? 'Creating account…' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(['registered'])
const { register } = useAuth()

const form = reactive({ name: '', email: '', password: '', verify: '' })
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  if (form.password !== form.verify) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    await register({ name: form.name, email: form.email, password: form.password })
    emit('registered')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
