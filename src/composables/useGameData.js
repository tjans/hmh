import { ref, computed } from 'vue'
const sqlite3 = require('sqlite3').verbose();
const remote = require('electron').remote;
const app = remote.app;
const dataPath = app.getPath('userData') + '/hmh.db';

// eventually this will take in a gameId
export default function useGameData()
{
    // results = SELECT FROM games where Id = gameId
    
    const homePlayers = ref([]);
    const awayPlayers = ref([]);

    const gameData = ref({
        homeTeamId: 1, // get these from the game info in the DB
        awayTeamId: 2,
        
        homePGId: null,
        homeSGId: null,
        homeSFId: null,
        homePFId: null,
        homeCId: null,

        awayPGId: null,
        awaySFId: null,
        awayPFId: null,
        awaySGId: null,
        awayCId: null,

        homePlayers,
        awayPlayers

    })

      let db = new sqlite3.Database(dataPath);
      let sql = `SELECT FirstName, LastName, Id FROM players WHERE TeamId = ?`;
      db.all(sql, [gameData.value.homeTeamId], (err, rows)=>{
          homePlayers.value = rows
      })

      sql = `SELECT FirstName, LastName, Id FROM players WHERE TeamId = ?`;
      db.all(sql, [gameData.value.awayTeamId], (err, rows)=>{
          awayPlayers.value = rows
      })

      const homePG = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homePGId)
      })
      const homeSG = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeSGId)
      })
      const homeSF = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeSFId)
      })
      const homePF = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homePFId)
      })
      const homeC = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeCId)
      })

      const awayPG = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayPGId)
      })
      const awaySF = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awaySFId)
      })
      const awaySG = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awaySGId)
      })
      const awayPF = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayPFId)
      })
      const awayC = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayCId)
      })
    
    const homeStyles = {
        headerFG: 'black',
        headerBG: 'white',
        bodyFG: 'white',
        bodyBG: '#024813',
        border: 'white'
    }

    const awayStyles = {
        headerFG: 'black',
        headerBG: 'white',
        bodyFG: 'white',
        bodyBG: 'black',
        border: 'red'
    }

    return {
        homeStyles,
        awayStyles,
        gameData
    }
}