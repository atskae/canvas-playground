/*
    Global Variables
    - "const" means a constant reference, not a constant value
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const defaultColor = "#83dec1"; // weird mint color
const currentColor = document.getElementById("currentColor");

/*
    Functions
*/
function savePrevCanvas(event) {
    // Redraw the image (otherwise disappears)
    // Reize the previous canvas to match the new size
    prevCanvas.width = canvas.width;
    prevCanvas.height = canvas.height;
    // Save the image in the current canvas
    prevCtx.drawImage(canvas, 0, 0);
    
    // Resize the canvas to the same size as
    // the browser window
    //canvas_size_multiplier = 0.75
    //canvas.height = Math.floor(window.innerHeight * canvas_size_multiplier);
    //canvas.width = Math.floor(window.innerWidth * canvas_size_multiplier);
    //console.log('Canvas resized to ' + canvas.width + ' by ' + canvas.height);

    // Redraw the image to resized canvas
    ctx.drawImage(prevCanvas, 0, 0);
}

function draw() {
    // Constant reference to a value, not a const value!
    const msg = document.getElementById("message");

    if (canvas.getContext) {
        msg.innerHTML = "Canvas is supported! :)";
        // Save current drawing
        savePrevCanvas();

        // Setup event listeners
        let allowDrawing = false;

        function turnOnDraw(event) {
            allowDrawing = true;
            //console.log('allowDrawing=' + allowDrawing)
            startDraw(event); // allows drawing dots
        }

        function turnOffDraw(event) {
            allowDrawing = false;
            //console.log('allowDrawing=' + allowDrawing)
        }

        function startDraw(event) {
            // Draw lines in the canvas!
            if(!allowDrawing) {
                return;
            }
            
            // Current position of mouse
            currX = event.clientX - canvas.offsetLeft;
            currY = event.clientY - canvas.offsetTop;
            
            prevX = currX - event.movementX;
            prevY = currY - event.movementY;
            //console.log('Position: ( ' + currX + ',' + currY + ')');
            //console.log('PrevPosition: ( ' + prevX + ',' + prevY + ')');
           
            // Set up line style
            ctx.lineCap = "round";
            ctx.lineWidth = 10;

            // Draw a line from previous position
            // to the current position
            ctx.beginPath();
            // Set starting point
            ctx.moveTo(prevX, prevY);
            // Set ending point
            ctx.lineTo(currX, currY);
            // Connect and draw line 
            ctx.closePath();
            ctx.stroke();
        }

        canvas.addEventListener('mousedown', turnOnDraw);
        canvas.addEventListener('mouseup', turnOffDraw);
        canvas.addEventListener('mousemove', startDraw);

    } else {
        msg = document.getElementById("message");
        msg.innerHTML = "Canvas is not supported :(";
    }
}

/*
    Utility functions
*/

function printSize(obj) {
    console.log(obj.id + ' size: ' + obj.width + ' by ' + obj.height);
}

/*
    Event Listeners
*/

// On browser resize, canvas will remove it contents.
// This function will keep the current image
window.addEventListener("resize", savePrevCanvas);

document.getElementById("pickRandColor").onclick = function() {
    console.log('Current color: ' + currentColor.style.fill);
    // Change color of the tiny circle up top
    // Maximum value in color hex format: 2^24-1 = 16777215 
    // Haven't dealt with this kind of math since 320 笑
    var newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    console.log(newColor);
    currentColor.style.fill = newColor;
    console.log('New color: ' + currentColor.style.fill);
    
    // Change the stroke color
    ctx.strokeStyle = newColor;
    console.log('ctx.strokeStyle: ' + ctx.strokeStyle);
}

/*
    On-load setup
*/

// Save a copy of the previous canvas contents.
// On resize, we re-load this canvas and save the newest copy.
var prevCanvas = document.createElement('canvas');
var prevCtx = prevCanvas.getContext('2d');

// Constrain app window so that the toolbox and canvas
// sizes can be relative to the app window size
const appWindow = document.getElementById("app");
appWindow.height = Math.floor(window.innerHeight* 0.75);
appWindow.width = Math.floor(window.innerWidth * 0.75);
//printSize(appWindow);

// Set toolbox size
const toolbox = document.getElementById("toolbox");
toolbox.height = Math.floor(appWindow.height);
toolbox.width = Math.floor(appWindow.width * 0.1);
//printSize(toolbox);

// Set canvas size
canvas.height = Math.floor(appWindow.height);
canvas.width = Math.floor(appWindow.width * 0.9);
//printSize(canvas);

// Setup currentColor
currentColor.setAttribute("style", "fill: " + defaultColor);
ctx.strokeStyle = defaultColor;
