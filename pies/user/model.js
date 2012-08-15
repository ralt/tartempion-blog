var bcrypt = require( 'bcrypt' ),
    salt = 'Yay!',
    Users;

module.exports = {
    // Run at the initialization, it saves one callback in the
    // other methods.
    init: function() {
        this.db.collection( 'users', function( err, users ) {
            if ( err ) throw err;
            Users = users;
        });
    },
    checkPassword: function( body, callback ) {
        // First, encrypt the current password
        var password = body.password + salt;


        // Then, get the password for the username
        Users.findOne( { username: body.username },
            function( err, user ) {
            if ( err ) throw err;

            // And compare it with the provided one
            bcrypt.compare( password, user.password,
                function( err, res ) {
                if ( err ) throw err;

                if ( res ) {
                    callback( true );
                }
                else {
                    callback( false );
                }
            });
        });
    }
};

