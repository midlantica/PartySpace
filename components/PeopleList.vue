<template>
  <div>
    <div v-if="partySpacePeople.length === 0" class="text-sm text-gray-400 py-2">
      No guests yet. Invite someone!
    </div>

    <!-- Vertical list of person chips -->
    <div class="flex flex-col gap-2">
      <div
        v-for="person in partySpacePeople"
        :key="person.id"
        class="ps-person-chip group"
      >
        <span
          class="cursor-pointer hover:text-[#1a3a8f] transition flex-1"
          @click="openEdit(person)"
        >
          {{ person.name }}
        </span>
        <PsCloseBtn title="Remove" @click="removePeople(person.id)" />
      </div>
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
