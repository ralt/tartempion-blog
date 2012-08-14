module.exports = {
    requireLogged: function( req, res ) {
        if ( req.session.uid ) {
            next();
        }
        else {
            res.redirect( '/login' );
        }
    },

    requireGuest: function( req, res ) {
        if ( !req.session.uid ) {
            next();
        }
        else {
            res.redirect( '/' );
        }
    }
};

