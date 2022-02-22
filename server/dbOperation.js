const  config          = require('./db-connector'),
       sql            = require('mssql');

const getClients = async() => {
    try {
        let pool = await sql.connect(config);
        let Clients = pool.request().query("SELECT * from Clients")
        console.log(Clients);
        return Clientsl;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getClients
}