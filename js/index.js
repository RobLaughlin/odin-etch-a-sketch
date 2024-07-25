const NUM_SQUARES = 16*16;

function changeBgColor(e) {
    e.target.classList.add("hovered");
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

injectGrid(NUM_SQUARES);