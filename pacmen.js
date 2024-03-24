var pos = 0;
const pacArray = [
    ["./images/PacMan1.png", "./images/PacMan2.png"],
    ["./images/PacMan3.png", "./images/PacMan4.png"]
];
const pacBox = {
    upperLimit: 100,
    lowerLimit: 500,
    leftLimit: 200,
    rightLimit: 800   
}
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale, purpose) {
    if (purpose==="velocity") {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    if (purpose==="position") {
        return {
            x: (Math.random() * scale) + 200,
            y: (Math.random() * scale) + 100
        }
    }
    
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10, "velocity"); // {x:?, y:?}
    let position = setToRandom(200, "position");
    let focus = 0;
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = "./images/PacMan1.png";
    newimg.width = 100;
    //
    // To set position  
    newimg.style.left=position.x + 'px';
    newimg.style.top=position.y + 'px';

    // To add new Child image to game
    game.appendChild(newimg);
    

    // return details in an object
    return {
        position,
        velocity,
        newimg,
        focus,
    };
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        item.focus = (item.focus + 1) % 2;
        // Setting direction based on whether or not 'x' velocity is positive or negative
        // Positive velocity means pacman is moving from left to right... direction=0
        // Negagive velocity means pacman is moving from right to left... direction=1
        if (item.velocity.x<0) {direction=1;}
        else {direction=0;}

        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

        item.newimg.src = pacArray[direction][item.focus];                
    });
    setTimeout(update, 20);
}

function checkCollisions(item) {
    // To detect collision with all walls and make pacman bounce
    console.log(`left side is ${item.position.x+item.velocity.x+item.newimg.width}`);
    if(item.position.x+item.velocity.x+item.newimg.width>pacBox.rightLimit || item.position.x+item.velocity.x<pacBox.leftLimit) {
        item.velocity.x = -item.velocity.x;
    }
     
    if(item.position.y+item.velocity.y+item.newimg.height>pacBox.lowerLimit || item.position.y+item.velocity.y<=pacBox.upperLimit) {
        item.velocity.y = -item.velocity.y;
    }   
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}
