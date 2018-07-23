<template>
  <div id="app">    
    <SearchForm :info-data="info" @interface="info = $event"></SearchForm>

    <CharacterInfo :character="info.character"></CharacterInfo>

    <QuestInfo :quest="info.quest"></QuestInfo>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
import CharacterInfo from './components/CharacterInfo.vue'
import QuestInfo from './components/QuestInfo.vue'

export default {
  components: {
    CharacterInfo,
    SearchForm,
    QuestInfo
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
