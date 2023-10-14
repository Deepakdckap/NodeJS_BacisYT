const logEvents = require('./logEvents')   // improting the logEvents File in the index.js
// const express = require("express");  // importing Express into our application

const EventEmitter = require("events")

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// this .on() will listern whats the event is
myEmitter.on('log', (msg) => {
    logEvents(msg);    // sending the message as a parameter to the logEvents.js file
});
myEmitter.emit('log', 'log event emitted'); // we can listern the event by using emit; 