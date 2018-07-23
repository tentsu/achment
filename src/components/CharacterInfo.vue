<template>
  <div class="character" v-if="character.name">
    <span class="name">{{character.name}}</span>

    <div class="sub-info">
      <span class="realm">{{character.realm}}</span>
    </div>

		<div v-if="character.name">
      {{races[character.race].name}} {{classes[character.class].name}}
    </div>
    <div>
      {{genders[character.gender]}} - 
      {{factions[character.faction]}}
    </div>
      
    <div v-if="character.hunterPets">
      <h3 v-on:click="showPets = !showPets" class="pets-title">
        Pets {{character.hunterPets.length}}
        <span v-if="showPets">^</span>
        <span v-if="!showPets">v</span></h3>
        
      <div v-if="showPets">
        <HunterPet v-for="pet in character.hunterPets"
                    :pet="pet"
                    v-bind:key="pet.slot">
        </HunterPet>
      </div>
    </div>
  </div>
</template>

<script>
import HunterPet from './HunterPet.vue';

export default {
  name: 'CharacterInfo',
  props: ['character'],
  components: {
    HunterPet
  },
  data() {
    return {
      showPets: false,
      factions: {
        0: "alliance",
        1: "horde"
      },
      genders: {
        0: "male",
        1: "female"
      },
      classes: {
        1: {
          powerType: "rage",
          name: "Warrior"
        },
        2: {
          powerType: "mana",
          name: "Paladin"
        },
        3: {
          powerType: "focus",
          name: "Hunter"
        },
        4: {
          powerType: "energy",
          name: "Rogue"
        },
        5: {
          powerType: "mana",
          name: "Priest"
        },
        6: {
          powerType: "runic-power",
          name: "Death Knight"
        },
        7: {
          powerType: "mana",
          name: "Shaman"
        },
        8: {
          powerType: "mana",
          name: "Mage"
        },
        9: {
          powerType: "mana",
          name: "Warlock"
        },
        10: {
          powerType: "energy",
          name: "Monk"
        },
        11: {
          powerType: "mana",
          name: "Druid"
        },
        12: {
          powerType: "fury",
          name: "Demon Hunter"
        }
      },
      races: {
        1: {
          side: "alliance",
          name: "Human"
        },
        2: {
          side: "horde",
          name: "Orc"
        },
        3: {
          side: "alliance",
          name: "Dwarf"
        },
        4: {
          side: "alliance",
          name: "Night Elf"
        },
        5: {
          side: "horde",
          name: "Undead"
        },
        6: {
          side: "horde",
          name: "Tauren"
        },
        7: {
          side: "alliance",
          name: "Gnome"
        },
        8: {
          side: "horde",
          name: "Troll"
        },
        9: {
          side: "horde",
          name: "Goblin"
        },
        10: {
          side: "horde",
          name: "Blood Elf"
        },
        11: {
          side: "alliance",
          name: "Draenei"
        },
        22: {
          side: "alliance",
          name: "Worgen"
        },
        24: {
          side: "neutral",
          name: "Pandaren"
        },
        25: {
          side: "alliance",
          name: "Pandaren"
        },
        26: {
          side: "horde",
          name: "Pandaren"
        },
        27: {
          side: "horde",
          name: "Nightborne"
        },
        28: {
          side: "horde",
          name: "Highmountain Tauren"
        },
        29: {
          side: "alliance",
          name: "Void Elf"
        },
        30: {
          side: "alliance",
          name: "Lightforged Draenei"
        },
        34: {
          side: "alliance",
          name: "Dark Iron Dwarf"
        },
        36: {
          side: "horde",
          name: "Mag'har Orc"
        }
      }
    };
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

.pets-title {
  cursor: pointer;
}
</style>
