/**
 * A jigsaw puzzle constructor
 *
 * @param col {Number} Number of columns
 * @param row {Number} Number of rows
 * @param imgUrl {String} Image Url for puzzle
 */
function Puzzle(col, row, imgUrl) {
    // properties
    this.Lx = col;
    this.Ly = row;
    this.image = new Image();

    this.image.src = `/img/${imgUrl}`;

    this.pieces = [];
    this.placedPieces = [];

    // Methods
    this.init = function () {
        // Init pieces array
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
                this.pieces.push(piece);
                puzzleContainer.innerHTML += `<div class="placeholder" data-id="${
                    j * Nx + i
                }"></div>`;
            }
        }
    };
}
