
export default {
  sortByName (a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  },
  parseCharacterFromUrl (url) {
    var splitted = url.split('/');

    return {
      name: splitted[splitted.length - 1],
      realm: splitted[splitted.length - 2],
      region: 'eu'
    };
  },
}