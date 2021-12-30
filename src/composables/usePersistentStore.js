//import { ref } from "vue"
import { useStore } from 'vuex'

// Accept store and automatically use name of store as storename.json
export function usePersistentStore() {
  // const store = useStore()
  const remote = require('electron').remote;
  const app = remote.app;
  const appPath = app.getPath('userData') + '/data.json'
  var fs = require("fs");

  // const loadStateFromFile = () => {
  //   if(fs.existsSync(appPath))
  //   {
  //       // load state from file system
  //       //let persistedState = JSON.parse(fs.readFileSync(appPath, 'utf8'))
  //       //store.commit('overwriteState', persistedState)
  //   }
  // };

  // const saveStateToFile = () => {
  //   //fs.writeFileSync(appPath, JSON.stringify(store.state));
  // }

  // return {
  //   loadStateFromFile,
  //   saveStateToFile,
  // };
}