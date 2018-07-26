<template>
  <div id="app">
    <div class="demo-mode">
      <input type="checkbox" id="demoMode" v-model="demoMode" v-on:change="changeDemoMode()">
      <label for="demoMode">demo</label>
    </div>

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
      demoMode: false,
      info: {
        character: {},
        quest: {}
      }
    }
  },
  mounted () {
    this.demoMode = window.DEMO;
  },
  methods: {
    changeDemoMode () {
      window.DEMO = this.demoMode;
    }
  }
}
</script>

<style lang="scss">
.demo-mode {
  margin: 10px 0;

  label {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
  }
}

</style>
