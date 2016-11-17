(function(){

	// Initialize Firebase
    var config = {
      apiKey: "AIzaSyDUno8-HYsNrZ1EPy-dJFJ2WjspCd0MJ4A",
      authDomain: "fir-selfie-demo.firebaseapp.com",
      databaseURL: "https://fir-selfie-demo.firebaseio.com",
      storageBucket: "fir-selfie-demo.appspot.com",
      messagingSenderId: "869302799165"
    };
    firebase.initializeApp(config);

    const preObject = document.getElementById("object");

      //
      var uploader = document.getElementById('uploader');
      var fileButton = document.getElementById('fileButton');

      //Create DB Ref
      var dbRef = firebase.database().ref().child('object');

      //sync db changes
      dbRef.on('value', snap => console.log(snap.val()));

      //Listen for file selection
      fileButton.addEventListener('change', function(e){

        //Get the file
        var file = e.target.files[0];
        //file location in storage
        var fileLoc = "photos/" + file.name;

        //Create Storage ref
        var storageRef = firebase.storage().ref(fileLoc);

        //upload file
        storageRef.put(file);

        //update prog bar
        task.on('state_changed',

          function progress(snapshot){
            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value = percentage;
          }, 

          function error(err){

          },

          function complete(){

          }

          );
      });
});