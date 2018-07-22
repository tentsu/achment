<template>
	<div id="search-forms">
		
		<div class="form">
			<div>
				<h3>Character</h3>
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
			childData: {},
			questId: '13146',

			locale: 'en_GB',

			// Base URL to API
			baseUrl: 'https://REGION.api.battle.net/wow/',

			// Sub URLs to use API
			apiUrls: {
				'achievement': 'achievement/',
				'profile': 'character/REALM/CHARACTER',
				'hunterPets': 'character/REALM/CHARACTER?fields=hunterPets',
				'quest': 'quest/ID?',
			},

			urlParams: {
				'locale': '&locale=' + 'en_GB',
				'apikey': '&apikey=APIKEY'
			}	
		}
	},

	beforeMount () {
		this.childData = this.infoData
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
		getQuestUrl: function (region, id) {
			var url = this.apiUrls.quest.replace('ID', id);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},
		getHunterPetsUrl: function (character, realm, region) {
			var url = this.apiUrls.hunterPets.replace('REALM', realm).replace('CHARACTER', character);
			return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
		},

		refreshRealmList: function(asd) {
			console.log('fetch correct realms!');
		},
		fetchQuest: function() {
			var url = this.getQuestUrl(this.character.region, this.questId);

			var q = { "id": 13146, "title": "Generosity Abounds", "reqLevel": 77, "suggestedPartyMembers": 0, "category": "Icecrown", "level": 80 };
			this.childData.quest = q;
			this.$emit('interface', this.childData);
			
			// this.$http.get(url).then(function(response) {
			// 	this.childData.quest = response.data;
      // 	this.$emit('interface', this.childData);
      // 	}, function(error) {
			// 	this.character.name = '';
			// 	this.character.region = 'eu';
			// 	this.chardata = 'error';
			// });
		},
		fetchProfile: function() {
			var url = this.getHunterPetsUrl(this.character.name, this.character.realm, this.character.region);
			
			var asd = {"lastModified":1525015105000,"name":"Tentsu","realm":"Sylvanas","battlegroup":"Sturmangriff / Charge","class":3,"race":11,"gender":1,"level":110,"achievementPoints":19780,"thumbnail":"sylvanas/70/98144326-avatar.jpg","calcClass":"Y","faction":0,"hunterPets":[{"name":"Haamuvaamu","creature":121567,"selected":true,"slot":4,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Puhku","creature":50058,"slot":1,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":21,"familyName":"Turtle"},{"name":"Purjopore","creature":17447,"slot":3,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":45,"familyName":"Core Hound"},{"name":"Quokka","creature":63600,"slot":0,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":128,"familyName":"Quilen"},{"name":"Fintsu","creature":50960,"slot":34,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":126,"familyName":"Water Strider"},{"name":"Hemuli","creature":50138,"slot":12,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Hupukka","creature":69946,"slot":8,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Karmiva","creature":88708,"slot":11,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Kiukku","creature":96410,"slot":44,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":151,"familyName":"Stag"},{"name":"Kriisi","creature":54318,"slot":6,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":46,"familyName":"Spirit Beast"},{"name":"Kurko","creature":54319,"slot":5,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Luputin","creature":69947,"slot":16,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":46,"familyName":"Spirit Beast"},{"name":"Mössö","creature":88579,"slot":19,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":2,"familyName":"Cat"},{"name":"Oxen","creature":72844,"slot":39,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":157,"familyName":"Oxen"},{"name":"Oxen","creature":66595,"slot":38,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":157,"familyName":"Oxen"},{"name":"Puppe","creature":6498,"slot":43,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":39,"familyName":"Devilsaur"},{"name":"Riukuliini","creature":54321,"slot":23,"spec":{"name":"Cunning","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_eyeoftheowl","description":"Guileful creatures capable of skillfully mitigating lethal blows dealt to themselves and their allies.","order":2},"calcSpec":"b","familyId":3,"familyName":"Spider"},{"name":"Seppo","creature":50051,"slot":9,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":46,"familyName":"Spirit Beast"},{"name":"Tappohaukka","creature":79746,"slot":31,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":7,"familyName":"Carrion Bird"},{"name":"Timotei","creature":38453,"slot":13,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Tuhina","creature":32517,"slot":17,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"TunaAivo","creature":50850,"slot":28,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":2,"familyName":"Cat"},{"name":"Tupukas","creature":69943,"slot":15,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Turso","creature":45380,"slot":33,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":50,"familyName":"Fox"},{"name":"Höpöhippo","creature":79577,"slot":32,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":150,"familyName":"Riverbeast"},{"name":"Puppe","creature":79020,"slot":30,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":68,"familyName":"Hydra"},{"name":"Naakka","creature":85856,"slot":27,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":26,"familyName":"Bird of Prey"},{"name":"Läskipää","creature":18280,"slot":25,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":33,"familyName":"Sporebat"},{"name":"Nappopää","creature":22052,"slot":26,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":11,"familyName":"Raptor"},{"name":"Pulla","creature":9697,"slot":21,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":1,"familyName":"Wolf"},{"name":"Rouskuturpa","creature":60932,"slot":20,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":25,"familyName":"Hyena"},{"name":"Rutto","creature":35189,"slot":10,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Ryöväri","creature":16932,"slot":18,"spec":{"name":"Cunning","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_eyeoftheowl","description":"Guileful creatures capable of skillfully mitigating lethal blows dealt to themselves and their allies.","order":2},"calcSpec":"b","familyId":31,"familyName":"Ravager"},{"name":"Ärripurri","creature":70014,"slot":24,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_kingofthejungle","description":"Driven by a frenzied persistence to pursue prey, these beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":138,"familyName":"Direhorn"},{"name":"Isoaivo","creature":38305,"slot":22,"calcSpec":"","familyId":41,"familyName":"Silithid"},{"name":"Kauna","creature":54320,"slot":14,"calcSpec":"","familyId":46,"familyName":"Spirit Beast"},{"name":"Masiina","creature":33776,"slot":7,"calcSpec":"","familyId":46,"familyName":"Spirit Beast"},{"name":"Rosmo","creature":20673,"slot":29,"calcSpec":"","familyId":27,"familyName":"Wind Serpent"}],"totalHonorableKills":20548};

				asd.hunterPets.sort(function(a,b) {
						if (a.name < b.name)
							return -1;
						if (a.name > b.name)
							return 1;
						return 0;
					}
				);

				this.childData.character = asd;
				this.$emit('interface', this.childData);
			// this.$http.get(url).then(function(response) {
			// 	this.childData.character = response.data;
			// 	this.$emit('interface', this.childData);
			// }, function() {
			// 	this.character.name = '';
			// 	this.character.region = 'eu';
			// 	this.chardata = 'error';
			// });
		},
		fetchHunterPets: function(callback) {
			var url = this.getHunterPetsUrl(this.character.name, this.character.realm, this.character.region);
	
			this.$http.get(url).then(function(response) {
				callback(response.data);
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
#search-forms {
	border: 1px solid $primary-black;
	padding: 10px;

	h3 {
		margin: 10px 5px;
	}
}

</style>