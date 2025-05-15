// brightness mirror
// see notebook
// smaller capture video draw to canvas not pixel but shape or character
let myvideo;
let vScale; // global video scaling variable
//let greyscale = [0,32,64,96,128,160,192,224,255,255,255,255,255]
let greyscale = [0, 32, 64, 96, 128, 160, 192, 224, 255];
let myimg;
let cnv;

function preload() {
  myimg = loadImage("lanting2.jpg");
}

function setup() {
  let scaleX = windowWidth / myimg.width;
  let scaleY = windowHeight / myimg.height;
  let scaleFactor = min(scaleX, scaleY);

  let displayWidth = myimg.width * scaleFactor;
  let displayHeight = myimg.height * scaleFactor;

  myimg.resize(displayWidth, displayHeight);
  cnv = createCanvas(displayWidth, displayHeight); // larger canvas to draw to
  let cy = (windowHeight - displayHeight) / 2;
  cnv.position(0, cy);

  if (width < height) {
    vScale = floor(width / 30); // vScale tied to window width so it can work on phone and computer
    console.log("by width");
  } else {
    vScale = floor(height / 30);
    console.log("by height");
  }
  pixelDensity(1);
  myvideo = createCapture(VIDEO);
  myvideo.size(width / vScale, height / vScale);
  myvideo.hide();
  // video dom element , the source, will be smaller by vScale which is 40 by 30 to improve performance
  frameRate(15);
  //ellipseMode(CORNER);

  //tint(0);
}

function draw() {
  image(myimg, 0, 0);

  // load the myvideo to pixel array
  myvideo.loadPixels(); // gets a pixes arry for video capture

  // loop through the small video capture
  for (let y = 0; y < myvideo.height; y++) {
    // for each y there are some x's
    for (let x = 0; x < myvideo.width; x++) {
      //this mirrors the index for see note book
      let index = (myvideo.width - x - 1 + y * myvideo.width) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];

      let bright = floor((r + g + b) / 3); // the brightness or greyscale 0-255 is the average of the rgb

      // just two values for posterize
      if (bright > 128) {
        fill(0);
      } else {
        fill(255, 32);
      }
      noStroke();

      let rra = random(1, 4);
      ellipse(x * vScale, y * vScale, vScale * rra, vScale * rra);
    }
  }

  //console.log('bing');
  //noLoop();
}

function keyPressed() {
  // this will download the first 25 seconds of the animation!
  //if (key === 'g') {
  //  saveGif('reflection.gif', 15);
  // }
  if (key === "s") {
    saveCanvas("lanting", "jpg");
  }
}
