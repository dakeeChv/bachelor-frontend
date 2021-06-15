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
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-h5">ຂ່າວທັງໝົດ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red accent-4" outlined rounded to="/posts/add">
            <v-icon left>fa-plus</v-icon>
            ເພີ່ມຂ່າວ
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.statusPost`]="{ item }">
        <v-chip
          :class="[item.statusPost ? 'green darken-2' : 'red darken-3']"
          dark
        >
          {{ getStatus(item.statusPost) }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn color="teal darken-3" icon @click="editPost(item)"
          ><v-icon small>fa-pencil-alt</v-icon></v-btn
        >
        <v-btn color="red accent-3" icon @click="removePost(item)"
          ><v-icon small>fa-trash</v-icon></v-btn
        >
        <v-btn color="light-blue darken-1" icon @click="viewPost(item)"
          ><v-icon small>fa-eye</v-icon></v-btn
        >
      </template>
    </v-data-table>
    <h1>{{ posts }}</h1>
    <h1>Hello</h1>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
  mounted() {
    this.fetchPost()
  },
  computed: {
    ...mapState('posts', ['posts'])
  },
  methods: {
    ...mapActions('posts', ['fetchPost']),
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
    },
    viewPost(item) {
      if (item) {
        return this.$router.push({
          path: `/posts/view/1`
        })
      }
    }
  }
}
</script>
