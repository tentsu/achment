<template>
  <div id="app">    
    <SearchForm :info-data="info" @interface="info = $event"></SearchForm>
    <CharacterInfo :character="info.character"></CharacterInfo>

    {{ info.quest }}
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
      info: {
        character: {},
        quest: {}
      }
    }
  }
}
</script>

<style>

</style>
