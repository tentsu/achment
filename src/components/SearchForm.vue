<template>
	<div id="search-forms">
		<div class="form">
			<div>
				<h3>Character</h3>				
				<input type="text" v-model="url" id="url" placeholder="url">

				<input type="text" v-model="character.name" id="characterName" placeholder="Name">

				<select id="region" v-model="character.region" v-on="refreshRealmList()">
					<option v-for="region in regionList" v-bind:key="region.text" v-bind:value="region.value"> {{region.text}}</option>
				</select>

				<select id="realm" v-model="character.realm">
					<option v-for="realm in realmList" v-bind:key="realm.text" v-bind:value="realm.value"> {{realm.text}}</option>
				</select>

				<button v-on:click="fetchProfile">fetch</button>
			</div>
		</div>

		<div class="form">
			<div>
				<h3>Quest</h3>
				<input type="text" v-model="questId" id="quest" placeholder="Quest ID">

				<button v-on:click="fetchQuest">fetch</button>
			</div>
		</div>
		</div>
</template>

<script>
import apiService from '../utils/apiService'
import tools from '../utils/tools'

export default {
	name: 'SearchForm',
	props: {
		infoData: {
			type: Object,
			default () {
				return {}
			}
		}
	},
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
			url: 'https://worldofwarcraft.com/en-gb/character/sylvanas/tentsu',
			childData: {
				character: {},
				quest: {}
			},
			questId: '13146',

			locale: 'en_GB',

			// Base URL to API
			baseUrl: 'https://REGION.api.battle.net/wow/',

			// Sub URLs to use API
			apiUrls: {
				'achievement': 'achievement/',
				'profile': 'character/REALM/CHARACTER?fields=hunterPets',
				'quest': 'quest/ID?',
			},
			
			urlParams: {
				'locale': '&locale=' + 'en_GB',
				'apikey': '&apikey=APIKEY'
			},


			tempProfile: {"lastModified":1525015105000,"name":"Tentsu","realm":"Sylvanas","battlegroup":"Sturmangriff / Charge","class":3,"race":11,"gender":1,"level":110,"achievementPoints":19780,"thumbnail":"sylvanas/70/98144326-avatar.jpg","calcClass":"Y","faction":0,"hunterPets":[{"name":"Haamuvaamu","creature":121567,"selected":true,"slot":4,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Puhku","creature":50058,"slot":1,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":21,"familyName":"Turtle"},{"name":"Purjopore","creature":17447,"slot":3,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":45,"familyName":"Core Hound"},{"name":"Quokka","creature":63600,"slot":0,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":128,"familyName":"Quilen"},{"name":"Fintsu","creature":50960,"slot":34,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":126,"familyName":"Water Strider"},{"name":"Hemuli","creature":50138,"slot":12,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"}],"totalHonorableKills":20548},
			tempQuest: {"id": 13146, "title": "Generosity Abounds", "reqLevel": 77, "suggestedPartyMembers": 0, "category": "Icecrown", "level": 80 },
		}
	},
	beforeMount () {
		this.childData = this.infoData
	},
	mounted() {
		this.getApiKey();
	},
	methods: {
		refreshRealmList () {
		},
		getApiKey () {
			var that = this;
			apiService.getApiKey(function(apikey) {
				that.urlParams.apikey = that.urlParams.apikey.replace('APIKEY', apikey);
			});
		},
		getQuestUrl (region, id) {
			var url = this.apiUrls.quest.replace('ID', id);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},
		getProfileUrl (character, realm, region) {
			var url = this.apiUrls.profile.replace('REALM', realm).replace('CHARACTER', character);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},
		parseCharacterFromUrl () {
			var asd = this.url.split('/');

			return {
				name: asd[asd.length - 1],
				realm: asd[asd.length - 2],
				region: 'eu'
			};
		},

		fetchQuest () {
			var url = this.getQuestUrl(this.character.region, this.questId);

			var that = this;
			apiService.getRequest(url, function(data) {
				that.childData.quest = data;
				that.$emit('interface', that.childData);
			}, this.tempQuest);
		},
		fetchProfile () {
			var url;
			if (this.url) {
				var parsed = this.parseCharacterFromUrl();
				url = this.getProfileUrl(parsed.name, parsed.realm, parsed.region);
			} else {
				url = this.getProfileUrl(this.character.name, this.character.realm, this.character.region);
			}

			var that = this;
			apiService.getRequest(url, function(data) {
				data.hunterPets.sort(tools.sortByName);

				that.childData.character = data;
				that.$emit('interface', that.childData);
			}, this.tempProfile);
		},
	}
}
</script>

<style lang="scss">
#search-forms {
	border: 1px solid $primary-black;
	padding: 10px;

	h3 {
		margin: 10px 5px;
	}
}
</style>