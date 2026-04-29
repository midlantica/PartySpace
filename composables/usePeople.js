/**
 * People composable — uses Nuxt server API routes
 */
export const usePeople = () => {
  const peoples = useState('peoples', () => [])

  const fetchPeople = async () => {
    peoples.value = await $fetch('/api/peoples')
  }

  const addPeople = async (person) => {
    await $fetch('/api/peoples', { method: 'POST', body: person })
    await fetchPeople()
  }

  const editPeople = async (person) => {
    await $fetch(`/api/peoples/${person.id}`, { method: 'PUT', body: person })
    await fetchPeople()
  }

  const removePeople = async (personId) => {
    await $fetch(`/api/peoples/${personId}`, { method: 'DELETE' })
    await fetchPeople()
  }

  return { peoples, fetchPeople, addPeople, editPeople, removePeople }
}
