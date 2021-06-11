// Get elements from DOM
let settingsForm = document.querySelector("[data-settings]");
let puzzleContainer = document.querySelector("[data-puzzle='solved']");
let piecesContainer = document.querySelector("[data-puzzle='pieces']");
let message = document.querySelector(".message");

// Variables
let Nx, Ny, pieceWidth, pieceHeight, imageFile;
let placedPieces = [];
let puzzleImage = new Image();

// Functions
let initPieces = function () {
    let pieces = [];
    for (let j = 0; j < Ny; j++) {
        for (let i = 0; i < Nx; i++) {
            // Create the piece and add to an array
            let piece = document.createElement("div");
            piece.classList.add("piece");
            piece.id = j * Nx + i;
            piece.style.width = pieceWidth + "px";
            piece.style.height = pieceHeight + "px";
            piece.style.backgroundImage = `url("${puzzleImage.src}")`;
            piece.style.backgroundPosition = `-${i * pieceWidth}px -${
                j * pieceHeight
            }px`;
            piece.draggable = "true";
            pieces.push(piece);
            puzzleContainer.innerHTML += `<div class="placeholder" data-id="${
                j * Nx + i
            }" style="width: ${pieceWidth}px; height: ${pieceHeight}px;"></div>`;
        }
    }

    while (pieces.length) {
        const index = Math.floor(Math.random() * pieces.length);

        piecesContainer.appendChild(...pieces.splice(index, 1));
    }
};

let submitHandler = function (event) {
    event.preventDefault();
    Nx = parseInt(event.target.elements.col.value);
    Ny = parseInt(event.target.elements.row.value);
    imageFile = event.target.elements["image-select"].value;
    puzzleImage.src = `/img/${imageFile}`;

    pieceWidth = puzzleImage.width / Nx;
    pieceHeight = puzzleImage.height / Ny;

    puzzleContainer.style.width = puzzleImage.width + "px";

    document.body.classList.remove("intro");
    initPieces();
};

// Add Event Listeners
settingsForm.addEventListener("submit", submitHandler);

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
            fetch("/.netlify/functions/collectData", {
                method: "POST",
                body: JSON.stringify({
                    Nx: Nx,
                    Ny: Ny,
                    placedOrder: placedPieces,
                    image: imageFile,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (error) {
                    console.warn(error);
                });
        }
    }
});
