const CELL_SIZE = 32;
const movePixel = 2;
const animationInterval = 60;

var character = {}
var key = { up: false, down: false, right: false, left: false };

var moveTimer;
function move() {
    //移動中は処理しない
    if (character.isMoving) return;

    //キVャラクター移動量初期化
    character.move = CELL_SIZE;
    moveTimer = setInterval(moveAnimation, animationInterval);
}

function posX(x) {
    return Math.floor(x / CELL_SIZE);
}

function posY(y) {
    return Math.floor(y / CELL_SIZE);
}

function mapCell(x, y) {
    return mapData[y][x];
}

function isMove() {
    var x = character.posX;
    var y = character.posY;
    if (key.left) {
        x = posX(character.x - CELL_SIZE);
    } else if (key.up) {
        y = posY(character.y - CELL_SIZE)
    } else if (key.right) {
        x = posX(character.x + CELL_SIZE);
    } else if (key.down) {
        y = posY(character.y + CELL_SIZE)
    }
    var data = mapCell(x, y);
    // console.log('mapCell', x, y, data);
    return (data === 0)
}

/**
 * 
 * @returns 移動アニメーション
 */
function moveAnimation() {
    // console.log(character.move);
    //移動中判別
    character.isMoving = (character.move > 0);
    //移動が終わったら移動しない
    if (!character.isMoving) {
        // console.log(character.x, character.y);
        // console.log(character.posX, character.posY);
        clearInterval(moveTimer);
        return;
    }
    //移動量を減らす
    character.move -= character.step;

    //矢印キーによる移動座標変更
    if (key.left) {
        character.x -= character.step;
    } else if (key.up) {
        character.y -= character.step;
    } else if (key.right) {
        character.x += character.step;
    } else if (key.down) {
        character.y += character.step;
    }

    //移動範囲判別
    if (character.x < 0) character.x = 0;
    if (character.y < 0) character.y = 0;

    character.posX = posX(character.x);
    character.posY = posY(character.y);

    //移動
    characterElement.style.left = character.x + "px";
    characterElement.style.top = character.y + "px";
    // console.log(characterElement, character.x, character.y, character.step);
}

function keydownEvent(event) {
    if (character.isMoving) return;

    var key_code = event.keyCode;
    key.left = (key_code === 37);
    key.up = (key_code === 38);
    key.right = (key_code === 39);
    key.down = (key_code === 40);

    if (isMove()) move();
}

var characterElement = document.getElementById('character');
function initCharacter() {
    character.x = 0;
    character.y = 0;
    character.step = 4;
    character.posX = 0;
    character.posY = 0;
    character.move = 0;
    character.isMoving = false;

    characterElement.style.position = 'absolute';
    characterElement.style.left = '0px';
    characterElement.style.top = '0px';

    document.addEventListener('keydown', keydownEvent);
}