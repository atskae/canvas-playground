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

        // Apply effects to context
        ctx.lineWidth = 20;
        ctx.strokeRect(100, 100, 100, 100);
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
