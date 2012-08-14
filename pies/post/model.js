module.exports = {
    getAll: function( callback ) {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            posts.find( {}, {
                limit: 10,
                sort: 'slug'
            }).toArray( function( err, posts ) {
                if ( err ) throw err;
                callback( posts );
            });
        });
    },

    get: function( slug, callback ) {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            posts.findOne( { slug: slug }, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
        });
    },

    save: function( body, callback ) {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            var post = {
                _id: body._id
                title: body.title,
                body: body.body,
                slug: slugify( body.title )
            };
            posts.save( post, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
        });
    },

    'delete': function( body, callback ) {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            posts.remove( { slug: slugify( body.title ) },
                function( err ) {
                if ( err ) throw err;
                callback();
            });
        });
    },

    'new': function( body, callback ) {
        this.db.collection( 'posts', function( err, posts ) {
            if ( err ) throw err;
            var post = {
                title: body.title,
                body: body.body,
                slug: slugify( body.title )
            };
            posts.save( post, function( err, post ) {
                if ( err ) throw err;
                callback( post );
            });
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

