/**
 * PartySpaceVenues (join table) composable — uses Nuxt server API routes
 */
export const usePartySpaceVenues = () => {
  const partySpaceVenues = useState('partySpaceVenues', () => [])

  const fetchPartySpaceVenues = async () => {
    partySpaceVenues.value = await $fetch('/api/partySpaceVenues')
  }

  const addPartySpaceVenue = async (psv) => {
    await $fetch('/api/partySpaceVenues', { method: 'POST', body: psv })
    await fetchPartySpaceVenues()
  }

  const updatePartySpaceVenue = async (psv) => {
    await $fetch(`/api/partySpaceVenues/${psv.id}`, { method: 'PUT', body: psv })
    await fetchPartySpaceVenues()
  }

  const removePartySpaceVenue = async (id) => {
    await $fetch(`/api/partySpaceVenues/${id}`, { method: 'DELETE' })
    await fetchPartySpaceVenues()
  }

  return { partySpaceVenues, fetchPartySpaceVenues, addPartySpaceVenue, updatePartySpaceVenue, removePartySpaceVenue }
}
