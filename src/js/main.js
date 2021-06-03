let puzzleContainer = document.querySelector("#puzzle");
let piecesContainer = document.querySelector("#pieces");
let message = document.querySelector("#message");

let Nx = 4;
let Ny = 4;
let pieceWidth = 96;
let pieceHeight = 128;
let pieces = [];
let placedPieces = [];

for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nx; i++) {
        // Create the piece and add to an array
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.id = j * Nx + i;
        piece.style.backgroundPosition = `-${i * pieceWidth}px -${
            j * pieceHeight
        }px`;
        piece.draggable = "true";
        pieces.push(piece);
        puzzleContainer.innerHTML += `<div class="placeholder" data-id="${
            j * Nx + i
        }"></div>`;
    }
}

while (pieces.length) {
    const index = Math.floor(Math.random() * pieces.length);

    piecesContainer.appendChild(...pieces.splice(index, 1));
}

piecesContainer.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("id", event.target.id);
});

puzzleContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
    event.target.classList.add("hover");
});

puzzleContainer.addEventListener("dragleave", function (event) {
    event.target.classList.remove("hover");
});

puzzleContainer.addEventListener("drop", function (event) {
    event.target.classList.remove("hover");

    let id = event.dataTransfer.getData("id");

    if (event.target.dataset.id === id) {
        event.target.appendChild(document.getElementById(id));
        placedPieces.push(id);
        if (placedPieces.length === Nx * Ny) {
            document.body.classList.add("ganaste");
            console.log(placedPieces);
        }
    }
});
