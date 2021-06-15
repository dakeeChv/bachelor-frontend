<template>
  <div>
    <div class="text-h4">View</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return {}
  },
  computed: {
    ...mapState('posts', ['posts'])
  }
}
</script>
