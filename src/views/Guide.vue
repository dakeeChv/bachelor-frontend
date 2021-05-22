<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-slot:[`item.cover`]="{ item }">
        <v-avatar class="ma-2">
          <v-img :src="item.cover"></v-img>
        </v-avatar>
      </template>
      <template v-slot:[`item.action`]="{}">
        <v-btn color="teal darken-3" icon
          ><v-icon small>fa-pencil</v-icon></v-btn
        >
        <v-btn color="red accent-3" icon
          ><v-icon small>fa-trash-o</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: 'Guide',
  data: () => ({
    headers: [
      {
        text: 'ພາບປົກຄູ່ມື.',
        value: 'cover'
      },
      {
        text: 'ຊື່ຄູ່ມື',
        align: 'start',
        value: 'title'
      },
      {
        text: 'ຈັດການ',
        align: 'center',
        value: 'action'
      }
    ],
    desserts: [
      {
        title: 'ປະໂຫຍດຂອງການບໍລິຈາກເລືອດ',
        cover:
          'https://www.boldsky.com/img/2020/06/xblooddonation-1592231841.jpg.pagespeed.ic.I71dfPpnqA.jpg'
      },
      {
        title: 'ສິ່ງທີ່ຄວນຮູ້ ກ່ອນບໍລິຈາກເລືອດ',
        cover:
          'https://image.freepik.com/free-vector/before-blood-donation-infographic-illustration_74440-543.jpg'
      }
    ]
  })
}
</script>
