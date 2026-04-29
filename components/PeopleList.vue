<template>
  <div class="space-y-2">
    <div v-if="partySpacePeople.length === 0" class="text-sm text-gray-400 text-center py-4">
      No guests yet. Invite someone!
    </div>

    <div
      v-for="person in partySpacePeople"
      :key="person.id"
      class="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 group"
    >
      <span
        class="text-sm text-gray-700 cursor-pointer hover:text-violet-600 transition flex-1"
        @click="openEdit(person)"
      >
        {{ person.name }}
      </span>
      <button
        class="text-gray-300 hover:text-red-500 transition text-lg leading-none ml-2 opacity-0 group-hover:opacity-100"
        @click="removePeople(person.id)"
      >
        &times;
      </button>
    </div>

    <!-- Edit person modal -->
    <UiModal v-model="showEdit" title="Update Person">
      <PeopleEditForm
        v-if="selectedPerson"
        :person="selectedPerson"
        :party-space-id="partySpaceId"
        @saved="showEdit = false"
      />
    </UiModal>
  </div>
</template>

<script setup>
const props = defineProps({
  partySpaceId: { type: Number, required: true }
})

const { peoples, removePeople } = usePeople()

const showEdit = ref(false)
const selectedPerson = ref(null)

const partySpacePeople = computed(() =>
  peoples.value.filter((p) => p.partySpaceId === props.partySpaceId)
)

const openEdit = (person) => {
  selectedPerson.value = person
  showEdit.value = true
}
</script>
