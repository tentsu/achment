<template>
  <div id="app">    
    <SearchForm :character-data="character" @interface="character = $event"></SearchForm>
    <CharacterInfo :character="character"></CharacterInfo>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
import CharacterInfo from './components/CharacterInfo.vue'

export default {
  components: {
    CharacterInfo,
    SearchForm
  },
  data () {
    return {
      character: {}
    }
  }
}
</script>

<style>

</style>
