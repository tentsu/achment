
import axios from 'axios';

export default {
  asd (data) {
    console.log("fasf")
  },

  getApiKey (callback) {
    this._get('./apikey.txt', function(response) {
      callback(response.data);
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
    .catch(this.setError)
    .then(function() {});
  },
  setError (error) {

  },
}
