<template>
  <div class="character">
    <p>hei {{character.name}}</p>

    <span class="name">{{character.name}}</span>
    <div class="sub-info">
      <span class="realm">{{character.realm}}</span>
    </div>

		<div>
			<code>{{character}}</code>
		</div>
  </div>
</template>

<script>
export default {
  name: "CharacterInfo",
  props: [ "character" ],
  data () {
    return {}
  }
};
</script>

<style lang="scss">
.name {
  font-size: 1.5rem;
  color: $primary-orange;
}

.sub-info {
  font-size: 0.9rem;
}
</style>
