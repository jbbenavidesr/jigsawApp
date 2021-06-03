/**
 * Loads the image to use for the puzzle
 *
 * @param {String} imageSrc source of the image.
 *
 * @return {Image} image object.
 */
let loadImage = function (imageSrc) {
    let image = new Image();
    image.src = imageSrc;

    return image;
};
