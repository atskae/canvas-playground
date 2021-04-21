function resizeCanvas() {
    // Resize the canvas to the same size as
    // the browser window
    const canvas = document.getElementById("canvas");
    canvas.height = Math.floor(window.innerHeight * 0.75);
    canvas.width = Math.floor(window.innerWidth * 0.75);
    console.log('Canvas resized to ' + canvas.width + ' by ' + canvas.height);
}

function draw() {
    // Constant reference to a value, not a const value!
    const canvas = document.getElementById("canvas");
    const msg = document.getElementById("message");

    if (canvas.getContext) {
        msg.innerHTML = "Canvas is supported! :)";
        // Resize canvas to browser
        resizeCanvas();

        // Select the 2D context
        const ctx = canvas.getContext("2d");
        console.log(ctx);
        
        // Spacing relative to the parent viewport
        const canvasBounds = canvas.getBoundingClientRect();
        console.log('Canvas bounds');
        console.log(canvasBounds);

        // Setup event listeners
        let allowDrawing = false;

        function turnOnDraw(event) {
            allowDrawing = true;
            console.log('allowDrawing=' + allowDrawing)
        }

        function turnOffDraw(event) {
            allowDrawing = false;
            console.log('allowDrawing=' + allowDrawing)
        }

        function startDraw(event) {
            // Draw lines in the canvas!
            if(!allowDrawing) {
                return;
            }
            
            // Current position of mouse
            currX = event.screenX - canvasBounds.left;
            currY = event.screenY - canvasBounds.top;
            prevX = currX - event.movementX;
            prevY = currY - event.movementY;
            console.log('Position: ( ' + currX + ',' + currY + ')');
            console.log('PrevPosition: ( ' + prevX + ',' + prevY + ')');
            
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
    Event Listeners
*/

// On browser resize, resize the canvas
window.addEventListener("resize", resizeCanvas);
