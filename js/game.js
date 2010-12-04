var DEBUG = false;

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
    'D': new $.gameQuery.Animation({
        imageURL: 'images/basic_door128.png',
    }),
    'R': new $.gameQuery.Animation({
        imageURL: 'images/dude.gif',
    }),
};

// Sector tile data
var TILES = [
    // Floors and walls
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

    // Doors and items
    {x:4,y:9,z:1,s:'D'},
    {x:5,y:9,z:1,s:'D'},
];

// Current sector, stores map of tiles and their locations
var SECTOR = {};

// Current attempted motion by the player
var Motion = {
    PLACED: 'Placed',
    STATIONERY: 'Stationery',
    MOVING_UP: 'Moving up',
    MOVING_RIGHT: 'Moving right',
    MOVING_DOWN: 'Moving down',
    MOVING_LEFT: 'Moving left',
};

// Stores current player position and status
var PLAYER = {
    sector: 0,
    x: 5,
    y: 5,
    sprite: 'R',
    status: Motion.PLACED,
};

$(document).ready(function() {

    // Setup the playground
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
    .addGroup("underneath", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("floor", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    ;

    // Build the current sector
    sector = PLAYER.sector;
    buildSector("#floor", sector);

    // Place the player
    console.log('adding the dude to game');
    $.playground().addSprite('dude', {
        animation: SPRITES[PLAYER.sprite],
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
    });

    // Position the player
    positionPlayer(sector);

    $(document).keydown(function(event) {
        switch(event.which) {
            // UP
            case 'w':
            case 38:
            PLAYER.status = Motion.MOVING_UP;
            break;
            // LEFT
            case 'a':
            case 37:
            PLAYER.status = Motion.MOVING_LEFT;
            break;
            // DOWN
            case 's':
            case 40:
            PLAYER.status = Motion.MOVING_DOWN;
            break;
            // RIGHT
            case 'd':
            case 39:
            PLAYER.status = Motion.MOVING_RIGHT;
            break;

            default:
            // Leave unknown keyboard events alone
            return;
        }
        console.log('keypress: player status = ' + PLAYER.status);
        // If default wasn't hit (known event), cancel the event
        event.preventDefault();

        // Asynchronously reposition player
        setTimeout(positionPlayer, 0);
    });

    // Start the game!
    $.playground().startGame(function() {
        console.log('game started!');
    });
});

var positionPlayer = function() {

    // TODO: look up floor tile for collisions

    var playerMoved = true;
    switch(PLAYER.status) {
        case Motion.PLACED:
        console.log ('just placed!');
        break;

        case Motion.MOVING_UP:
        PLAYER.y -= (PLAYER.y > 0 && canMoveTo(PLAYER.x, PLAYER.y-1))? 1: 0;
        break;

        case Motion.MOVING_LEFT:
        PLAYER.x += (PLAYER.x > 0 && canMoveTo(PLAYER.x+1, PLAYER.y))? 1: 0;
        break;

        case Motion.MOVING_DOWN:
        PLAYER.y += (PLAYER.y < SECTOR_ROWS && canMoveTo(PLAYER.x, PLAYER.y+1))? 1: 0;
        break;

        case Motion.MOVING_RIGHT:
        PLAYER.x -= (PLAYER.x < SECTOR_COLS && canMoveTo(PLAYER.x-1, PLAYER.y))? 1: 0;
        break;

        default: playerMoved = false;
    }

    if(!playerMoved) {
        console.log('no movement');
        return;
    }

    console.log('player is at ' + PLAYER.x + ',' + PLAYER.y);

    var playerTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];
    console.log('moving dude to ' + playerTile.x + ',' + playerTile.y);
    $('#dude').css({
        'left': playerTile.x,
        'top': playerTile.y,
        'z-index': isoDepth(PLAYER.x, PLAYER.y),
    });
}

var buildSector = function(parent, sector) {
    TILES.forEach(function(tile) {
        var iso = convertIso(tile);
        var sprite = SPRITES[tile.s];
        var name = tileName(sector, tile.x, tile.y, tile.z);

        $(parent).addSprite(name, {
            animation: sprite,
            width: SPRITE_WIDTH, 
            height: SPRITE_HEIGHT,
            posx: iso.x,
            posy: iso.y,
        });

        // Cache jQuery selector to avoid looking it up again
        var selector = $('#' + name);

        // Store block info in current sector metadata
        SECTOR[name] = {
            x: iso.x,
            y: iso.y,
            sprite: sprite,
            selector: selector,
            floor: (tile.s == 'F'),
        };

        var depth = isoDepth(tile.x, tile.y);
        selector.css('z-index', depth);

        // Debugging overlay
        if(DEBUG) {
            selector.addClass('tile').addClass('tile' + tile.s)
            .html('<p>' + tile.x + ',' + tile.y + ',' + depth + '</p>');
        }

    });
};

var canMoveTo = function(x, y) {
    name = tileName(PLAYER.sector, x, y);
    block = SECTOR[name];
    return block.floor;
}

/*-----------------------------------*/
/*            Utilities              */
/*-----------------------------------*/


/*
 *Calculate the 2D cartesian coordinates for an isometric tile
 */
var convertIso = function(tile) {
    // Shift into viewport and correct for sprite height
    offsetY = (SECTOR_ROWS-2) * ISO_TILE_HEIGHT;
    offsetX = -1 * ISO_TILE_WIDTH;
    return {
        x: iso2cartX(tile.x, tile.y, 0) + offsetX,
        y: iso2cartY(tile.x, tile.y, 0) + offsetY,
    }
}

/*
 *Calculate the X coordinate (CSS: left) given an isometric coordinate
 */
var iso2cartX = function (x, y, z) {
    return ((SECTOR_COLS - x) * ISO_TILE_WIDTH) + (y * ISO_TILE_WIDTH);
}

/*
 *Calculate the Y coordinate (CSS: top) given an isometric coordinate
 */
var iso2cartY = function (x, y, z) {
    return ((SECTOR_COLS - x) * -ISO_TILE_HEIGHT) + (y * ISO_TILE_HEIGHT);
}

/*
 *Generate a unique CSS ID for a tile in a given sector
 */
var tileName = function(sector, x, y, z) {
    if(z == null || z == 'undefined') {
        return "sector-" + sector + "-tile-" + x + "-" + y;
    } else {
        return "sector-" + sector + "-tile-" + x + "-" + y + '-' + z;
    }
}

/*
 *Calculate the z-index for a tile
 */
var isoDepth = function(x, y) {
    return x + (SECTOR_COLS * y);
}

/*
 *Generate a random color with the given opacity
 */
var randomRGBA = function(opacity) {
    var randInt = function() { return parseInt(Math.random() * 255) };
    return 'rgba(' + randInt() + ',' + randInt() + ',' + randInt() + ',' + opacity + ')';
}

/*
 *Prevent errors when console is missing
 */
if(window.console == null || window.console == 'undefined') {
    window.console = {
        log: function() {},
    }
}




