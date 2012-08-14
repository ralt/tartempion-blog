module.exports = {
    index: function( req, res ) {
        this.model.getAll( function( posts ) {
            res.render( 'posts/index', {
                title: 'Last posts',
                posts: posts
            });
        });
    },

    getOne: function( req, res ) {
        this.model.get( req.params.title,
            function( post ) {
            res.render( 'posts/read', {
                title: post.title,
                body: post.body
            });
        });
    },

    editGet: function( req, res ) {
        this.model.get( req.params.title,
            function( post ) {
            res.render( 'posts/edit', {
                _id: post._id,
                title: post.title,
                body: post.body
            });
        });
    },

    editPost: function( req, res ) {
        this.model.save( req.body, function( post ) {
            res.redirect( 'post/' + post.slug );
        });
    },

    'delete': function( req, res ) {
        this.model.delete( req.body, function() {
            res.redirect( '/' );
        });
    },

    'new': function( req, res ) {
        this.model.new( req.body, function( post ) {
            res.render( 'posts/read', {
                title: post.title,
                body: post.body
            });
        });
    }
};

