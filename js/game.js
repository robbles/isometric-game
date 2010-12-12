var DEBUG = true;

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
    STATIONARY: 'Stationery',
    MOVING_UP: 'Moving up',
    MOVING_RIGHT: 'Moving right',
    MOVING_DOWN: 'Moving down',
    MOVING_LEFT: 'Moving left',
    FOLLOWING_PATH: 'Following a path',
};

// Stores current player position and status
var PLAYER = {
    sector: 0,
    x: 5,
    y: 5,
    sprite: SPRITES['PlayerRight'],
    status: Motion.PLACED,
    path: null,
    speed: 150,
    $: null,
    before: null,
    after: null,
};

var effects = null;

$(document).ready(function() {

    // Setup the playground
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
    .addGroup("underneath", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("floor", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("objects", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("effects", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    .addGroup("targets", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
    ;
  
    $('#underneath').css('z-index', -1);
    $('#floor').css('z-index', 0);
    $('#objects').css('z-index', 1);
    $('#effects').css('z-index', 2);
    $('#targets').css('z-index', 3);

    $('#effects').html('<canvas width="' + PLAYGROUND_WIDTH + '" height="' + PLAYGROUND_HEIGHT + '"></canvas>');
    effects = $('#effects canvas').get(0).getContext('2d');

    // Build the current sector
    sector = PLAYER.sector;
    buildSector("#floor", sector);

    // Place the player
    var playerTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];

    $('#floor').addSprite('dude', {
        animation: PLAYER.sprite,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
        posx: playerTile.x,
        posy: playerTile.y - (SECTOR_ROWS * ISO_TILE_HEIGHT),
    });
    $('#floor').addSprite('dude-before', {
        animation: PLAYER.sprite,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT,
        posx: 0, posy: 0,
    });
    $('#floor').addSprite('dude-after', {
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
        if(PLAYER.status != Motion.STATIONARY) {
            return;
        }

        // Check for arrow keys
        switch(event.which) {
            // UP
            case 38:
            PLAYER.status = Motion.MOVING_UP;
            break;
            // LEFT
            case 37:
            PLAYER.status = Motion.MOVING_LEFT;
            break;
            // DOWN
            case 40:
            PLAYER.status = Motion.MOVING_DOWN;
            break;
            // RIGHT
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
        console.log('game started yeaaaaaaah!');
    });
});

var positionPlayer = function() {

    var currentTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];

    var playerMoved = true;
    var goalX = PLAYER.x;
    var goalY = PLAYER.y;

    switch(PLAYER.status) {
        case Motion.PLACED:
        PLAYER.status = Motion.STATIONARY;
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

        case Motion.FOLLOWING_PATH:
        var node = PLAYER.path.nodes.shift();
        if(node === null || typeof(node) === 'undefined') {
            PLAYER.status = Motion.STATIONARY;
            effects.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT);
            console.log('done path!');
        } else {
            goalX = node.x;
            goalY = node.y;
            console.log('next point on path: ' + goalX + ',' + goalY);
        }
        if(goalX != PLAYER.x) {
            PLAYER.sprite = SPRITES['PlayerRight']
        }
        if(goalY != PLAYER.y) {
            PLAYER.sprite = SPRITES['PlayerUp']
        }
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
        PLAYER.status = Motion.STATIONARY;
        return;
    }

    if(!playerMoved) {
        console.log('no movement');
        return;
    }

    var goalTile = SECTOR[tileName(sector, PLAYER.x, PLAYER.y)];
    var slideTime = PLAYER.speed;

    // Place before/after copies of player in each tile
    PLAYER.before.appendTo(currentTile.$)
    .css({
        'left': 0,
        'top': 0,
    }).animate({
        'left': goalTile.x - currentTile.x,
        'top': goalTile.y - currentTile.y,
    }, slideTime);

    PLAYER.after.appendTo(goalTile.$)
    .css({
        'left': currentTile.x - goalTile.x,
        'top': currentTile.y - goalTile.y,
    }).animate({
        'left': 0,
        'top': 0,
    }, slideTime);

    // Move player, adjust z-index to final value and hide
    PLAYER.$.css({
        'left': goalTile.x,
        'top': goalTile.y,
        'z-index': isoDepth(PLAYER.x, PLAYER.y),
        'opacity': 0,
    });

    setTimeout(function() {
        // After transition is done, take out copies
        PLAYER.before.detach();
        PLAYER.after.detach();
        // Show the real player again
        PLAYER.$.css({
            'opacity': 1,
        });
        if(PLAYER.status != Motion.FOLLOWING_PATH) {
            PLAYER.status = Motion.STATIONARY;
        } else {
            setTimeout(positionPlayer, 100);
        }
            
    }, slideTime);
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

        if(sprite === SPRITES['F']) {
            $('#targets').addSprite(name + "-target", {
                width: SPRITE_WIDTH, 
                height: SPRITE_HEIGHT/2,
                posx: iso.x,
                posy: iso.y + SPRITE_HEIGHT/2,
            }).children('#' + name + '-target')
            .attr('rel', name)
            .bind('click touchstart', function(event) {
                console.log('clicked on ' + $(this).attr('id'));
                console.log(event.pageX, event.pageY);

                // Skip if outside box
                var target = $(this);
                var offset = target.offset();
                if(!isInsideIsoBox(event.pageX, event.pageY, offset.left, offset.top, SPRITE_WIDTH, SPRITE_HEIGHT/2)) {
                    console.log('Not in iso box!');

                    // Delegate click to the right element
                    target = $(this).siblings().filter(function() {
                        var offset = $(this).offset();
                        return isInsideIsoBox(event.pageX, event.pageY, offset.left, offset.top, SPRITE_WIDTH, SPRITE_HEIGHT/2);
                    }).eq(0);

                    console.log('actually clicked on ' + target.attr('id'));
                }

                drawPath(target);

                event.preventDefault();
                return false;
            });
        }


        // Cache jQuery selector to avoid looking it up again
        var selector = $('#' + name);

        // Store block info in current sector metadata
        SECTOR[name] = {
            xi: tile.x,
            yi: tile.y,
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
            .html('<p>' + tile.x + ',' + tile.y + '</p>');
        }

    });
};

var drawPath = function(target) {
    var graph = new crow.Graph();

    $.each(SECTOR, function(tileName) {
        var tile = SECTOR[tileName];
        if(tile.floor) {
            graph.addNode(new crow.GridNode([tile.xi, tile.yi]));
        }
    });

    var targetInfo = SECTOR[target.attr('rel')];

    var path = graph.findGoal({
        start: graph.getNode(PLAYER.x, PLAYER.y), 
        goal: graph.getNode(targetInfo.xi, targetInfo.yi)
    });
    console.log(path);

    effects.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT);

    effects.strokeStyle = 'rgba(0,100,255,0.2)';
    effects.lineWidth = 8;
    effects.lineCap = 'round';
    effects.beginPath();
    var node = path.start;
    var tile = SECTOR[tileName(PLAYER.sector, node.x, node.y)];
    effects.moveTo(tile.x + SPRITE_WIDTH/2, tile.y + SPRITE_HEIGHT*3/4);
    $.each(path.nodes, function(index) {
        tile = SECTOR[tileName(PLAYER.sector, this.x, this.y)];
        effects.lineTo(tile.x + SPRITE_WIDTH/2, tile.y + SPRITE_HEIGHT*3/4);
    });
    effects.stroke();

    PLAYER.path = path;
    PLAYER.status = Motion.FOLLOWING_PATH;
    positionPlayer();
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

var isInsideIsoBox = function(clickX, clickY, boxX, boxY, isoWidth, isoHeight) {
    var x = clickX - (boxX + isoWidth / 2);
    var y = clickY - (boxY + isoHeight / 2);
    return (Math.abs(x) <= (64 - 2 * Math.abs(y)));
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
 *Check if the given key is in arrow keys
 */
var isMovementKey = function(key) {
    var found = false;
    [38, 37, 40, 39].forEach(function(knownKey) {
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




