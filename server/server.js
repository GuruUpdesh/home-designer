const express      = require('express'),
      dbOperation  = require('./dbOperation'),
      cors         = require('cors');
    


dbOperation.getClients().then(res => {
    console.log(res)
})