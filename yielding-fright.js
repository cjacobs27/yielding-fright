const words = "We set sail on this new sea because there is new knowledge to be gained, and new rights to be won, and they must be won and used for the progress of all people. For space science, like nuclear science and all technology, has no conscience of its own. Whether it will become a force for good or ill depends on man, and only if the United States occupies a position of pre-eminence can we help decide whether this new ocean will be a sea of peace or a new terrifying theater of war. I do not say that we should or will go unprotected against the hostile misuse of space any more than we go unprotected against the hostile use of land or sea, but I do say that space can be explored and mastered without feeding the fires of war, without repeating the mistakes that man has made in extending his writ around this globe of ours.There is no strife, no prejudice, no national conflict in outer space as yet. Its hazards are hostile to us all. Its conquest deserves the best of all mankind, and its opportunity for peaceful cooperation may never come again. But why, some say, the Moon? Why choose this as our goal? And they may well ask, why climb the highest mountain? Why, thirty five years ago, fly the Atlantic? Why does Rice play Texas? We choose to go to the Moon! We choose to go to the Moon...We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard; because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one we intend to win, and the others, too.";

window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

const array = words.toUpperCase().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
let written = [];
let wordSize = 12;
let circleColour = 0;

function setup() {
  createCanvas(600, 600).mousePressed(writeWord);
}

function draw() {
  background(220);
  for (let w of written) {
    smooth();
    noFill();
    stroke(circleColour);
    circle(mouseX, mouseY, wordSize);
    textSize(w.size);
    noStroke();
    fill(w.colour);
    w.display();
  }
}

function mouseClicked() {
  changeColourAndWrite();
}

function mouseDragged() {
  changeColourAndWrite();
}

function doubleClicked() {
  console.log('hey gurl');
}

function changeColourAndWrite() {
  let clickType = (mouseButton === LEFT) ? true : false;
  circleColour = clickType ? 0 : 255;
  writeWord(clickType);
}

function mouseWheel(event) {
  let upOrDown = (event.delta >= 1);
  
  if (upOrDown) {
    wordSize += 2;
  } else if (!upOrDown) {
    wordSize -= 2;  
  }
  
  if (wordSize > 72 || wordSize < 2) {
    wordSize = 12;
  }
}

function findWord() {
  let index = Math.floor(Math.random() * array.length);

  return array[index];
}

function writeWord(clickType) {
  const w = new Word();
  let str = findWord();
  let colour = !clickType ? 255 : 0;
  // Hold space to 'erase' (write in background colour)
  if (keyIsDown(32)) {
    colour = 220;
    circleColour = 220;
  }
  written.push(w.setXYAndString(mouseX-20, 
                                mouseY, 
                                str, 
                                wordSize,
                                colour));
  redraw();
}

class Word {
 // x and y values for position at which the word is drawn
  constructor(x, y, str, wordSize, colour) { this.setXYAndString(x, y, wordSize, colour); }
 
  setXYAndString(x, y, str, wordSize, colour) {
    this.x = x, this.y = y, this.str = str, this.size = wordSize, this.colour = colour;
    return this;
  }
 
  display() { text(this.str, this.x, this.y); }
}
