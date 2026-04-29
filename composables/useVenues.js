/**
 * Venues composable
 */
export const useVenues = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const venues = useState('venues', () => [])

  const fetchVenues = async () => {
    venues.value = await $fetch(`${base}/venues`)
  }

  const addVenue = async (venue) => {
    const created = await $fetch(`${base}/venues`, { method: 'POST', body: venue })
    await fetchVenues()
    return created
  }

  const updateVenue = async (venue) => {
    await $fetch(`${base}/venues/${venue.id}`, { method: 'PUT', body: venue })
    await fetchVenues()
  }

  const removeVenue = async (venueId) => {
    await $fetch(`${base}/venues/${venueId}`, { method: 'DELETE' })
    await fetchVenues()
  }

  return { venues, fetchVenues, addVenue, updateVenue, removeVenue }
}
