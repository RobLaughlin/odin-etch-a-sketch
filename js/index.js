// How long it takes for a grid square to fade to white
const MS_UPDATE = 3000;

// How often to update the fade effect
const FPS = 60;
const FRAME_MS = (1 / FPS) * 1000;

let totalSquares = 16*16;
let currentHue = 0;

function changeBgColor(e, hue = currentHue, saturation = "100%", lightness="50%", msUpdate=MS_UPDATE, updateHue=true) {
    e.target.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;

    // We only want to update the hue on the first call.
    // When animation frames are requested, don't update the hue any further.
    if (updateHue) {
        currentHue += Math.round(360 / totalSquares);
        currentHue = currentHue % 360;
    }

    // Fade to white
    const newLightness = Math.ceil(50 + 50*((MS_UPDATE-msUpdate) / MS_UPDATE));
    const lightnessStr = newLightness.toString() + '%';
    if (msUpdate > 0) {
        requestAnimationFrame(() => {changeBgColor(e, hue, saturation, lightnessStr, msUpdate-FRAME_MS, false)});
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