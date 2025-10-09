// Course data
const courses = [
    { code: "WDD130", credits: 2, category: "wdd" },
    { code: "WDD131", credits: 2, category: "wdd" },
    { code: "WDD231", credits: 2, category: "wdd" },
    { code: "CSE121", credits: 2, category: "cse" },
    { code: "CSE210", credits: 2, category: "cse" },
    { code: "CSE111", credits: 2, category: "cse" },
    { code: "REL250A", credits: 1, category: "rel" },
    { code: "REL250B", credits: 1, category: "rel" },
    { code: "REL275A", credits: 1, category: "rel" },
    { code: "REL275B", credits: 1, category: "rel" },
    { code: "REL200", credits: 1, category: "rel" },
    { code: "ITM111", credits: 3, category: "itm" },
    { code: "MATH108X", credits: 3, category: "math" },
    { code: "GS170", credits: 1, category: "gs" }
];

// DOM elements
const coursesList = document.getElementById('courses-list');
const totalCreditsElement = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-btn');
const lastModifiedElement = document.getElementById('last-modified');

// Display courses based on filter
function displayCourses(filter = 'all') {
    coursesList.innerHTML = '';
    
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.category === filter);
    
    filteredCourses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <div class="course-code">${course.code}</div>
            <div class="course-credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</div>
        `;
        coursesList.appendChild(courseItem);
    });
    
    // Calculate and display total credits
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

// Set last modified date
function setLastModified() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    lastModifiedElement.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize page
function init() {
    // Display all courses initially
    displayCourses();
    
    // Set last modified date
    setLastModified();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter courses
            const filter = button.getAttribute('data-filter');
            displayCourses(filter);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);