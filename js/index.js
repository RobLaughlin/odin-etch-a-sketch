let totalSquares = 16*16;
let currentHue = 0;

function changeBgColor(e, hue = currentHue, saturation = "100%", lightness="50%", msUpdate=3000, updateHue=true) {
    e.target.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;

    // We only want to update the hue on the first call.
    // When animation frames are requested, don't update the hue any further.
    if (updateHue) {
        currentHue += Math.round(360 / totalSquares);
        currentHue = currentHue % 360;
    }


    // Fade to white
    const newLightness = Math.ceil(50 + 50*((3000-msUpdate) / 3000));
    const lightnessStr = newLightness.toString() + '%';
    const frameMs = (1/60*1000) // 60 FPS
    if (msUpdate > 0) {
        requestAnimationFrame(() => {changeBgColor(e, hue, saturation, lightnessStr, msUpdate-frameMs, false)});
    }
}

function resizeGrid() {
    let newGridSize = "";
    while (
        isNaN(newGridSize) 
        || !Number.isInteger(Number(newGridSize)) 
        || Number(newGridSize) < 1
        || Number(newGridSize) > 100
    ) {
        newGridSize = prompt("Choose an integer N such that 1 <= N <= 100 to create an NxN grid.")
    }
    
    const gridSize = Number(newGridSize)**2;

    let gridContainer = document.getElementById("GridContainer");
    let gridSquares = [];
    for (let i = 0; i < gridSize; i++) {
        let square = document.createElement("div");
        square.classList.add("gridSquare");
        square.addEventListener("mouseover", changeBgColor);
        square.style.width = ((1 / Math.sqrt(gridSize)) * 100).toString() + '%';
        gridSquares.push(square);
    }
    
    gridContainer.replaceChildren(...gridSquares);
    currentHue = 0;
}

function injectGrid(numSquares) {
    let gridContainer = document.getElementById("GridContainer");
    for (let i = 0; i < numSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("gridSquare");
        square.addEventListener("mouseover", changeBgColor);
        square.style.width = ((1 / Math.sqrt(numSquares)) * 100).toString() + '%';
        gridContainer.appendChild(square);
    }
}

injectGrid(totalSquares);