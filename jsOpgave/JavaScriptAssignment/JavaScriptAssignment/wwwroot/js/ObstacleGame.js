document.addEventListener("DOMContentLoaded", function (event) {
    // Global variables
    var myGamePiece;
    var myScore;
    var myGameObstacles = [];
    var lastUpdatedFrame = 0;
    var obstacleInterval = 150;
    var myGameArea = new getGameArea();

    // Initialise components and call start on myGameArea
    function startGame() {
        myGamePiece = new component(30, 30, "orange", 10, 120);
        myScore = new component("30px", "Consolas", "black", 280, 40, "text")
        myGameArea.start();
    }

    // Constructor for components - Playerpiece, obstacles and scoreboard
    function component(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.color = color;
        this.moveX = 0;
        this.moveY = 0;
        this.x = x;
        this.y = y;

        // Updates states of components
        this.update = function () {
            ctx = myGameArea.context;
            if (this.type === "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
                myScore.text = "SCORE: " + myGameArea.frameNo;
            }
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Sets new positon for components
        this.newPos = function () {
            this.x += this.moveX;
            this.y += this.moveY;
        }

        // Checks if the player game piece collides with an obstacle; ending the game
        this.crashWith = function (otherobj) {
            var myLeft = this.x;
            var myRight = this.x + (this.width);
            var myTop = this.y;
            var myBottom = this.y + (this.height);
            var otherLeft = otherobj.x;
            var otherRight = otherobj.x + (otherobj.width);
            var otherTop = otherobj.y;
            var otherBottom = otherobj.y + (otherobj.height);
            var crash = true;

            if ((myBottom < otherTop) ||
                (myTop > otherBottom) ||
                (myRight < otherLeft) ||
                (myLeft > otherRight)) {
                crash = false;
            }

            return crash;
        }
    }

    // Moves the player piece if the key is pressed
    var moveUp = {
        start: function () {
            if (myGamePiece.moveY >= 0) {
                myGamePiece.moveY -= 3;
            };
        },

        // Movement stops if key is released
        stop: function () {
            if (myGamePiece.moveY < 0) {
                myGamePiece.moveY = 0;
            }
        }
    }

    var moveDown = {
        start: function () {
            if (myGamePiece.moveY <= 0) {
                myGamePiece.moveY += 3;
            }
        },

        stop: function () {
            if (myGamePiece.moveY > 0) {
                myGamePiece.moveY = 0;
            }
        }
    }

    var moveLeft = {
        start: function () {
            if (myGamePiece.moveX >= 0) {
                myGamePiece.moveX -= 3;
            }
        },

        stop: function () {
            if (myGamePiece.moveX < 0) {
                myGamePiece.moveX = 0;
            }
        }
    }

    var moveRight = {
        start: function () {
            if (myGamePiece.moveX <= 0) {
                myGamePiece.moveX += 3;
            }
        },

        stop: function () {
            if (myGamePiece.moveX > 0) {
                myGamePiece.moveX = 0;
            }
        }
    }

    // Checks which key is pressed and calls the appropriate function depending on the keypress
    document.onkeydown =
        function (event) {
            var char = getCharacter(event || window.event);
            if (!char) return false;

            if (char) {
                switch (char) {
                    case "W":
                        moveUp.start();
                        break;
                    case "S":
                        moveDown.start();
                        break;
                    case "A":
                        moveLeft.start();
                        break;
                    case "D":
                        moveRight.start();
                        break;
                }
            }
        }

    // Checks which key is released and calls the appropriate function depending on the key released
    document.onkeyup =
        function (event) {
            var char = getCharacter(event || window.event);
            if (!char) return false;

            if (char) {
                switch (char) {
                    case "W":
                        moveUp.stop();
                        break;
                    case "S":
                        moveDown.stop();
                        break;
                    case "A":
                        moveLeft.stop();
                        break;
                    case "D":
                        moveRight.stop();
                        break;
                }
            }
        }

    // Makes sure the keypress is read correctly
    function getCharacter(event) {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode);
        }
        else if (event.which != 0) {
            return String.fromCharCode(event.which);
        }
        else {
            return null;
        }
    }

    // Sets up the game area
    function getGameArea() {
        // Creates the canvas element used for animations
        this.canvas = document.createElement("canvas");

        // Sets specific variables for the game area, appends it to the correct HTML element and sets an interval that runs every 20ms
        this.start = function () {
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            var gameCanvas = document.getElementById("obstacleGame");
            gameCanvas.appendChild(this.canvas);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        };

        // Clears the canvas area
        this.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };

        // Stops the game, updates the highscore and clears the interval
        this.stop = function () {
            var score = document.getElementById("score");

            if (myGameArea.frameNo > score.innerText) {
                score.innerText = myGameArea.frameNo;
            }

            clearInterval(this.interval);
        }
    }

    // Updates the various components of the game; player model, obstacles, scoreboard
    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;

        // Checks if there is obstacle collision
        for (i = 0; i < myGameObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myGameObstacles[i])) {
                myGameArea.stop();
                return;
            }
        }

        myGameArea.clear();
        myGameArea.frameNo += 1;

        // Makes sure the player model can't leave the game area
        if (myGamePiece.x < 0) { myGamePiece.x = 0; }
        if (myGamePiece.x + myGamePiece.width > myGameArea.canvas.width) { myGamePiece.x = myGameArea.canvas.width - myGamePiece.width; }
        if (myGamePiece.y < 0) { myGamePiece.y = 0; }
        if (myGamePiece.y + myGamePiece.height > myGameArea.canvas.height) { myGamePiece.y = myGameArea.canvas.height - myGamePiece.height; }

        // Creates an obstacle at various intervals, these obstacles spawn more frequently, the longer the game runs
        if (myGameArea.frameNo == 1 || everyInterval(obstacleInterval)) {
            x = myGameArea.canvas.width;
            minHeight = 50;
            maxHeight = 200;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 40;
            maxGap = 100;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myGameObstacles.push(new component(10, height, "gray", x, 0));
            myGameObstacles.push(new component(10, x - height, "gray", x, height + gap));
            if (obstacleInterval > 40) obstacleInterval -= 5;
        }

        // Updates the position of the obstacles
        for (i = 0; i < myGameObstacles.length; i += 1) {
            myGameObstacles[i].x += -3;
            myGameObstacles[i].update();
        }

        // Updates the score and player model components 
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }

    // Creates an interval for when to create new obstacles
    function everyInterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0 && lastUpdatedFrame + 25 < myGameArea.frameNo) {
            lastUpdatedFrame = myGameArea.frameNo;
            return true;
        }
        return false;
    }

    startGame();

    // Resets the specific variables needed for the game to restart, then starts the game
    document.getElementById("reset").onclick =
        function () {
            clearInterval(myGameArea.interval);
            lastUpdatedFrame = 0;
            obstacleInterval = 150;
            myGameObstacles.length = 0;
            myGameArea.frameNo = 0;
            myGamePiece.x = 20;
            myGamePiece.y = 120;
            startGame();
        }
});