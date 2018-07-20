<template>
	<div id="form">
		<div>
			<label for="characterName">Character</label>
			<input type="text" v-model="character.name" id="characterName">
			<select id="region" v-model="character.region" v-on="refreshRealmList()">
				<option v-for="region in regionList" v-bind:key="region.text" v-bind:value="region.value"> {{region.text}}</option>
			</select>
			<select id="realm" v-model="character.realm">
				<option v-for="realm in realmList" v-bind:key="realm.text" v-bind:value="realm.value"> {{realm.text}}</option>
			</select>
		</div>

		<button v-on:click="fetchProfile">fetch data</button>
	</div>
</template>

<script>
export default {
	name: 'SearchForm',
	props: [
		'characterData'
	],
	data () {
		return {
			regionList: [
				{ value: 'eu', text: 'EU' },
				{ value: 'us', text: 'US' }
			],
			realmList: [
				{ value: 'sylvanas', text: 'Sylvanas' }
			],
			character: {
				'name': 'tentsu',
				'realm': 'sylvanas',
				'region': 'eu'
			},

			locale: 'en_GB',

			// Base URL to API
			baseUrl: 'https://REGION.api.battle.net/wow/',

			// Sub URLs to use API
			apiUrls: {
				'achievement': 'achievement/',
				'profile': 'character/REALM/CHARACTER',
				'hunterPets': 'character/REALM/CHARACTER/?fields=hunterPets'
			},

			urlParams: {
				'locale': '?locale=' + this.locale,
				'apikey': '&apikey=APIKEY'
			}	
		}
	},

	mounted() {
			this.$http.get('./apikey.txt').then(function(response) {
				this.urlParams.apikey = this.urlParams.apikey.replace('APIKEY', response.data);
			}, function() {});
	},

	methods: {
		getCharacterProfileUrl: function (character, realm, region) {
			var url = this.apiUrls.profile.replace('REALM', realm).replace('CHARACTER', character);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},
		getHunterPets: function (character, realm, region) {
			var url = this.apiUrls.hunterPets.replace('REALM', realm).replace('CHARACTER', character);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},

		refreshRealmList: function(asd) {
			console.log('fetch correct realms!');
		},
		fetchProfile: function() {
			var url = this.getCharacterProfileUrl(this.character.name, this.character.realm, this.character.region);
			this.$emit('interface',  {"lastModified": 1525015105000, "name": "Tentsu", "realm": "Sylvanas", "battlegroup": "Sturmangriff / Charge", "class": 3, "race": 11, "gender": 1, "level": 110, "achievementPoints": 19780, "thumbnail": "sylvanas/70/98144326-avatar.jpg", "calcClass": "Y", "faction": 0, "totalHonorableKills": 20548 });
				
			// this.$http.get(url).then(function(response) {
      // 	// this.$emit('interface', response.data);
      // 	}, function() {
			// 	this.character.name = '';
			// 	this.character.region = 'eu';
			// 	this.chardata = 'error';
			// });
		},
		fetchHunterPets: function() {
			var url = this.getHunterPets(this.character.name, this.character.realm, this.character.region);
	
			this.$http.get(url).then(function(response) {
				this.chardata = response.data;
			}, function() {
				this.character.name = '';
				this.character.region = 'eu';
				this.chardata = 'error';
			});
		}

	}
}
</script>

<style lang="scss">
#form {
	border: 1px solid $primary-black;
	padding: 10px;
}
</style>