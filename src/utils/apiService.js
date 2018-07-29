import axios from 'axios';
import tools from '../utils/tools'

export default {

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
  getQuestUrl (region, id) {
    var url = this.apiUrls.quest.replace('ID', id);
    return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
  },
  getProfileUrl (character, realm, region) {
    var url = this.apiUrls.profile.replace('REALM', realm).replace('CHARACTER', character);
    return this.baseUrl.replace('REGION', region) + url + this.urlParams.locale + this.urlParams.apikey;
  },

  getQuest (region, questId, callback) {
    var url = this.getQuestUrl(region, questId);

    this.getRequest(url, callback, this.demoData.tempQuest);
  },
  getProfile (rawUrl, character, callback) {
    var url;
    if (rawUrl) {
      var parsed = tools.parseCharacterFromUrl(rawUrl);
      url = this.getProfileUrl(parsed.name, parsed.realm, parsed.region);
    } else {
      url = this.getProfileUrl(character.name, character.realm, character.region);
    }

    this.getRequest(url, function(data) {
      data.hunterPets.sort(tools.sortByName);

      callback(data);
    }, this.demoData.tempProfile);
  },

  getApiKey () {
    var that = this;
    this._get('./apikey.txt', function(response) {
      that.urlParams.apikey = that.urlParams.apikey.replace('APIKEY', response.data);
    });
  },

  getRequest (url, callback, temp) {
    if (window.DEMO) {
      callback(temp || {});
      return;
    }

    this._get(url, function(response) {
      callback(response.data);
    });
  },
  _get (url, callback) {
    axios.get(url).then(callback)
    .catch(this._setError)
    .then(function() {});
  },
  _setError (error) {

  },

  demoData: {
    tempProfile: {"lastModified":1525015105000,"name":"Tentsu","realm":"Sylvanas","battlegroup":"Sturmangriff / Charge","class":3,"race":11,"gender":1,"level":110,"achievementPoints":19780,"thumbnail":"sylvanas/70/98144326-avatar.jpg","calcClass":"Y","faction":0,"hunterPets":[{"name":"Haamuvaamu","creature":121567,"selected":true,"slot":4,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"},{"name":"Puhku","creature":50058,"slot":1,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":21,"familyName":"Turtle"},{"name":"Purjopore","creature":17447,"slot":3,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":45,"familyName":"Core Hound"},{"name":"Quokka","creature":63600,"slot":0,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":128,"familyName":"Quilen"},{"name":"Fintsu","creature":50960,"slot":34,"spec":{"name":"Tenacity","role":"TANK","backgroundImage":"bg-deathknight-blood","icon":"ability_druid_demoralizingroar","description":"Stalwart and veteran defenders who unquestionably place their thick hides and protective exteriors in harm's way for their allies.","order":1},"calcSpec":"Z","familyId":126,"familyName":"Water Strider"},{"name":"Hemuli","creature":50138,"slot":12,"spec":{"name":"Ferocity","role":"DPS","backgroundImage":"bg-rogue-assassination","icon":"ability_druid_kingofthejungle","description":"Driven by a rabid persistence to pursue prey, these carnivorous beasts stop at nothing to achieve victory; even death is temporary for these predators.","order":0},"calcSpec":"a","familyId":46,"familyName":"Spirit Beast"}],"totalHonorableKills":20548},
    tempQuest: {"id": 13146, "title": "Generosity Abounds", "reqLevel": 77, "suggestedPartyMembers": 0, "category": "Icecrown", "level": 80 },		
  }
}
