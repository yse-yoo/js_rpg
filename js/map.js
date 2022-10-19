var mapData = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var mapChipIds = [
    [1, 1, 11, 11, 11, 12, 12, 11, 11, 11, 11, 11],
    [11, 1, 11, 11, 11, 12, 12, 11, 1, 1, 13, 11],
    [11, 1, 1, 1, 11, 13, 11, 1, 1, 1, 1, 11],
    [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
    [11, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11],
    [11, 63, 64, 1, 11, 1, 1, 1, 1, 40, 41, 11],
    [11, 73, 74, 11, 11, 11, 1, 1, 1, 50, 51, 11],
    [11, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
];

var mapChips = {}
function createMapChips() {
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 9; x++) {
            var id = y * 10 + x;
            mapChips[id] = { x: x, y: y }
        }
    }
}

function loadMap() {
    var canvas = document.getElementById('map');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;

    var map_width = window.innerWidth;
    var map_height = window.innerHeight;
    canvas.width = map_width;
    canvas.height = map_height;

    var ctx = canvas.getContext('2d');

    //TODO loadImage
    var map_image = new Image();
    map_image.src = 'images/mapchip/pipo-map001.png';
    map_image.onload = function () {
        for (var row_index in mapData) {
            var row = mapData[row_index]
            for (var col_index in row) {
                var x = col_index * CELL_SIZE;
                var y = row_index * CELL_SIZE;

                //map chips フィールドベース
                drawBase(map_image, x, y);

                //map chip 画像
                var map_chip_id = mapChipIds[row_index][col_index]
                var map_chip = mapChips[map_chip_id]
                var map_chip_x = map_chip.x * CELL_SIZE
                var map_chip_y = map_chip.y * CELL_SIZE
                ctx.drawImage(map_image,
                    map_chip_x, map_chip_y, CELL_SIZE, CELL_SIZE,
                    x, y, CELL_SIZE, CELL_SIZE
                );
            }
        }
    }

    function drawBase(map_image, x, y) {
        ctx.drawImage(map_image,
            0, 0, CELL_SIZE, CELL_SIZE,
            x, y, CELL_SIZE, CELL_SIZE
        );
    }
}

function initMap() {
    createMapChips();
    loadMap();
}
