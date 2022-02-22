// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var config = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_yili',
    password        : '7499',
    database        : 'cs340_yili'
})

// Export it for use in our application
module.exports.config = config;