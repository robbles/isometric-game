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
    'PlayerUp': new $.gameQuery.Animation({
        imageURL: 'images/dude_flipped.png',
    }),
    'PlayerLeft': new $.gameQuery.Animation({
        imageURL: 'images/dude.png',
    }),
    'PlayerDown': new $.gameQuery.Animation({
        imageURL: 'images/dude_flipped.png',
    }),
    'PlayerRight': new $.gameQuery.Animation({
        imageURL: 'images/dude.png',
    }),
};

// Sector tile data
// TODO: turn this into a map of { x,y => [tile, objects...] }
var TILES = [
    // Floors and walls
    {x:0,y:0,h:1,s:'B'},{x:0,y:1,h:1,s:'B'},{x:0,y:2,h:1,s:'B'},{x:0,y:3,h:1,s:'B'},{x:0,y:4,h:1,s:'B'},{x:0,y:5,h:1,s:'B'},{x:0,y:6,h:1,s:'B'},{x:0,y:7,h:1,s:'B'},{x:0,y:8,h:1,s:'B'},{x:0,y:9,h:1,s:'B'},
    {x:1,y:0,h:1,s:'B'},{x:1,y:1,h:1,s:'B'},{x:1,y:2,h:0,s:'F'},{x:1,y:3,h:0,s:'F'},{x:1,y:4,h:0,s:'F'},{x:1,y:5,h:0,s:'F'},{x:1,y:6,h:0,s:'F'},{x:1,y:7,h:0,s:'F'},{x:1,y:8,h:0,s:'F'},{x:1,y:9,h:1,s:'B'},
    {x:2,y:0,h:1,s:'B'},{x:2,y:1,h:1,s:'B'},{x:2,y:2,h:0,s:'F'},{x:2,y:3,h:0,s:'F'},{x:2,y:4,h:0,s:'F'},{x:2,y:5,h:0,s:'F'},{x:2,y:6,h:0,s:'F'},{x:2,y:7,h:0,s:'F'},{x:2,y:8,h:0,s:'F'},{x:2,y:9,h:1,s:'B'},
    {x:3,y:0,h:1,s:'B'},{x:3,y:1,h:1,s:'B'},{x:3,y:2,h:1,s:'B'},{x:3,y:3,h:0,s:'F'},{x:3,y:4,h:0,s:'F'},{x:3,y:5,h:0,s:'F'},{x:3,y:6,h:0,s:'F'},{x:3,y:7,h:0,s:'F'},{x:3,y:8,h:0,s:'F'},{x:3,y:9,h:1,s:'B'},
    {x:4,y:0,h:1,s:'B'},{x:4,y:1,h:0,s:'F'},{x:4,y:2,h:1,s:'B'},{x:4,y:3,h:1,s:'B'},{x:4,y:4,h:1,s:'B'},{x:4,y:5,h:0,s:'F'},{x:4,y:6,h:0,s:'F'},{x:4,y:7,h:0,s:'F'},{x:4,y:8,h:0,s:'F'},{x:4,y:9,h:1,s:'F'},
    {x:5,y:0,h:1,s:'B'},{x:5,y:1,h:0,s:'F'},{x:5,y:2,h:0,s:'F'},{x:5,y:3,h:1,s:'B'},{x:5,y:4,h:1,s:'B'},{x:5,y:5,h:0,s:'F'},{x:5,y:6,h:0,s:'F'},{x:5,y:7,h:0,s:'F'},{x:5,y:8,h:0,s:'F'},{x:5,y:9,h:1,s:'F'},
    {x:6,y:0,h:1,s:'B'},{x:6,y:1,h:0,s:'F'},{x:6,y:2,h:0,s:'F'},{x:6,y:3,h:0,s:'F'},{x:6,y:4,h:0,s:'F'},{x:6,y:5,h:0,s:'F'},{x:6,y:6,h:0,s:'F'},{x:6,y:7,h:0,s:'F'},{x:6,y:8,h:0,s:'F'},{x:6,y:9,h:1,s:'B'},
    {x:7,y:0,h:1,s:'B'},{x:7,y:1,h:0,s:'F'},{x:7,y:2,h:0,s:'F'},{x:7,y:3,h:0,s:'F'},{x:7,y:4,h:0,s:'F'},{x:7,y:5,h:0,s:'F'},{x:7,y:6,h:0,s:'F'},{x:7,y:7,h:0,s:'F'},{x:7,y:8,h:0,s:'F'},{x:7,y:9,h:1,s:'B'},
    {x:8,y:0,h:1,s:'B'},{x:8,y:1,h:0,s:'F'},{x:8,y:2,h:0,s:'F'},{x:8,y:3,h:0,s:'F'},{x:8,y:4,h:0,s:'F'},{x:8,y:5,h:0,s:'F'},{x:8,y:6,h:0,s:'F'},{x:8,y:7,h:0,s:'F'},{x:8,y:8,h:0,s:'F'},{x:8,y:9,h:1,s:'B'},
    {x:9,y:0,h:1,s:'B'},{x:9,y:1,h:1,s:'B'},{x:9,y:2,h:1,s:'B'},{x:9,y:3,h:1,s:'B'},{x:9,y:4,h:1,s:'B'},{x:9,y:5,h:0,s:'F'},{x:9,y:6,h:0,s:'F'},{x:9,y:7,h:1,s:'B'},{x:9,y:8,h:1,s:'B'},{x:9,y:9,h:1,s:'B'},

    // Doors and items
    {x:4,y:9,z:1,h:1,s:'D'},
    {x:5,y:9,z:1,h:1,s:'D'},
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
    sprite: SPRITES['PlayerRight'],
    status: Motion.PLACED,
    $: null,
    before: null,
    after: null,
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
    var playerTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];

    $.playground().addSprite('dude', {
        animation: PLAYER.sprite,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
        posx: playerTile.x,
        posy: playerTile.y - (SECTOR_ROWS * ISO_TILE_HEIGHT),
    });
    $.playground().addSprite('dude-before', {
        animation: PLAYER.sprite,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
        posx: 0, posy: 0,
    });
    $.playground().addSprite('dude-after', {
        animation: PLAYER.sprite,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
        posx: 0, posy: 0,
    });
    PLAYER.$ = $('#dude');
    PLAYER.before = $('#dude-before').detach();
    PLAYER.after = $('#dude-after').detach();

    // Position the player
    positionPlayer(sector);

    $(document).keydown(function(event) {
        // Prevent scrolling from arrow keys
        if(isMovementKey(event.which)) {
            event.preventDefault();
        }

        // Only trigger movement when stationary or finished moving
        if(PLAYER.status != Motion.STATIONERY) {
            return;
        }

        // Check for arrow keys / WASD
        switch(event.which) {
            // UP
            case 87:
            case 38:
            PLAYER.status = Motion.MOVING_UP;
            break;
            // LEFT
            case 65:
            case 37:
            PLAYER.status = Motion.MOVING_LEFT;
            break;
            // DOWN
            case 83:
            case 40:
            PLAYER.status = Motion.MOVING_DOWN;
            break;
            // RIGHT
            case 68:
            case 39:
            PLAYER.status = Motion.MOVING_RIGHT;
            break;

            default:
            // Leave unknown keyboard events alone
            return;
        }
        // If default wasn't hit (known event), cancel the event
        event.preventDefault();

        // reposition player
        positionPlayer();
    });

    // Start the game!
    $.playground().startGame(function() {
        console.log('game started!');
    });
});

