var TILE_SIZE = 50; 
var maps = {}; 
var currentMapKey = "Town";
var currentMap = null; 
var WORLD_WIDTH = 0;
var WORLD_HEIGHT = 0;
var camera = { x: 0, y: 0, width: 800, height: 600 };
var keys = { w: false, a: false, s: false, d: false, arrowup: false, arrowleft: false, arrowdown: false, arrowright: false };
