import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import Request from 'react-http-request';
import { Table, Label, Image } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import renderHTML from 'react-render-html';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

function handleCamera(event) {
  let imageSrc = "";

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
                    
                    console.log("download path " + newFilePath);
                    Meteor.call('sendEmail',
                          'char.hacinas@gmail.com',
                          'char.hacinas@98labs.com',
                          'Hello from Meteor!');
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
        // navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        //   destinationType: Camera.DestinationType.FILE_URI 
        // });
        let cameraOptions = {
          width: 800,
          height: 600
        };

        MeteorCameraUI.getPicture(cameraOptions, function (error, data) {
          imageSrc = data;
          let base64 = data.split(",");

          console.log(imageSrc);
          ReactDOM.render(<Image src={ imageSrc } thumbnail/>, imageHolder);
          var attachment = "<img src=" + imageSrc + "/>";
                    
          // console.log("download path " + newFilePath);
          Meteor.call('sendEmail',
            'char.hacinas@gmail.com',
            'char.hacinas@98labs.com',
            'Hello from Meteor!' + attachment
          );

          let imageBlob = MeteorCameraUI.b64toBlob(base64[1], 'image/png', 50);
          console.log(imageBlob);

        });
    });

  }
}

const displayXML = () => {

    var httpRequest = new XMLHttpRequest();
    var apiKey = "TL8HDMBC0VF5EEC7G52FE1V515OD9VBO";
    var url = "http://test.auparadisduthe.com/api/orders/?ws_key=" + apiKey; //"http://jsonplaceholder.typicode.com/posts"; 

    
    httpRequest.open("GET", url, true);    
    // httpRequest.setRequestHeader('Content-Type', 'application/xml');
    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200 || httpRequest.status == 0) { 
            console.log(httpRequest);
            var returnString = "";

            // var ordersXML = httpRequest.response;
            // console.log(ordersXML);

            var ordersXml = httpRequest.response;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(ordersXml,"text/xml");

            console.log(ordersXml);
            var order = xmlDoc.getElementsByTagName("order");

            var jarray = ["id", "order"];

            var prestaOrders = [];
            var prestaOrderLength = order.length;
            console.log(prestaOrderLength);

            for(x = 0; x <= 10; x++) {
              prestaOrders[x] = { "id" : order[x].getAttribute("id") , "href" : order[x].getAttribute("xlink:href") };
              // console.log(JSON.stringify(prestaOrders));
            }

            var products = [{
                  id: 1,
                  name: "Item name 1",
                  price: 100
              },{
                  id: 2,
                  name: "Item name 2",
                  price: 100
              }];
            // It's a data format example.
            function priceFormatter(cell, row){
              return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
            }

            var options = {
             onRowClick: function(row){
                handleCamera(row);
             }
            };

            ReactDOM.render(
              <BootstrapTable data={prestaOrders} striped={true} hover={true} options={options}>
                  <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="href" dataSort={true}>Product Name</TableHeaderColumn>
              </BootstrapTable>,
                sampleTable
            );
          }
      }
    };

    console.log("asking for orders");
    httpRequest.send();
  
};

export const DataFromPresta = () => ( 
  <div id="prestaOrder">
  <div id="imageHolder"></div>
   <Table striped bordered condensed hover responsive>   
      <tbody id="tableBody">
        { displayXML() }
      </tbody>
   </Table>
   <div id="sampleTable">
   </div>
   </div>
   
	
);

