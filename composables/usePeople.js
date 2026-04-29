/**
 * People composable
 */
export const usePeople = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const peoples = useState('peoples', () => [])

  const fetchPeople = async () => {
    peoples.value = await $fetch(`${base}/peoples`)
  }

  const addPeople = async (person) => {
    await $fetch(`${base}/peoples`, { method: 'POST', body: person })
    await fetchPeople()
  }

  const editPeople = async (person) => {
    await $fetch(`${base}/peoples/${person.id}`, { method: 'PUT', body: person })
    await fetchPeople()
  }

  const removePeople = async (personId) => {
    await $fetch(`${base}/peoples/${personId}`, { method: 'DELETE' })
    await fetchPeople()
  }

  return { peoples, fetchPeople, addPeople, editPeople, removePeople }
}
