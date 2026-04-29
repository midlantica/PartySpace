/**
 * PartySpaceVenues (join table) composable
 */
export const usePartySpaceVenues = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const partySpaceVenues = useState('partySpaceVenues', () => [])

  const fetchPartySpaceVenues = async () => {
    partySpaceVenues.value = await $fetch(`${base}/partySpaceVenues`)
  }

  const addPartySpaceVenue = async (psv) => {
    await $fetch(`${base}/partySpaceVenues`, { method: 'POST', body: psv })
    await fetchPartySpaceVenues()
  }

  const updatePartySpaceVenue = async (psv) => {
    await $fetch(`${base}/partySpaceVenues/${psv.id}`, { method: 'PUT', body: psv })
    await fetchPartySpaceVenues()
  }

  return { partySpaceVenues, fetchPartySpaceVenues, addPartySpaceVenue, updatePartySpaceVenue }
}
