let currentNode = 1;

const prev = document.getElementById("prev");
const next = document.getElementById("next");


function navigate(direction) {
    const currentElement = document.getElementById(currentNode);
    if (direction === "next" && currentElement.nextElementSibling) {
        let nextConnection = currentElement.nextElementSibling;
        nextConnection.classList.add("active");
        let nextNode = currentElement.nextElementSibling.nextElementSibling;
        nextNode.classList.add("active");
        currentNode++;
    }

    else if (direction === " prev" && currentElement.previousElementSibling) {
        currentElement.classList.remove("active");
        currentElement.previousElementSibling.classList.remove("active");
        currentNode--;
    }

    currentNode === 5 ? (next.disabled = true) : (next.disabled = false);
    currentNode === 1 ? (prev.disabled = true) : (prev.disabled = false);
}


next.addEventListener("click", () => {
    navigate("next");
});

prev.addEventListener("click", () => {
    navigate("prev");
})