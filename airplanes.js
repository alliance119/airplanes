var inputarr=[[9,3,4000],[7,4,4000],[5,4,4000],[5,8,3000],[3,20,2500],[2,3,4000],[3,3,4000],[1,3,4000]]

function ParachutistGroup(id,number,height) {
	this.id = id;
	this.number = number;
	this.height = height;
}

function compareParachutistGroup(a,b){
	if (a.number < b.number){return 1;}
	else if (a.number > b.number){return -1;}
        else {return 0;}
}


function getParachutistGroupArray(somearr){
	var parachutistGroupArray = [];
	for (var i=0;i<somearr.length;i++){
		for (j=0;j<somearr[i][1];j++){
			parachutistGroupArray.push(new ParachutistGroup(0,somearr[i][0],somearr[i][2]))
		}
	}
	parachutistGroupArray.sort(compareParachutistGroup);
	for (i=0;i<parachutistGroupArray.length;i++){
		parachutistGroupArray[i].id=i;
	}
	return parachutistGroupArray;
}

console.log(getParachutistGroupArray(inputarr));


function Flight(id,groups,freePlaces) {
        this.id = id;
	this.groups = groups;
	this.freePlaces = freePlaces;
	this.addGroup = function(parachutistGroup) {
		if (this.freePlaces<parachutistGroup.number){
			return 1;
		}
		else{
			this.groups.push(parachutistGroup);
			this.freePlaces-=parachutistGroup.number;
			return 0;
		}
	};
}

function getFlightsArray(parachutistGroupArray){
	var flightsArray = [];
	flightsArray.push(new Flight(0,[],20));
	flightsArray[0].addGroup(parachutistGroupArray[0]);
	var flightToAddGroup = {id: flightsArray.length, freePlaces: 20};
	for (var i=1; i<parachutistGroupArray.length;i++){
		flightToAddGroup.id=flightsArray.length;
		flightToAddGroup.freePlaces=20;
		for (var j=0;j<flightsArray.length;j++){
			if (flightsArray[j].freePlaces>=parachutistGroupArray[i].number){
				if (flightsArray[j].freePlaces-parachutistGroupArray[i].number<flightToAddGroup.freePlaces){
					flightToAddGroup.id=j;
					flightToAddGroup.freePlaces=flightsArray[j].freePlaces-parachutistGroupArray[i].number;
				}
			}
		}
		if (flightToAddGroup.id===flightsArray.length){
			flightsArray.push(new Flight(flightsArray.length,[],20));
			flightsArray[flightsArray.length-1].addGroup(parachutistGroupArray[i]);
		}
		else{
			flightsArray[flightToAddGroup.id].addGroup(parachutistGroupArray[i]);
		}
	}
	return flightsArray;
}


var myflightsArray = getFlightsArray(getParachutistGroupArray(inputarr));

for (var i=0; i<myflightsArray.length; i++){
	console.log(myflightsArray[i]);
}
