const canvas = document.getElementById("shooting-stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        dirX: Math.random() < 0.5 ? -1 : 1,
        dirY: Math.random() < 0.5 ? -1 : 1,
        speedX: Math.random() * .3,
        speedY: Math.random() * .3
    };
}

// Generate stars once
for (let i = 0; i < 50; i++) {
    stars.push(createStar());
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let star of stars) {
        star.x += star.speedX * star.dirX;
        star.y += star.speedY * star.dirY;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.opacity -= 0.0002;
        if (star.x > ctx.canvas.width || star.x < 0 ||
            star.y > ctx.canvas.height || star.y < 0 || star.opacity < 0.1
            ) {
                stars.push(createStar());

                stars = stars.filter(star =>
                    star.x >= 0 && star.x <= ctx.canvas.width &&
                    star.y >= 0 && star.y <= ctx.canvas.height && star.opacity >= 0.1
                );
            }
    }

    requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recreate stars for new screen size
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push(createStar());
    }
});
