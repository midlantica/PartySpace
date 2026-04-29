/**
 * Venues composable — uses Nuxt server API routes
 */
export const useVenues = () => {
  const venues = useState('venues', () => [])

  const fetchVenues = async () => {
    venues.value = await $fetch('/api/venues')
  }

  const addVenue = async (venue) => {
    const created = await $fetch('/api/venues', { method: 'POST', body: venue })
    await fetchVenues()
    return created
  }

  const updateVenue = async (venue) => {
    await $fetch(`/api/venues/${venue.id}`, { method: 'PUT', body: venue })
    await fetchVenues()
  }

  const removeVenue = async (venueId) => {
    await $fetch(`/api/venues/${venueId}`, { method: 'DELETE' })
    await fetchVenues()
  }

  return { venues, fetchVenues, addVenue, updateVenue, removeVenue }
}
