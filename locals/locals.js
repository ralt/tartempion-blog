module.exports = {
    locals: {
        renderScriptsTags: function( scripts ) {
            if ( scripts ) {
                return scripts.map( function( script ) {
                    return '<script src="' + script + '"></script>';
                }).join( '\n' );
            }
            else {
                return '';
            }
        }
    },
};

