//import { ref } from "vue"
import { useStore } from 'vuex'

// Accept store and automatically use name of store as storename.json
export default function usePersistentStore() {
  const remote = require('electron').remote;
  const app = remote.app;
  const appPath = app.getPath('userData') + '/data/'
  var fs = require("fs");

  const save = (dataFile, data) => {
    const fullPath = appPath + dataFile + '.json'
    fs.writeFileSync(fullPath, JSON.stringify(data));
  }

  const load = (dataFile) => {
    const fullPath = appPath + dataFile + '.json'
    if(fs.existsSync(fullPath))
    {
        return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    }
    
    return null;
  };

  return {
    save,
    load
  }
}