/**
 * Auth composable — uses nuxt-auth-utils session-based auth
 */
export const useAuth = () => {
  const { loggedIn, user, fetch: refreshSession, clear } = useUserSession()

  const isLoggedIn = loggedIn

  const login = async (email, password) => {
    await $fetch('/api/auth/login', { method: 'POST', body: { email, password } })
    await refreshSession()
  }

  const register = async ({ name, email, password }) => {
    await $fetch('/api/auth/register', { method: 'POST', body: { name, email, password } })
    await refreshSession()
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await clear()
    navigateTo('/')
  }

  return { user, isLoggedIn, login, register, logout }
}
