const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = Math.random() * 30 + 50;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.96;
        this.life--;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
const particles = [];
function createFireworks(x, y) {
    const colors = ["#ff5733", "#33ff57", "#5733ff", "#f4ff33", "#ff33e3"];
    for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        if (particle.life <= 0 || particle.size <= 0.1) {
            particles.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });
    requestAnimationFrame(animate);
}
canvas.addEventListener("mouseclick", (e) => {
    createFireworks(e.clientX, e.clientY);
});
animate();
