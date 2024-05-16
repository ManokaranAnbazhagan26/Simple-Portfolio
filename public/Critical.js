// critical.js
let colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF"];
let currentIndex = 0;

function changeColor() {
    let body = document.body;
    body.style.backgroundColor = colors[currentIndex];
    body.style.color = colors[(currentIndex + 2) % colors.length]; // Change text color for contrast

    // Create heading if it doesn't exist
    let heading = document.getElementById("heading");
    if (!heading) {
        heading = document.createElement("h1");
        heading.id = "heading";
        heading.textContent = "Welcome to My Portfolio!";
        heading.style.position = "absolute";
        heading.style.top = "50%";
        heading.style.left = "50%";
        heading.style.transform = "translate(-50%, -50%)";
        heading.style.textAlign = "center";
        body.appendChild(heading);
    }

    // Create subheading if it doesn't exist
    let subheading = document.getElementById("subheading");
    if (!subheading) {
        subheading = document.createElement("h2");
        subheading.id = "subheading";
        subheading.textContent = "Catch the Colors!";
        subheading.style.position = "absolute";
        subheading.style.top = "60%";
        subheading.style.left = "50%";
        subheading.style.transform = "translate(-50%, -50%)";
        subheading.style.textAlign = "center";
        body.appendChild(subheading);
    }

    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 2000); // Change color every 2 seconds
