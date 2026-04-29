/**
 * Auth composable — mirrors the React localStorage-based auth pattern
 */
export const useAuth = () => {
  const userId = useState('userId', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('partySpace_user')
      return stored ? parseInt(stored) : null
    }
    return null
  })

  const isLoggedIn = computed(() => !!userId.value)

  const login = async (email, password) => {
    const config = useRuntimeConfig()
    const users = await $fetch(`${config.public.apiBase}/users?email=${email}`)
    if (!users.length) throw new Error('User account does not exist')
    const user = users[0]
    if (user.password !== password) throw new Error('Password does not match')
    localStorage.setItem('partySpace_user', user.id)
    userId.value = user.id
    return user
  }

  const register = async ({ name, email, password }) => {
    const config = useRuntimeConfig()
    // Check if user already exists
    const existing = await $fetch(`${config.public.apiBase}/users?email=${email}`)
    if (existing.length) throw new Error('An account with that email already exists')
    const created = await $fetch(`${config.public.apiBase}/users`, {
      method: 'POST',
      body: { name, email, password }
    })
    if (created.id) {
      localStorage.setItem('partySpace_user', created.id)
      userId.value = created.id
    }
    return created
  }

  const logout = () => {
    localStorage.removeItem('partySpace_user')
    userId.value = null
    navigateTo('/')
  }

  return { userId, isLoggedIn, login, register, logout }
}
