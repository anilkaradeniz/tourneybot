
/*  
[
  {
    name,
    teams[ players[] ],
    players[],
  }
]

 */
export const toursList = [];

export class Tournament{
  constructor(name, desc = ""){
    this.name = name;
    this.teams = [];
    this.players = [];
    this.desc = desc;
  }
}

export class Team{
  constructor(name){
    this.name = name;
    this.players = [];
  }
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
  toursList.push(new Tournament(name, desc));
}

addTournament("patates");
console.log("tours:", toursList);