var positionPlayer = function() {

    var currentTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];

    var playerMoved = true;
    var goalX = PLAYER.x;
    var goalY = PLAYER.y;

    switch(PLAYER.status) {
        case Motion.PLACED:
        PLAYER.status = Motion.STATIONERY;
        break;

        case Motion.MOVING_UP:
        goalY--;
        PLAYER.sprite = SPRITES['PlayerUp']
        break;

        case Motion.MOVING_LEFT:
        goalX++;
        PLAYER.sprite = SPRITES['PlayerLeft']
        break;

        case Motion.MOVING_DOWN:
        goalY++;
        PLAYER.sprite = SPRITES['PlayerDown']
        break;

        case Motion.MOVING_RIGHT:
        goalX--;
        PLAYER.sprite = SPRITES['PlayerRight']
        break;

        default: playerMoved = false;
    }

    // Update player animation
    PLAYER.$.setAnimation(PLAYER.sprite);
    PLAYER.before.setAnimation(PLAYER.sprite);
    PLAYER.after.setAnimation(PLAYER.sprite);

    if(canMoveTo(goalX, goalY)) {
        // Move is valid, proceed
        PLAYER.x = goalX;
        PLAYER.y = goalY;
    } else {
        // Can't move that way - cancel movement
        console.log('blocked!');
        PLAYER.status = Motion.STATIONERY;
        return;
    }

    if(!playerMoved) {
        console.log('no movement');
        return;
    }


    var goalTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];

    // Place before/after copies of player in each tile
    PLAYER.before.appendTo(currentTile.$)
    .css({
        'left': 0,
        'top': 0,
    });
    PLAYER.after.appendTo(goalTile.$)
    .css({
        'left': currentTile.x - goalTile.x,
        'top': currentTile.y - goalTile.y,
    });

    // Slide each toward final location
    setTimeout(function() {
        PLAYER.before.css({
            'left': goalTile.x - currentTile.x,
            'top': goalTile.y - currentTile.y,
        });
        PLAYER.after.css({
            'left': 0,
            'top': 0,
        });
    }, 0);

    // Move player, adjust z-index to final value and hide
    PLAYER.$.css({
        'left': goalTile.x,
        'top': goalTile.y,
        'z-index': isoDepth(PLAYER.x, PLAYER.y),
        'opacity': 0,
    }).bind('webkitTransitionEnd mozTransitionEnd transitionend', function(event) {
        // After transition is done, take out copies
        PLAYER.before.detach();
        PLAYER.after.detach();
        // Unbind event
        $(this).unbind('webkitTransitionEnd mozTransitionEnd transitionend')
        // Show the real player again
        .css({
            'opacity': 1,
        });
        PLAYER.status = Motion.STATIONERY;
    });

    // Experimental: allow next movement earlier with timeout
    setTimeout(function() {
        PLAYER.status = Motion.STATIONERY;
    }, 150);

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
            $: selector,
            floor: (tile.h == 0),
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
    if(x < 0 || y < 0) {
        return false;
    }
    if(x >= SECTOR_COLS || y >= SECTOR_ROWS) {
        return false;
    }
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
 *Check if the given key is in WASD or arrow keys
 */
var isMovementKey = function(key) {
    var found = false;
    [87, 38, 65, 37, 83, 40, 68, 39].forEach(function(knownKey) {
        if(key == knownKey) {
            found = true;
        }
    });
    return found;
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




