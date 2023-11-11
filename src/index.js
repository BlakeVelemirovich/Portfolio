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
    else if (isInViewPort(projects)) {
        projects.classList.add("active");

        aboutMe.classList.remove("active");
        skills.classList.remove("active");
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