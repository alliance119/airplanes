var inputarr=[[9,1,4000],[7,2,4000],[5,1,4000],[5,2,3000],[3,1,2500],[2,2,4000],[3,1,4000],[1,2,4000]];
var inputDataArr=[[[9,5,4000],[7,6,4000]],[[9,2,3000],[7,8,3000],[3,5,3000]],[[3,4,2500],[7,2,2500],[5,3,2500],[1,2,2500]]];

function ParachutistGroup(id,number,height,boarded) {
	this.id = id;
	this.number = number;
	this.height = height;
	this.boarded = boarded;
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
			parachutistGroupArray.push(new ParachutistGroup(0,somearr[i][0],somearr[i][2],false))
		}
	}
	parachutistGroupArray.sort(compareParachutistGroup);
	for (i=0;i<parachutistGroupArray.length;i++){
		parachutistGroupArray[i].id=i;
	}
	return parachutistGroupArray;
}


function Flight(id,groups,freePlaces) {
        this.id = id;
	this.groups = groups;
	this.freePlaces = freePlaces;
	this.addGroup = function(parachutistGroup) {
		if (this.freePlaces<parachutistGroup.number || parachutistGroup.boarded === true){
			return 1;
		}
		else{
			this.groups.push(parachutistGroup);
			this.freePlaces-=parachutistGroup.number;
			parachutistGroup.boarded = true;
			return 0;
		}
	};
}

function getFlightsArray(parachutistGroupArray){
	var flightsArray = [];
	var flightToAddGroup = {id: flightsArray.length, freePlaces: 20};
	for (var i=0; i<parachutistGroupArray.length;i++){
		if (parachutistGroupArray[i].boarded === false){
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
	}
	return flightsArray;
}

function fillFreePlaces (flightsArray,parachutistsGroupArr){
	for (var i=0;i<flightsArray.length;i++){
		for (var j=0;j<flightsArray[i].length;j++){
			if (flightsArray[i][j].freePlaces>0){
				for (var k=0;k<parachutistsGroupArr.length;k++){
					flightsArray[i][j].addGroup(parachutistsGroupArr[k]);
				}
			}
		}
	}
	return 0;
}

function minimizeFlights(inputDataArray){
	var minimizedFlightsArray = [];
	var parachutistGroupArray2d = [];
	for (var i=0;i<inputDataArray.length;i++){
		parachutistGroupArray2d.push(getParachutistGroupArray(inputDataArray[i]));
	}
	for (i=0;i<parachutistGroupArray2d.length;i++){
		minimizedFlightsArray.push(getFlightsArray(parachutistGroupArray2d[i]));
		if (i+1 < parachutistGroupArray2d.length){
			fillFreePlaces(minimizedFlightsArray,parachutistGroupArray2d[i+1])
		}
	}
	return minimizedFlightsArray;
}

var myminimizedFlightsArray = minimizeFlights(inputDataArr);

for (var i=0; i<myminimizedFlightsArray.length; i++){
	for (var j=0; j<myminimizedFlightsArray[i].length;j++){
		console.log(myminimizedFlightsArray[i][j]);
	}
}
