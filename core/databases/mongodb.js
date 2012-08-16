var mongodb = require( 'mongodb' ),
    Server = mongodb.Server,
    Db = mongodb.Db,
    evt = require( '../core.js' ).EventEmitter,
    database;

var MongoModule = {};

MongoModule.init = function() {
    // Create a mongo client object
    var client = new Db( this.config.databaseName,
        new Server(
            this.config.serverConfig.address,
            this.config.serverConfig.port,
            this.config.serverConfig.options
        ),
        this.config.options
    );


    // Open the connection
    client.open( function( err, db ) {
        if ( err ) throw err;
        database = db;
        console.log( 'Database driver loaded.' );
        evt.emit( 'tartempion' );
    });
};

MongoModule.collection = function() {
    database.collection.apply( database, arguments );
};

module.exports = function( config ) {
    MongoModule.config = config;
    return MongoModule;
};

