let canvas0 = document.getElementById("can0");
let tm = canvas0.getContext("2d");
let canvas1 = document.getElementById("can1");
let c = canvas1.getContext("2d");

canvas0.width = 1152;
canvas0.height = 768;
canvas1.width = 1152;
canvas1.height = 768;

var player, loop, tileMap, mouvement;

player = {
    x: 512,
    y: 6,
    width: 75,
    height: 75,
    colour: 'red',
    velocity_x: 0,
    velocity_y: 0,
    jump: true
}

tileMap = {
    image: new Image(),
    tile_size: 96,
    map: [
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 0, 0, 0, 0, 0, 6, 6, 6, 6
    ], 
    collisionMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,

    ],
    tile_image_size: 16,
    collums: 12,
    rows: 8
}

mouvement = {
    left: false,
    up: false,
    right: false
}

tileMap.image.onload = function() {


    for (let i = 0; i < tileMap.map.length; i++) {
        var source_x = (tileMap.map[i] % tileMap.collums) * 16;
        var source_y = Math.floor(tileMap.map[i] / tileMap.collums) * 16;
        var destination_x = (i % tileMap.collums) * 96;
        var destination_y = Math.floor(i / tileMap.collums) * 96;
        tm.drawImage(tileMap.image, source_x, source_y, 16, 16, destination_x, destination_y, 96, 96);
    }
}

tileMap.image.src = 'Tile Map.png';
tm.imageSmoothingEnabled = false;

loop = function() {

let left = Math.floor(player.x / tileMap.tile_size);
let right = Math.floor((player.x + player.width) / tileMap.tile_size);
let top = Math.floor(player.y / tileMap.tile_size);
let bottom =  Math.floor((player.y + player.height) / tileMap.tile_size);


let topLeft = top * tileMap.collums + left;
let topRight = top * tileMap.collums + right;
let bottomLeft = bottom * tileMap.collums + left;
let bottomRight = bottom * tileMap.collums + right;


if (!tileMap.collisionMap[topLeft] == 0 || !tileMap.collisionMap[topRight] == 0 || !tileMap.collisionMap[bottomLeft] == 0 || !tileMap.collisionMap[bottomRight] == 0) {
document.getElementById("text").innerHTML = "Collision has been detected";
} else {
document.getElementById("text").innerHTML = " No collision has been detected";

}
if (mouvement.left) {
    player.velocity_x -= 1.5;
}
if (mouvement.up && !player.jump) {
    player.velocity_y -= 40;
    player.jump = true;
}
if (mouvement.right) {
    player.velocity_x += 1.5;

}


player.x += player.velocity_x;
player.y += player.velocity_y;
player.velocity_x *= 0.9;
player.velocity_y *= 0.9;
player.y += 12;

if (player.y > 768 - player.height) {
    player.jump = false;
    player.y = 768 - player.height;
}

c.clearRect(0,0,1152,768);
c.fillStyle = 'red';
c.fillRect(player.x, player.y, player.width, player.height);

window.requestAnimationFrame(loop);
}

function key(e) {
    toggle = (e.type == "keydown")?true:false;

    switch(e.keyCode) {
        case 37: mouvement.left = toggle;
        break;
        case 38: mouvement.up = toggle;
        break;
        case 39: mouvement.right = toggle;
        break;

    }
}

window.addEventListener("keyup", key);
window.addEventListener("keydown", key);
window.requestAnimationFrame(loop);