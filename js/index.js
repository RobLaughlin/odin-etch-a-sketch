const NUM_SQUARES = 16*16;

function injectGrid(numSquares) {
    let gridContainer = document.getElementById("GridContainer");
    for (let i = 0; i < numSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("gridSquare");

        gridContainer.appendChild(square);
    }
}

injectGrid(NUM_SQUARES);