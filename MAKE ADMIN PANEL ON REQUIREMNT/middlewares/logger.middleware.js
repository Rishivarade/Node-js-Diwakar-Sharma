const express = require("express");
const fs = require("fs");
// Middleware to log the requests
const logger = (req, res, next) => {
  const timestamp = new Date().toString();
  const logPath = "./logs.txt";
  const logMessage=`URL: ${req.url}, Method: ${req.method}, Timestamp: ${timestamp}\n`;
  // Append log data to logs.txt
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
  
  next();
};

module.exports = logger