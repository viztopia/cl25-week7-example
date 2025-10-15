// Data array 

console.log("hiiii")
let messages = [
  {
    message: "This is the first message",
    time: "Mon Oct 14 2024 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 14 2024 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];

//STEP 1. Set up a server
// let express = require('express');
import express from 'express';
let app = express();

//17. Install lowdb
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

//18. Connect to db
const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//Serve a public folder
app.use(express.static('public'));
app.use(express.json()); //12. parse the data

//Listen
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

/*ROUTES */
//STEP 4-5. GET all the messages as an object
app.get('/messages', (request, response) => {
  //Send data as an object
  // let messagesData = {
  //   data: messages
  // }
  // response.json(messagesData);
  db.read()
    .then(() => {
      let messagesData = {
        data: db.data.messages
      }
      response.json(messagesData);
    })
});

//STEP 10. POST for a new message
app.post('/new-message', (request, response) => {

  db.read()
  // console.log(request.body);
  let messageData = request.body;
  messageData.time = Date();
  //13. Push to the messages array
  // messages.push(messageData);
  // console.log(messages)

  //14. Send the message back to the client
  let messageObject = {
    task: "success",
    message: messageData
  };
  db.data.messages.push(messageData);
  db.write()
    .then(() => {
      response.json(messageObject);
    })
});
