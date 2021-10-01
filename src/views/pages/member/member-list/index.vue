<template>
  <v-data-table
    :headers="memberList.header"
    :items="memberList.data"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      memberList: {
        data: [],
        header: [],
      },
    }
  },
  beforeMount() {
    this.dispatchMemberList()
  },
  methods: {
    dispatchMemberList() {
      this.$store.dispatch('getMemberList').then(response => {
        this.mappingMemberList(response?.data)
      }).catch(error => console.log(error))
    },
    mappingMemberList(data) {
      let allHeader = []
      let memberData = []
      const headerData = []
      memberData = data?.map(item => ({
        id: item?.id,
        status: item?.status,
        name: item?.name,
        note: item?.note,
      }))
      allHeader = Object.keys(data[0])?.map(item => ({
        text: item,
        value: item,
      }))
        // eslint-disable-next-line no-unused-expressions,array-callback-return
        allHeader?.map(headerItem => {
          if (memberData[0][headerItem?.value]) {
            headerData.push(headerItem)
          }
        })
        console.log('headerData', headerData)
        this.memberList.header = headerData
        this.memberList.data = memberData
    },
  },
}
</script>

<style scoped>

</style>
