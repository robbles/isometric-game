
// Dimensions of a tile sprite
var SPRITE_WIDTH = 128;
var SPRITE_HEIGHT = 128;

// Dimensions of a isometric tile (actually half for convenience)
var ISO_TILE_WIDTH = SPRITE_WIDTH/2;
var ISO_TILE_HEIGHT = SPRITE_WIDTH/4;

// How many rows and columns in one sector
var SECTOR_ROWS = 10;
var SECTOR_COLS = 10;

// Dimensions of main playground (auto size to one sector)
var PLAYGROUND_WIDTH = SECTOR_COLS * ISO_TILE_WIDTH * 2;
var PLAYGROUND_HEIGHT = SECTOR_ROWS * ISO_TILE_HEIGHT * 2;

// Sprite for floor tile (temporary)
var FLOOR_SPRITE = '/basic_tile128.png'

// TODO: use spritesheet with offsets instead
var SPRITES = {
    'F': new $.gameQuery.Animation({
        imageURL: 'images/basic_tile128.png',
    }),
    'B': new $.gameQuery.Animation({
        imageURL: 'images/basic_block128.png',
    }),
}

var TILES = [
    {x:0,y:0,s:'B'},{x:0,y:1,s:'B'},{x:0,y:2,s:'B'},{x:0,y:3,s:'B'},{x:0,y:4,s:'B'},{x:0,y:5,s:'B'},{x:0,y:6,s:'B'},{x:0,y:7,s:'B'},{x:0,y:8,s:'B'},{x:0,y:9,s:'B'},
    {x:1,y:0,s:'B'},{x:1,y:1,s:'B'},{x:1,y:2,s:'F'},{x:1,y:3,s:'F'},{x:1,y:4,s:'F'},{x:1,y:5,s:'F'},{x:1,y:6,s:'F'},{x:1,y:7,s:'F'},{x:1,y:8,s:'F'},{x:1,y:9,s:'B'},
    {x:2,y:0,s:'B'},{x:2,y:1,s:'B'},{x:2,y:2,s:'F'},{x:2,y:3,s:'F'},{x:2,y:4,s:'F'},{x:2,y:5,s:'F'},{x:2,y:6,s:'F'},{x:2,y:7,s:'F'},{x:2,y:8,s:'F'},{x:2,y:9,s:'B'},
    {x:3,y:0,s:'B'},{x:3,y:1,s:'B'},{x:3,y:2,s:'B'},{x:3,y:3,s:'F'},{x:3,y:4,s:'F'},{x:3,y:5,s:'F'},{x:3,y:6,s:'F'},{x:3,y:7,s:'F'},{x:3,y:8,s:'F'},{x:3,y:9,s:'B'},
    {x:4,y:0,s:'B'},{x:4,y:1,s:'F'},{x:4,y:2,s:'B'},{x:4,y:3,s:'B'},{x:4,y:4,s:'B'},{x:4,y:5,s:'F'},{x:4,y:6,s:'F'},{x:4,y:7,s:'F'},{x:4,y:8,s:'F'},{x:4,y:9,s:'F'},
    {x:5,y:0,s:'B'},{x:5,y:1,s:'F'},{x:5,y:2,s:'F'},{x:5,y:3,s:'B'},{x:5,y:4,s:'B'},{x:5,y:5,s:'F'},{x:5,y:6,s:'F'},{x:5,y:7,s:'F'},{x:5,y:8,s:'F'},{x:5,y:9,s:'F'},
    {x:6,y:0,s:'B'},{x:6,y:1,s:'F'},{x:6,y:2,s:'F'},{x:6,y:3,s:'F'},{x:6,y:4,s:'F'},{x:6,y:5,s:'F'},{x:6,y:6,s:'F'},{x:6,y:7,s:'F'},{x:6,y:8,s:'F'},{x:6,y:9,s:'B'},
    {x:7,y:0,s:'B'},{x:7,y:1,s:'F'},{x:7,y:2,s:'F'},{x:7,y:3,s:'F'},{x:7,y:4,s:'F'},{x:7,y:5,s:'F'},{x:7,y:6,s:'F'},{x:7,y:7,s:'F'},{x:7,y:8,s:'F'},{x:7,y:9,s:'B'},
    {x:8,y:0,s:'B'},{x:8,y:1,s:'F'},{x:8,y:2,s:'F'},{x:8,y:3,s:'F'},{x:8,y:4,s:'F'},{x:8,y:5,s:'F'},{x:8,y:6,s:'F'},{x:8,y:7,s:'F'},{x:8,y:8,s:'F'},{x:8,y:9,s:'B'},
    {x:9,y:0,s:'B'},{x:9,y:1,s:'B'},{x:9,y:2,s:'B'},{x:9,y:3,s:'B'},{x:9,y:4,s:'B'},{x:9,y:5,s:'F'},{x:9,y:6,s:'F'},{x:9,y:7,s:'B'},{x:9,y:8,s:'B'},{x:9,y:9,s:'B'},
]

var buildSector = function(parent) {
    TILES.forEach(function(tile) {
        var iso = cartToIso(tile);
        var sprite = SPRITES[tile.s];
        var sector = 0;

        $(parent).addSprite(tileName(sector, tile), {
            animation: sprite,
            width: SPRITE_WIDTH, 
            height: SPRITE_HEIGHT,
            posx: iso.x,
            posy: iso.y,
        });

        // Debugging overlay
        $('#' + tileName(sector, tile)).addClass('tile').addClass('tile' + tile.s)
        .html('<p>' + tile.x + ',' + tile.y + '</p>');

    });
};

var cartToIso = function(position) {
    // Shift into viewport and correct for sprite height
    offsetY = (SECTOR_ROWS-2) * ISO_TILE_HEIGHT;
    offsetX = -1 * ISO_TILE_WIDTH;
    return {
        x: iso2cartX(position.x, position.y, 0) + offsetX,
        y: iso2cartY(position.x, position.y, 0) + offsetY,
    }
}

var iso2cartX = function (x, y, z) {
    return ((SECTOR_COLS - x) * ISO_TILE_WIDTH) + (y * ISO_TILE_WIDTH);
}

var iso2cartY = function (x, y, z) {
    return ((SECTOR_COLS - x) * -ISO_TILE_HEIGHT) + (y * ISO_TILE_HEIGHT);
}

var randomRGBA = function(opacity) {
    var randInt = function() { return parseInt(Math.random() * 255) };
    return 'rgba(' + randInt() + ',' + randInt() + ',' + randInt() + ',' + opacity + ')';
}

var tileName = function(sector, position) {
    return "sector-" + sector + "-tile-" + position.x + "-" + position.y
}

var isoDepth = function(x, y, z) {
    return null; // FIXME
}



$(document).ready(function() {

    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
    .addGroup("floor", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("dude",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});


    buildSector("#floor");

    $.playground().startGame(function() {
        console.log('game started!');
    });

});

if(window.console == null || window.console == 'undefined') {
    window.console = {
        log: function() {},
    }
}



