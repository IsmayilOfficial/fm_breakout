const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20 
const boardWidth = 560
const boardHeight = 300
const userStart = [230 , 10 ] 
let currentPosition = userStart
const ballDiametr = 20

const ballStart = [270,48]
let ballCurrentPosition = ballStart
let timerId
let xDirection = -2
let yDirection = 2 
//block
class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis]
      this.bottomRight = [xAxis + blockWidth, yAxis]
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
      this.topLeft = [xAxis, yAxis + blockHeight]
    }
  }
//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw all my blocks
function addBlocks () {
   for (let i = 0; i < blocks.length; i++) {
        
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
        
    }
}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}
// move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':{
            if (currentPosition[0]>0) {
                currentPosition[0] -=10
                drawUser()
            }   
        }
        break;
        case 'ArrowRight':{
            if (currentPosition[0]<boardWidth-blockWidth) {
                    currentPosition[0] +=10
                    drawUser()
            }      
        }
        break;
    }
}
document.addEventListener('keydown',moveUser)
// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollissions()
}
timerId = setInterval(moveBall,30)

//check for collissions
function checkForCollissions() {
    //check for wall collissions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiametr) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiametr) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

   //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', moveUser)
  }
}

// change direction of ball

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }
