/*  
[
  Tournament {
    name,
    teams[ players[] ],
    players[],
  }
]

 */
import { WriteJson, ReadJson, AppendJsonDict } from "./utils.js";

export class Player{
  constructor(name, id){
    this.name = name;
    this.id = id; //snowflake
  }
}

export class Team{
  constructor(name){
    this.name = name;
    this.players = [];
  }
}

export class Tournament{
  constructor(name, desc = ""){
    this.name = name;
    this.teams = [];
    this.players = [];
    this.desc = desc;
  }
}

const tourJsonPath = './tournaments.json';
export const toursList = initializeTournamentList(tourJsonPath);

function initializeTournamentList(jsonPath){
  try{
    ReadJson(jsonPath);
  }catch(err){
    console.log(err);
    WriteJson(jsonPath, {});
  }

  const obj = ReadJson(jsonPath);
  for (const [tourName, tourObj] of Object.entries(obj)) {
    obj[tourName] = Object.assign(new Tournament, tourObj);
    for (let j = 0; j < obj[tourName].teams.length; j++){
      obj[tourName].teams[j] = Object.assign(new Team, obj[tourName].teams[j]);
      for (let k = 0; k < obj[tourName].teams[j].players.length; k++){
        obj[tourName].teams[j].players[k] = Object.assign(new Player, obj[tourName].teams[j].players[k]);
      }
    }
    for (let j = 0; j < obj[tourName].players.length; j++){
      obj[tourName].players[j] = Object.assign(new Player, obj[tourName].players[j]);
    }
  }
  //console.log("tourslist", obj);
  return obj;
}

function getTournamentNames(){
  return Object.keys(toursList); // for dict
  return toursList.map(({name})=>name); // for list
}
export function createTournamentOptions(){
  const names = getTournamentNames();
  const list = [];
  for (const [tourName, tr] of Object.entries(toursList)){
    list.push({
      label: tr.name,
      value: tr.name,
      description: tr.desc,
    });
  }
  console.log("choices:", list);
  return list
}

export function addTournament(name, desc){
  let newtr = new Tournament(name, desc);
  toursList[name] = newtr;
  WriteJson(tourJsonPath, toursList);
}



export function listTeams(teamsList){
  var str = "";
  for (const team of teamsList){
    str = str.concat(`${team.name}: `)
    for (const player of team.players){
      str = str.concat(`${player.name}, `)
    }
    str = str.slice(0, -2);
    str = str.concat('\n');
  }
  if (str === "") return "none";
  return str;
}
export function listPlayers(playersList){
  var str = "";
  for (const player of playersList){
    str = str.concat(`-${player.name}\n`)
  }
  if (str === "") return "none";
  return str;
}

//addTournament("patates");
console.log("tours:", toursList);
