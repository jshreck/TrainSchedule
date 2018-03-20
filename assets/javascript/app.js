// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1MqCxkQf6Nc3T3oUMBDzVdZxoWlM-Dlk",
  authDomain: "trainschedule-7a996.firebaseapp.com",
  databaseURL: "https://trainschedule-7a996.firebaseio.com",
  projectId: "trainschedule-7a996",
  storageBucket: "trainschedule-7a996.appspot.com",
  messagingSenderId: "480470890423"
};
firebase.initializeApp(config);

var database = firebase.database();
//display anything in firebase on page


//Capture train info on click
$("#submit").on("click", function (event) {
  event.preventDefault();
  var newTrain = {
    name: `${$("#train-name").val().trim()}`,
    dest: `${$("#destination").val().trim()}`,
    start: `${$("#first-train-time").val()}`,
    freq: `${$("#frequency").val()}`,
  };
  console.log(newTrain)
  //Push info into firebase
  database.ref().push(newTrain);
  //clear inputs
  $("input").val("");
});


//Display on page; displays for every child and then when new child added
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  //static variables
  var train = childSnapshot.val();
  var name = train.name;
  var dest = train.dest;
  var freq = train.freq;
  //start as moment object for use in dynamic variables
  var start = moment(train.start, "HH:mm");
  var minFromStart = moment().diff(start, "minutes");

  //dynamic variables
  var nextTrain;
  var minTilNext;

//if train has started, find out when the next rain will come
//else the train will come at it's start time
//for each, how many minutes until that time
  if (minFromStart > 0) {
    nextTrain = start.add(Math.ceil(minFromStart / freq) * freq, "m");
    minTilNext = Math.abs(moment().diff(nextTrain, "minutes"));
    nextTrain = nextTrain.format("HH:mm");
  }
  else {
    nextTrain = train.start
    minTilNext = Math.abs(minFromStart);
  }

//appending to table
  $("#trains-added").append(`<tr>
 <td>${name}</td>
 <td>${dest}</td>
 <td>${freq}</td>
 <td>${nextTrain}</td>
 <td>${minTilNext + 1}</td></tr>`); //minTilNext off by 1 minute (not sure why) so did +1
});
