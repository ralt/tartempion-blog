module.exports = {
    loginGet: function( req, res ) {
        res.render( 'user/login' );
    },

    loginPost: function( req, res ) {
        this.model.checkPassword( req.body,
            function( check ) {
            if ( check ) {
                // First, set the session
                req.session.isLogged = true;

                // Then, redirect :-)
                res.redirect( '/' );
            }
            else {
                res.redirect( 'user/login' );
            }
        });
    },

    logout: function( req, res ) {
        req.session.destroy();
        res.redirect( 'user/login' );
    }
};

