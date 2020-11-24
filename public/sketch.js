let socket = io();


let duck; // img of a duck
let col; //color chosen to draw





socket.on("connect", newConnection);

function newConnection() {
  console.log("your id:", socket.id);
}






function preload() {
  duck = loadImage("/Assets/images/duck.png")
}





function setup() {

  socket.on('mouseBroadcast', otherMouse)

  createCanvas(windowWidth, windowHeight)
  background(126, 168, 190)


  //image
  const duck_width = width / 4;
  imageMode(CENTER);
  image(duck, width / 2, height / 2, duck_width, duck.height * duck_width / duck.width);
}






function draw() {


//drawing with selected color + message broadcast
  if (mouseIsPressed) {
    stroke(col);
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);

    let message = {
      x: mouseX,
      y: mouseY,
      pmx: pmouseX,
      pmy: pmouseY,
      color: col
    }
    socket.emit("mouse", message);
  }


  //rgb color swatches
  push()

  noStroke();
  fill(255, 155, 66);
  rect(3 * width / 16, height / 8, height / 8, height / 8);

  fill(247, 160, 114);
  rect(3 * width / 16, height / 4, height / 8, height / 8);

  fill(237, 222, 164);
  rect(3 * width / 16, 3 * height / 8, height / 8, height / 8);

  fill(217, 229, 214);
  rect(3 * width / 16, height / 2, height / 8, height / 8);

  fill(15, 163, 177);
  rect(3 * width / 16, 5 * height / 8, height / 8, height / 8);

  fill(82, 63, 56);
  rect(3 * width / 16, 3 * height / 4, height / 8, height / 8);

  pop()


}
//function to get color from the swatches, mousePressed is limited to the area in which the swatches are
function mousePressed() {
  if (mouseX > 3 * width / 16 && mouseX < 3 * width / 16 + height / 8 && mouseY > height / 8 && mouseY < 7 * height / 8) {
    p_col = col;
    col = get(mouseX, mouseY);
  }
}


function otherMouse(data) {
  stroke(data.color);
  strokeWeight(5);
  line(data.x, data.y, data.pmx, data.pmy);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
