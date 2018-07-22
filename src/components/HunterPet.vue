<template>
  <div>
    {{pet.name}} - {{pet.familyName}}
  </div>
</template>

<script>
export default {
  name: "HunterPet",
  props: ["pet"],
  data () {
    return {

    }
  }
}
</script>


<style lang="scss">

</style>
