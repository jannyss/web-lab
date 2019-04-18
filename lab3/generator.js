var IMG_WIDTH = 350, IMG_HEIGHT = 250;
var CANVAS_WIDTH = 700, CANVAS_HEIGHT = 500;

var body = document.getElementsByTagName("body")[0];

var canvas = document.createElement("canvas");
canvas.id = "cnv";
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
body.appendChild(canvas);

var ctx = canvas.getContext("2d");

var par = document.createElement("p");
body.appendChild(par);

var generateBtn = document.createElement("button");
generateBtn.id = "generateBtn";
generateBtn.innerText = "Generate pic";
generateBtn.onclick = function () {
    generateCollage();
};
par.appendChild(generateBtn);
document.createElement("button");

var downloadHrefTag = document.createElement("a");
downloadHrefTag.id = "download";
downloadHrefTag.href = "";
downloadHrefTag.download = "image.jpg";
downloadHrefTag.onclick = function () {
    downloadPic(this);
};
par.appendChild(downloadHrefTag);

var downloadBtn = document.createElement("button");
downloadBtn.id = "downloadBtn";
downloadBtn.href = "";
downloadBtn.innerText = "Download pic";
downloadHrefTag.appendChild(downloadBtn);


var picsIsReady = false;
var textIsReady = false;
var preparedText = "";
var padding = 10;
var lineSpace = 20;
var lines;

function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 10000000) + 1);
}

function downloadPic(el) {
    el.href = canvas.toDataURL("image/jpg");
}

function generatePic() {
    var imgs = [];
    getImages(imgs);
}

function getImages(imgs) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#84ffeb';
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Waiting ... ", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);


    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://source.unsplash.com/collection/" + getRandomInt() + "/350x250";
    img.onerror = function () {
        console.log("failed to fetch an image");
        getImages(imgs);
    };
    img.onload = function () {
        imgs.push(img);
        if (imgs.length < 4) {
            getImages(imgs);
        } else {
            picIsReady = true;
            drawImages(imgs);
        }
    }.bind(this);
}

function drawImages(imgs) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 4; i++) {
        ctx.globalAlpha = 0.4;
        ctx.drawImage(imgs[i], i % 2 * IMG_WIDTH, Math.floor((i + 1) / 3) * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);
    }
    ctx.globalAlpha = 1;
    picsIsReady = true;
    drawText(lines);

}

function drawText(lines) {
    if (picsIsReady && textIsReady) {
        ctx.fillStyle = "#fefefe";
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2.5) + i * (padding + lineSpace));
        }
        // ctx.fillText(preparedText, CANVAS_WIDTH / 2.5, CANVAS_HEIGHT / 2);
    }
}

function getText() {
    var url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru';
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
        preparedText = request.responseText;
        prepareText();
    };
    request.send(null);
}


function prepareText() {
    var words = preparedText.split(" ");
    var currentLine = words[0];
    // ctx.fillStyle = "white";

    for (var i = 1; i < words.length; i++) {
        var width = ctx.measureText(currentLine + " " + words[i]).width;
        if (width < CANVAS_WIDTH - (2 * padding)) {
            currentLine += " " + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    textIsReady = true;
}

function generateCollage() {
    lines = [];
    picsIsReady = false;
    textIsReady = false;
    generatePic();
    getText();
}

generateCollage();
