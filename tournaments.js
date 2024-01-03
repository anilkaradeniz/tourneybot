
/*  
[
  {
    name,
    teams[ players[] ],
    players[],
  }
]

 */
import { WriteJson, ReadJson, AppendJsonList } from "./utils.js";

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
  }catch{
    WriteJson(jsonPath, []);
  }

  const obj = ReadJson(jsonPath);
  for (let i = 0; i < obj.length; i++){
    obj[i] = Object.assign(new Tournament, obj[i]);
    for (let j = 0; j < obj[i].teams.length; j++){
      obj[i].teams[j] = Object.assign(new Team, obj[i].teams[j]);
      for (let k = 0; k < obj[i].teams[j].players.length; k++){
        obj[i].teams[j].players[k] = Object.assign(new Player, obj[i].teams[j].players[k]);
      }
    }
    for (let j = 0; j < obj[i].players.length; j++){
      obj[i].players[j] = Object.assign(new Player, obj[i].players[j]);
    }
  }
  console.log("tourslist", obj);
  return obj;
}

function getTournamentNames(){
  return toursList.map(({name})=>name);
}
export function createTournamentOptions(){
  const names = getTournamentNames();
  const list = [];
  for (var tr of toursList){
    list.push({
      label: tr.name,
      value: tr.name,
      description: tr.desc,
    });
  }
  console.log("choices:", list);
  return list //toursList.map(({name})=>name)
}

export function addTournament(name, desc){
  let newtr = new Tournament(name, desc);
  toursList.push(newtr);
  AppendJsonList(tourJsonPath, newtr);
}

addTournament("patates");
console.log("tours:", toursList);
