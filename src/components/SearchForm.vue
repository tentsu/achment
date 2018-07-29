<template>
	<div id="search-forms">
		<div class="form">
			<div>
				<h3>Character</h3>				
				<input class="character-url" type="text" v-model="url" id="url" placeholder="url">

				<div class="or-line"><span>or</span></div>

				<div class="character-search">
					<input class="name" type="text" v-model="character.name" id="characterName" placeholder="Name">

					<select class="region" v-model="character.region" v-on="refreshRealmList()">
						<option v-for="region in regionList" v-bind:key="region.text" v-bind:value="region.value"> {{region.text}}</option>
					</select>

					<select class="realm" v-model="character.realm">
						<option v-for="realm in realmList" v-bind:key="realm.text" v-bind:value="realm.value"> {{realm.text}}</option>
					</select>
				</div>

				<div class="fetch-button">
					<button v-on:click="fetchProfile">fetch</button>
				</div>
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

		}
	},
	beforeMount () {
		this.childData = this.infoData
	},
	mounted() {
		apiService.getApiKey();
	},
	methods: {
		refreshRealmList () {
		},
		fetchQuest () {
			var that = this;
			apiService.getQuest(this.character.region, this.questId, function(data) {
				that.childData.quest = data;
				that.$emit('interface', that.childData);
			});
		},
		fetchProfile () {
			var that = this;
			apiService.getProfile(this.url, this.character, function(data) {
				that.childData.character = data;
				that.$emit('interface', that.childData);
			});
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

	.character-url {
		display: block;
		width: 100%;
		border: 0;
		border-bottom: 1px solid $primary-grey;
		background: #f5f5f5;
		text-align: center;

		&:hover {
			background-color: #EBEBEB;
			color: #000;
		}
	}

	.or-line {
		display: block;
		margin: 15px 0;
		text-align: center;
		border-bottom: 1px solid black;
		line-height: 0;

		span {
			text-transform: uppercase;
			background: #fff;
			letter-spacing: 5px;
			padding-left: 5px;
			font-weight: 500;
			font-size: 0.8rem;
		}
	}

	.character-search {
		.name {
			width: 65%;
		}

		.region {
			width: 10%;
		}

		.realm {
			width: 20%;
		}
	}

	.fetch-button {
		text-align: center;
		margin: 10px;
	}
}

</style>