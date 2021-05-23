<template>
  <div>
    <div class="mb-4 d-flex flex-row justify-space-between">
      <div>
        <h3>ຂ່າວທັງໝົດ</h3>
      </div>
      <v-btn color="red accent-4" outlined rounded to="/posts/add">
        <v-icon left>fa4 fa-plus</v-icon>
        ເພີ່ມຂ່າວ</v-btn
      >
    </div>
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
      <template v-slot:[`item.statusPost`]="{ item }">
        <v-chip :color="getColor(item.statusPost)" dark>
          {{ getStatus(item.statusPost) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          depressed
          small
          color="teal darken-3"
          class="white--text mr-2"
          @click="editPost(item)"
          >Edit</v-btn
        >
        <v-btn
          depressed
          small
          color="red accent-3"
          class="white--text"
          @click="removePost(item)"
          >Remove</v-btn
        >
      </template>
    </v-data-table>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'ຊື່ຫົວຂໍ້ຂ່າວ',
          align: 'start',
          value: 'title'
        },
        { text: 'ເວລາທີ່ສ້າງ', value: 'datePost' },
        { text: 'ສະຖານະ', value: 'statusPost' },
        { text: 'ຈັດການ', value: 'action' }
      ],
      desserts: [
        {
          title: 'Frozen Yogurt',
          datePost: 'Ice cream',
          statusPost: false
        },
        {
          title: 'Ice cream sandwich',
          datePost: 'Ice cream',
          statusPost: true
        },
        {
          title: 'Eclair',
          datePost: 'Cookie',
          statusPost: true
        },
        {
          title: 'Cupcake',
          datePost: 'Pastry',
          statusPost: true
        },
        {
          title: 'Gingerbread',
          datePost: 'Cookie',
          statusPost: true
        },
        {
          title: 'Jelly bean',
          datePost: 'Candy',
          statusPost: false
        },
        {
          title: 'Lollipop',
          datePost: 'Candy',
          statusPost: false
        },
        {
          title: 'Honeycomb',
          datePost: 'Toffee',
          statusPost: true
        },
        {
          title: 'Donut',
          datePost: 'Pastry',
          statusPost: true
        },
        {
          title: 'KitKat',
          datePost: 'Candy',
          statusPost: true
        }
      ],
      indexCurr: null
    }
  },
  methods: {
    getColor(status) {
      if (!status) return 'orange'
      else if (status) return 'green'
      else return 'gray'
    },
    getStatus(status) {
      if (!status) return 'ປິດໂພສ'
      else if (status) return 'ເປີດໂພສ'
    },
    editPost(item) {
      let index = this.desserts.indexOf(item)
      if (index != this.indexCurr) {
        this.indexCurr = this.desserts.indexOf(item)
        return this.$router.push({
          path: `/posts/edit/${this.desserts.indexOf(item)}`
        })
      }
    }
  }
}
</script>
