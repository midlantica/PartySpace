/**
 * PartySpaces composable — replaces React Context + Provider pattern
 */
export const usePartySpaces = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const partySpaces = useState('partySpaces', () => [])

  const fetchPartySpaces = async () => {
    partySpaces.value = await $fetch(`${base}/partySpaces`)
  }

  const addPartySpace = async (partySpace) => {
    await $fetch(`${base}/partySpaces`, { method: 'POST', body: partySpace })
    await fetchPartySpaces()
  }

  const updatePartySpace = async (partySpace) => {
    await $fetch(`${base}/partySpaces/${partySpace.id}`, { method: 'PUT', body: partySpace })
    await fetchPartySpaces()
  }

  const deletePartySpace = async (id) => {
    await $fetch(`${base}/partySpaces/${id}`, { method: 'DELETE' })
    await fetchPartySpaces()
  }

  return { partySpaces, fetchPartySpaces, addPartySpace, updatePartySpace, deletePartySpace }
}
