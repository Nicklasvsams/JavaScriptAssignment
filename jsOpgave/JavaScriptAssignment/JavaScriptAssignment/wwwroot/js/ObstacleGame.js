document.addEventListener("DOMContentLoaded", function (event) {
    var myGamePiece;
    var myScore;
    var myGameObstacles = [];
    var lastUpdatedFrame = 0;

    function startGame() {
        myGamePiece = new component(30, 30, "orange", 10, 120);
        myScore = new component("30px", "Consolas", "black", 280, 40, "text")
        myGameArea.start();
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.color = color;
        this.moveX = 0;
        this.moveY = 0;
        this.x = x;
        this.y = y;

        this.update = function () {
            ctx = myGameArea.context;
            if (this.type === "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            }
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        this.newPos = function () {
            this.x += this.moveX;
            this.y += this.moveY;
        }

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

    var moveUp = {
        start: function () {
            if (myGamePiece.moveY >= 0) {
                myGamePiece.moveY -= 3;
            };
        },

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

    var myGameArea = new getGameArea();

    function getGameArea() {
        this.canvas = document.createElement("canvas");
        this.start = function () {
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            var gameCanvas = document.getElementById("obstacleGame");
            gameCanvas.after(this.canvas);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        };
        this.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.stop = function () {
            var score = document.getElementById("score");

            if (myGameArea.frameNo > score.innerText) {
                score.innerText = myGameArea.frameNo;
            }

            clearInterval(this.interval);
        }
    }

    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;

        for (i = 0; i < myGameObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myGameObstacles[i])) {
                myGameArea.stop();
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;

        if (myGamePiece.x < 0) { myGamePiece.x = 0; }
        if (myGamePiece.x + myGamePiece.width > myGameArea.canvas.width) { myGamePiece.x = myGameArea.canvas.width - myGamePiece.width; }
        if (myGamePiece.y < 0) { myGamePiece.y = 0; }
        if (myGamePiece.y + myGamePiece.height > myGameArea.canvas.height) { myGamePiece.y = myGameArea.canvas.height - myGamePiece.height; }

        var interval = Math.floor(Math.random() * 100);

        if (interval < 40) interval = 40;
        if (myGameArea.frameNo == 1 || everyInterval(interval)) {
            x = myGameArea.canvas.width;
            minHeight = 50;
            maxHeight = 200;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 40;
            maxGap = 100;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myGameObstacles.push(new component(10, height, "gray", x, 0));
            myGameObstacles.push(new component(10, x - height, "gray", x, height + gap));
        }

        for (i = 0; i < myGameObstacles.length; i += 1) {
            console.log("Game obstacle no. " + i + " - " + myGameObstacles[i].x);
            myGameObstacles[i].x += -3;
            myGameObstacles[i].update();
            console.log(myGameObstacles[i].x);
        }

        myScore.text = "SCORE: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }

    function everyInterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0 && lastUpdatedFrame + 25 < myGameArea.frameNo) {
            lastUpdatedFrame = myGameArea.frameNo;
            return true;
        }
        return false;
    }

    startGame();

    document.getElementById("reset").onclick =
        function () {
            clearInterval(myGameArea.interval);
            myGameObstacles.length = 0;
            myGameArea.frameNo = 0;
            myGamePiece.x = 20;
            myGamePiece.y = 120;
            startGame();
        }
});