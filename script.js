//header
/*This part adds an effect where the header background changes
when the user scrolls down and highlights the navigation link corresponding
to the currently visible section of the page.*/

// Highlight the current section in the navigation menu
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section'); // All sections
    const navLinks = document.querySelectorAll('.nav-links a'); // All nav links
    const header = document.querySelector('header');
    
    // Add scrolled class to header for background effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Highlight the current section's link
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset as needed
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id'); // Get the current section's ID
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
}); //header js end

// typing effect to the "Frontend Developer" text
/*This adds a typing animation effect to the .typing element,
cycling through a list of words ("Frontend Developers",
"Web Designers", "UI/UX Enthusiasts") with a typing and deleting effect.*/
const typingText = document.querySelector('.typing');
const words = ["Frontend Developers", "Web Designers", "UI/UX Enthusiasts"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex--); // Deleting letters
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Cycle through words
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex++); // Typing letters
        if (charIndex === currentWord.length) {
            isDeleting = true;
        }
    }
    setTimeout(type, isDeleting ? 100 : 200); // Speed control for typing/deleting
}


document.addEventListener("DOMContentLoaded", () => {
    type(); // Start typing effect once the page is loaded
}); //typing effect js end


//js for skills
/* This section animates the skill progress bars,
making them "fill up" based on the skill level specified
in a data-skill attribute. It also updates the text next to each progress bar.*/
document.addEventListener("DOMContentLoaded", function () {
    const skillProgressBars = document.querySelectorAll(".skill-progress");
    const skillPercentages = document.querySelectorAll(".skill-percentage");

    skillProgressBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute("data-skill"); // Get skill level from data attribute

        setTimeout(() => {
            bar.style.width = `${skillLevel}%`; // Set the width of the progress bar

            // Update the percentage text
            let count = 0;
            const percentageUpdater = setInterval(() => {
                count++;
                skillPercentages[index].textContent = `${Math.min(count, skillLevel)}%`; // Update percentage text
                if (count >= skillLevel) clearInterval(percentageUpdater); // Stop when the skill level is reached
            }, 15); // Speed of counting
        }, 300);
    });
}); //skills js end


//js for preloading
/*Hides a preloader element after the page has loaded,
providing a smooth user experience by keeping the preloader visible for a short time.*/
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none'; // Hide the preloader after 1 second
    }, 1000); // 1000 milliseconds = 1 second
}); //end

// js to pause the moving gallery on hover
/*Pauses the animation of a gallery element when hovered over,
resuming the animation when the mouse leaves.*/
const gallery = document.querySelector('.gallery');

gallery.addEventListener('mouseover', () => {
    gallery.style.animationPlayState = 'paused'; // Pause animation on hover
});

gallery.addEventListener('mouseout', () => {
    gallery.style.animationPlayState = 'running'; // Resume animation when mouse leaves
});

//js for viewing image
/*Creates a modal popup when an image is clicked,
allowing the user to view the image in a larger size.
The modal can be closed by clicking anywhere on it.*/
function viewImage(imageSrc) {
    // Create a modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Create an image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = "Full View";
    modal.appendChild(img);

    // Close the modal on click
    modal.onclick = () => modal.remove();

    // Append modal to body
    document.body.appendChild(modal);
}

// Modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
    }
