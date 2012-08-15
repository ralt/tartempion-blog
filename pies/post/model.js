var Posts;

module.exports = {
    getAll: function( callback ) {
        loadCollection.bind( this )( function( Posts ) {
            Posts.find( {}, {
                limit: 10,
                sort: 'slug'
            }).toArray( function( err, posts ) {
                if ( err ) throw err;
                callback( posts );
            });
        });
    },

    get: function( slug, callback ) {
        loadCollection.bind( this )( function( Posts ) {
            Posts.findOne( { slug: slug }, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
        });
    },

    save: function( body, callback ) {
        var post = {
            _id: body._id,
            title: body.title,
            body: body.body,
            slug: slugify( body.title )
        };
        loadCollection.bind( this )( function( Posts ) {
            Posts.save( post, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
        });
    },

    'delete': function( body, callback ) {
        loadCollection.bind( this )( function( Posts ) {
            Posts.remove( { slug: slugify( body.title ) },
                function( err ) {
                if ( err ) throw err;
                callback();
            });
        });
    },

    'new': function( body, callback ) {
        var post = {
            title: body.title,
            body: body.body,
            slug: slugify( body.title )
        };
        loadCollection.bind( this )( function( Posts ) {
            Posts.save( post, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
        });
    }
};

// Thank you, TomShreds! https://github.com/Brainpad
function slugify( text ) {
    var from, i, l, to;
    str = str.replace( /^\s+|\s+$/g, '' );
    str = str.toLowerCase();
    from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:';
    to = 'aaaaeeeeiiiioooouuuunc------';
    i = 0;
    l = from.length;
    while( i < l ) {
        str = str.replace(
            new RegExp( from.charAt( i ), 'g' ),
            to.charAt( i )
        );
        i++;
    }
    str = str
        .replace( /[^a-z0-9 -]/g, '' )
        .replace( /\s+/g, '-' )
        .replace( /-+/g, '-' );
    return str;
}

function loadCollection( callback ) {
    this.db.collection( 'posts', function( err, posts ) {
        if ( err ) throw err;
        callback( posts );
    });
}

