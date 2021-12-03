// List of colors
const colors = ['#FFFFFF','#FF0D0D','#FFFC19','#FF00FF','#19FF5A','#7B0DFF','#0D80FF','#00FFFF','#FFAC19'];
var ballColor = colors[0];
var starColor = colors[0]; 
var colorIndex = 0;
var ballcolorIndex = 0;

// List of stars
let stars = []; // array to hold star objects

// Variables for the ball
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var diameter = 50;
var xBallChange = 5;
var yBallChange = 5;

// Variables for the paddle
var xPaddle;
var yPaddle;
var paddleWidth = 100;
var paddleHeight = 25;

var started = false;
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Create a random number of stars each frame
  for (let i = 0; i < 1; i++) {
    stars.push(new star()); // append star object
  }

  // Loop through stars with a for..of loop
  for (let beam of stars) {
    fill(starColor);
    beam.update(); // update star position
    beam.display(); // draw star
  }
  
  // Ball bounces off walls
	xBall += xBallChange;
	yBall += yBallChange;
	if (xBall < diameter/2 || 
      xBall > windowWidth - 0.5*diameter) {
		xBallChange *= -1;
  }
	if (yBall < diameter/2 || 
      yBall > windowHeight - diameter) {
    yBallChange *= -1;
	}
  
  // Detect collision with paddle
  if ((xBall > xPaddle &&
      xBall < xPaddle + paddleWidth) &&
      (yBall + (diameter/2) >= yPaddle)) {
    yBall = yBall - 0.5*paddleHeight;
    xBallChange *= -1;
    yBallChange *= -1;
    score++;
    ballcolorIndex = ballcolorIndex + 1;
    if (ballcolorIndex >= (colors.length - 1)) {
      ballcolorIndex = 0;
    }
    var randomColor = colors[ballcolorIndex];
    ballColor = randomColor;
    starColor = randomColor;
    ballSpeed();
  }
  
  // collision with paddle changes interface color
  if ((Math.abs(xBallChange) >= 10) && (Math.abs(yBallChange) >= 10)) {
    ballColor = colors[colorIndex];
    colorIndex = colorIndex + 1;
    if (colorIndex >= (colors.length - 1)) {
      colorIndex = 0;
    }
}

  // Draw ball
	fill(ballColor);
	noStroke();
	ellipse(xBall, yBall, diameter, diameter);
  
  // Set paddle location
  if (!started) {
    xPaddle = windowWidth / 2;
    yPaddle = windowHeight - 50;
    started = true;
  }

  // Draw paddle
  fill(starColor);
  noStroke();
  rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
  
  // Draw score
  fill(starColor);
  textSize(20);
  textFont('PressStart2P');
	text("Score:" + score, 10, 30);

  // Draw portfolio button
  fill(starColor);
  textSize(20);
  textFont('PressStart2P');
  text("Portfolio", (windowWidth - 188), 30);

}

function mouseClicked() {
  if (isMouseInsideText('Portfolio', (windowWidth - 188), 30)) {
    window.open('/portfolio.html', '_blank');
  }
}

function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();

  return mouseX > messageX && mouseX < messageX + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;
}

// Increase ball speed
function ballSpeed () {
  xBallChange = 1.1*xBallChange;
  yBallChange = 1.1*yBallChange;
  if ((Math.abs(xBallChange) >= 13) && (Math.abs(yBallChange) >= 13)) {
    xBallChange = Math.sign(xBallChange) * 7.5;
    yBallChange = Math.sign(yBallChange) * 7.5;
  }
  console.log(xBallChange);
}

// High speed color animation
function highSpeed () {
  if ((Math.abs(xBallChange) >= 7) && (Math.abs(yBallChange) >= 7)) {
  for (let i = 0; i < 1; i++) {
    ballColor = colors[i];
  }
  }
}

// Move paddle
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xPaddle -= 50;
  } else if (keyCode === RIGHT_ARROW) {
    xPaddle += 50;
  }
}

// Star class
function star() {
  // Initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(.1, 2);

  // Radius of star spiral so the stars are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function() {
    // X position follows a circle
    let angle = this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size stars fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // Delete star if past end of screen
    if (this.posY > height) {
      let index = stars.indexOf(this);
      stars.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}