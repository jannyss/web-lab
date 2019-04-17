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

var downloadBtn = document.createElement("button");
downloadBtn.id = "downloadBtn";
downloadBtn.download = "image.jpg";
downloadBtn.href = "";
downloadBtn.innerText = "Download pic";
downloadBtn.onclick = function () {
    downloadPic();
};
par.appendChild(downloadBtn);


var picsIsReady = false;
var textIsReady = false;
var preparedText = "";

function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 10000000) + 1);
}

function downloadPic() {
    canvas.toDataURL("image/jpg");
}


function generatePic() {
    var imgs = [];
    getImages(imgs);
}

function getImages(imgs) {

    ctx.fillStyle = '#88b7b2';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#000000';
    ctx.font = "30px Arial";
    ctx.fillText("Waiting ... ", CANVAS_WIDTH / 2.5, CANVAS_HEIGHT / 2);


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

    for (var i = 0; i < 4; i++) {
        // alert(imgs[i].src);
        // var src = imgs[i].src;
        // imgs[i].src = src + "?random=" + getRandomInt();
        ctx.drawImage(imgs[i], i % 2 * IMG_WIDTH, Math.floor((i + 1) / 3) * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);
    }
    picsIsReady = true;
    drawText();

}

function drawText() {
    if (picsIsReady && textIsReady) {
        ctx.fillStyle = "rgb(254,254,254)";
        ctx.fillText(preparedText, CANVAS_WIDTH / 2.5, CANVAS_HEIGHT / 2);
    }
}

function getText() {
    var url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru';
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onload = function () {
        textIsReady = true;
        preparedText = request.responseText;
    };
    request.send(null);

}

function generateCollage() {
    picsIsReady = false;
    textIsReady = false;
    generatePic();
    getText();
}

generateCollage();
