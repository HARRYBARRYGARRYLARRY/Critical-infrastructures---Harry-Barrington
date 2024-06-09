// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";  
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/mGILo7boU/';
let bumImg;
let policeImg;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  bumImg = loadImage("bum.png");
  policeImg = loadImage("police.png");
  bgImg = loadImage("background.png");
  penisballsImg = loadImage("penisballs.png");
  toiletImg = loadImage("toilet.png")
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0, width, 480);

  // STEP 4: Show image + current label if confidence is over a set value
  if (label == "background" && confidence > 0.9) {
    image(bgImg, 0, 0, width, height);
  } else if (label == "lilly" && confidence > 0.9) {
    image(policeImg, 0, 0, width, height);
  }  else if (label == "dish" && confidence > 0.9) {
    image(bumImg, 0, 0, width, height);
  }  else if (label == "meat&veg" && confidence > 0.9) {
    image(penisballsImg, 0, 0, width, height);
  }  else if (label == "cottage" && confidence > 0.9) {
    image(toiletImg, 0, 0, width, height);

  }
  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}
