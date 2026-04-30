/**
 * PartySpaces composable — uses Nuxt server API routes
 */
export const usePartySpaces = () => {
  const partySpaces = useState('partySpaces', () => [])

  const fetchPartySpaces = async () => {
    partySpaces.value = await $fetch('/api/partySpaces')
  }

  const addPartySpace = async (partySpace) => {
    await $fetch('/api/partySpaces', { method: 'POST', body: partySpace })
    await fetchPartySpaces()
  }

  const updatePartySpace = async (partySpace) => {
    await $fetch(`/api/partySpaces/${partySpace.id}`, { method: 'PUT', body: partySpace })
    await fetchPartySpaces()
  }

  const deletePartySpace = async (id) => {
    await $fetch(`/api/partySpaces/${id}`, { method: 'DELETE' })
    await fetchPartySpaces()
  }

  return { partySpaces, fetchPartySpaces, addPartySpace, updatePartySpace, deletePartySpace }
}
