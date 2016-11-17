import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

let imageValue = '';

const handleCamera = (event) => {
	if (Meteor.isClient){
		function onSuccess(imageData) {
			var rootUrl = "file://app/img/";
		    // imageValue = "data:image/jpeg;base64," + imageData;		    

		    document.addEventListener('deviceready', function () {
			    cordova.plugins.email.isAvailable(
				    function (isAvailable) {
				    	console.log('Service is available ' + imageData);
				    	
				    	// var attachment = "<img src='"+ imageValue +"'/>";
				    	// ReactDOM.render(<Image src={ imageValue } thumbnail/>, imageHolder);
				    	
				    	var filePathArr = imageData.split("/");
				    	var fileName = filePathArr[filePathArr.length-1];
						var contentType = fileName.split(".");
						contentType = contentType[contentType.length-1]; 

				    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				    		var fileTransfer = new FileTransfer();
				    		var path = fileSystem.root.toURL() + fileName;

				    		fileTransfer.download(
				    			imageData,
				    			path,
				    			function(success){
				    				var newFilePath = WebAppLocalServer.localFileSystemUrl(path);
				    				var attachment = "<img src='" + newFilePath + "'/>";
				    				console.log(newFilePath);
				    				ReactDOM.render(<Image src={ newFilePath } thumbnail/>, imageHolder);
						    		Meteor.call('sendEmail',
							            'char.hacinas@gmail.com',
							            'char.hacinas@98labs.com',
							            'Hello from Meteor!',
							            fileName,
							            newFilePath);
				    			},
				    			function(error){
				    				console.log("error saving file" + JSON.stringify(error));
				    			}
				    		);
				    	});

				    	// Meteor.call('sendEmail',
				     //        'char.hacinas@gmail.com',
				     //        'char.hacinas@98labs.com',
				     //        'Hello from Meteor!',
				     //        attachment);
				        // alert('Service is not available') unless isAvailable;
				    }
				);
			}, false);
		}

	 	function onFail(message) {
	    	alert('Failed because: ' + message);
	 	}

	 	Meteor.startup(function() {//DATA_URL
		    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		    	destinationType: Camera.DestinationType.FILE_URI 
		    });
		});

	}
};

export const OpenCamera = () => (
	<div>				
		<ButtonToolbar>
			<Button bsStyle="primary" onClick={ handleCamera }>Camera</Button>
			<div id="imageHolder"></div>
		</ButtonToolbar>
	</div>
);