`;
document.head.appendChild(modalStyle); //end

//FORM JS
/*Listens for clicks on the feedback and request buttons,
showing the respective forms when clicked.*/
document.addEventListener("DOMContentLoaded", () => {
    // Attach initial click handlers
    document.querySelector(".btn-feedback").addEventListener("click", showFeedbackForm);
    document.querySelector(".btn-request").addEventListener("click", showRequestForm);
});

function showFeedbackForm() {
    const container = document.querySelector('.contact-container2');
    container.classList.remove('show-request');
    resetRightPanel();

    container.classList.add('show-feedback');
    updateLeftPanel(`
        <h2>Feedback Form</h2>
        <form id="feedbackForm">
            <textarea placeholder="Enter your feedback here..." required></textarea>
            <button type="submit" class="btn-feedback">Submit Feedback</button>
        </form>
    `);

    // Add event listener for feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.onsubmit = function (event) {
        event.preventDefault();
        alert('Feedback submitted, thank you JOLYDevees!');
        resetLeftPanel(); // Reset panel to initial state
    };
}

function showRequestForm() {
    const container = document.querySelector('.contact-container2');
    container.classList.remove('show-feedback');
    resetLeftPanel();

    container.classList.add('show-request');
    updateRightPanel(`
        <h2>Request Form</h2>
        <form id="requestForm">
            <input type="text" placeholder="Enter your name" required>
            <input type="email" placeholder="Enter your email" required>
            <select required>
                <option value="" disabled selected>Choose Pricing Plan</option>
                <option value="basic">Basic Plan</option>
                <option value="premium">Premium Plan</option>
                <option value="enterprise">Standard</option>
            </select>
            <select multiple required>
                <option value="web-development">Web Development</option>
                <option value="web-design">Web Design</option>
                <option value="app-design">App Design</option>
                <option value="gav-design">Graphic and Visual Design</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="consulting-services">Consulting Services</option>
            </select>
            <button type="submit" class="btn-request">Submit Request</button>
        </form>
    `);

    // Add event listener for request form submission
    const requestForm = document.getElementById('requestForm');
    requestForm.onsubmit = function (event) {
        event.preventDefault();
        alert("Request submitted! We'll get back to you shortly.");
        resetRightPanel(); // Reset panel to initial state
    };
}

// Function to reset left panel to its initial state
function resetLeftPanel() {
    updateLeftPanel(`
        <h2>Send Us Your Feedback</h2>
        <p>We'd love to hear your thoughts and suggestions!</p>
        <button class="btn-feedback">Give Feedback</button>
    `);

    // Reattach the event listener
    document.querySelector(".btn-feedback").addEventListener("click", showFeedbackForm);
}

// Function to reset right panel to its initial state
function resetRightPanel() {
    updateRightPanel(`
        <h2>Request Service</h2>
        <p>Looking for specific services? Let us know!</p>
        <button class="btn-request">Make a Request</button>
    `);

    // Reattach the event listener
    document.querySelector(".btn-request").addEventListener("click", showRequestForm);
}

function updateLeftPanel(content) {
    const leftPanel = document.getElementById('left-panel');
    leftPanel.innerHTML = `<div class="content-contact">${content}</div>`;
}

function updateRightPanel(content) {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.innerHTML = `<div class="content-contact">${content}</div>`;
}

//Footer js
/*Handles the submission of the newsletter form.
If an email is provided, it shows a thank you message
and resets the form; otherwise, it asks the user to provide a valid email.*/
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;

  if (email) {
    alert('Thank you for subscribing to our newsletter!');
    document.getElementById('newsletter-form').reset();
  } else {
    alert('Please enter a valid email address.');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor behavior

        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Select the target section

        // Scroll to the target section smoothly
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Align the top of the section with the top of the viewport
        });
    });
});

// Existing scroll event listener for highlighting nav links
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // All sections
    const navLinks = document.querySelectorAll('nav a, .footer-links a'); // All nav links
    const header = document.querySelector('header');

    // Add scrolled class to header for background effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset as needed
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id'); // Get the current section's ID
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
});

// JavaScript to handle scroll animations
/*Adds a fade-in effect to elements when they
come into view as the user scrolls. It checks if
elements are visible and adds the visible class to trigger animations.*/
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4; // Trigger when 80% of the element is visible

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible'); // Add visible class
            } else {
                element.classList.remove('visible'); // Remove visible class if not in view
            }
        });
    };

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check in case elements are already in view
    checkVisibility();
});