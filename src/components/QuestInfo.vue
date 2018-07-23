<template>
  <div>
    {{quest.title}}<br>
    {{ quest }}
  </div>
</template>


<script>
export default {
  name: 'QuestInfo',
  props: [ 'quest' ],
  data () {
    return {
      
    }
  }
}
</script>
