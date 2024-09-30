import "./SASS/main.scss"

// Checker for if an element is in the viewport.
const isInViewPort = (element, percentage = 0) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const elementTopInView = rect.top <= windowHeight && rect.top >= 0;
    const elementBottomInView = rect.bottom >= 0 && rect.bottom <= windowHeight;

    const elementHeight = rect.bottom - rect.top;
    const visiblePercentage = (elementHeight - Math.max(0, -rect.top, rect.bottom - windowHeight)) / elementHeight * 100;

    return elementTopInView || elementBottomInView || visiblePercentage >= percentage;
}

// Checks and see if an element is in the view port and if it is then adds an enter animation.
const handleScroll = () => {
    const aboutMe = document.getElementById("about-me");
    const skills = document.getElementById("skills");
    const projects = document.getElementById("project-container");
    const contact  = document.getElementById("contact");
    
    if (isInViewPort(aboutMe, 50)) {
        aboutMe.classList.add("active");
        skills.classList.add("active");


        projects.classList.remove("active");
        contact.classList.remove("active");
    }
    else if (isInViewPort(contact)) {
        contact.classList.add("active");

        aboutMe.classList.remove("active");
        skills.classList.remove("active");
        projects.classList.remove("active");
    }
    else {
        aboutMe.classList.remove("active");
        skills.classList.remove("active");
        projects.classList.remove("active");
        contact.classList.remove("active");
    }
}

window.addEventListener("scroll", handleScroll);

// Initial trigger in case they start the webpage with an element already in the viewport.
handleScroll();



// ********************** Canvas Styles ********************** //

const canvas = document.getElementById('skyCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];
const numberOfStars = 200;
let mouse = { x: undefined, y: undefined };

// Capture mouse position
window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener('mouseleave', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Star class to handle each individual star particle
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // Small stars
        this.originalSize = this.size; // Store original size for restoring later
        this.speedX = (Math.random() - 0.5) * 0.2; // Slow horizontal movement
        this.speedY = (Math.random() - 0.5) * 0.2; // Slow vertical movement
        this.opacity = Math.random(); // Random opacity for twinkling effect
        this.moveAwayFactor = 100; // Factor to determine how much to move away from mouse
    }

    update() {
        // Move the star slowly
        this.x += this.speedX;
        this.y += this.speedY;

        // Check if mouse is close and move star away
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.moveAwayFactor) {
                // Move star away from mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = this.moveAwayFactor;
                const force = (maxDistance - distance) / maxDistance;

                const directionX = forceDirectionX * force * 3;
                const directionY = forceDirectionY * force * 3;

                this.x -= directionX;
                this.y -= directionY;
            }
        }

        // Restore original size gradually after interaction
        this.size = Math.min(this.size + 0.05, this.originalSize);
    }

    draw() {
        ctx.save(); // Save current drawing state
        ctx.globalAlpha = this.opacity; // Set star opacity
        ctx.fillStyle = "white"; // Star color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // Restore original state
    }
}

// Initialize the stars
function init() {
    starsArray = [];
    for (let i = 0; i < numberOfStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsArray.push(new Star(x, y));
    }
}

// Handle stars update and drawing
function handleStars() {
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();

        // Remove stars that go out of bounds
        if (starsArray[i].x > canvas.width + 50 || starsArray[i].x < -50 || 
            starsArray[i].y > canvas.height + 50 || starsArray[i].y < -50) {
            starsArray.splice(i, 1);
            i--;
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleStars();

    // Generate new stars periodically to fill the screen
    if (starsArray.length < numberOfStars) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsArray.push(new Star(x, y));
    }

    requestAnimationFrame(animate);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Initiate Animation
init();
animate();