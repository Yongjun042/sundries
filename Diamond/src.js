let degree = 0;

function updateDegree() {
    let space = document.querySelector('.space');
    space.style.transform = "rotateY(" + degree + "deg)";
}

let rotateRange = document.querySelector('.rotate-range');
rotateRange.onchange = rotateRange.oninput = function() {
    degree = rotateRange.value;
    updateDegree();
};
rotateRange.onchange();