var Posts;

module.exports = {
    // Run at the initialization, it saves one callback in the
    // other methods.
    init: function() {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            Posts = posts;
        });
    },

    getAll: function( callback ) {
        Posts.find( {}, {
            limit: 10,
            sort: 'slug'
        }).toArray( function( err, posts ) {
            if ( err ) throw err;
            callback( posts );
        });
    },

    get: function( slug, callback ) {
        Posts.findOne( { slug: slug }, function( err, post ) {
            if ( err ) throw err;
            callback( post );
        });
    },

    save: function( body, callback ) {
        var post = {
            _id: body._id
            title: body.title,
            body: body.body,
            slug: slugify( body.title )
        };
        Posts.save( post, function( err, post ) {
            if ( err ) throw err;
            callback( post );
        });
    },

    'delete': function( body, callback ) {
        Posts.remove( { slug: slugify( body.title ) },
            function( err ) {
            if ( err ) throw err;
            callback();
        });
    },

    'new': function( body, callback ) {
        var post = {
            title: body.title,
            body: body.body,
            slug: slugify( body.title )
        };
        Posts.save( post, function( err, post ) {
            if ( err ) throw err;
            callback( post );
        });
    }
};

// Taken from http://milesj.me/snippets/javascript/slugify
function slugify(text) {
    text = text.replace(/[^-a-zA-Z0-9,&\s]+/ifg, '');
    text = text.replace(/-/gi, "_");
    text = text.replace(/\s/gi,         "-");
    return text;
}

