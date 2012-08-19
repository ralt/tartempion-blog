var assert = require( 'assert' ),
    controller = require( '../controller.js' );

describe( 'Controller', function() {
    it( 'should return true', function() {
        assert.equal( true, true );
    });

    it( 'should not pass', function() {
        assert.equal( true, false );
    });
});

