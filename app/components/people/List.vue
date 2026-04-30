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
        class="person-chip group"
      >
        <span
          class="cursor-pointer hover:text-[#1a3a8f] transition flex-1"
          @click="openEdit(person)"
        >
          {{ person.name }}
        </span>
        <UiCloseBtn title="Remove" @click="removePeople(person.id)" />
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

<style scoped>
  .person-chip {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    color: #374151;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 2.25rem;
  }
</style>
