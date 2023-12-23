
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []

let countKey = []
let level = 0

let started = false

// function that tracks key press and runs nextSequence function when started
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level "+level)
        nextSequence()
        started = true
    }
})

// this is an event listener in jquery which listens to the button click event
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

// this function checks if random chosen color matches user chosen color and goes to next level
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
        // else{
        // }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200); 
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()            
    }
}

// this function restarts the game
function startOver() {
    gamePattern = []
    level = 0
    started = false
}


// this function handles the selection of random color choice from list called buttonColors and add random color to new empty list called gamePattern
function nextSequence() {

    userClickedPattern = []

    level++
    $("#level-title").text("Level " + level)
    
    let randomNumber = Math.round(Math.random()*4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
 

}


// function to play sounds according to the color of button passed to parameter name
function playSound(name) {
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


// this is the function to add animation when your click a button
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}



