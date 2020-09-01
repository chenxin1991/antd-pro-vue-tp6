<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->

      <img src="../../assets/homelogo.png">

      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.jpg'
// import LogoSvg from '@/assets/homelogo.svg?inline'

export default {
  name: 'Logo',
  components: {
    // LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '万家灯火',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style scoped>

</style>
