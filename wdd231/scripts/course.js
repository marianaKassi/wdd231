const courses = [
    { name: "WDD130", credits: 2, completed: true },
    { name: "WDD131", credits: 2, completed: true },
    { name: "WDD231", credits: 2, completed: true },
    { name: "CSE121", credits: 2, completed: false },

   
       { name: "CSE210", credits: 2, completed: false },
    { name: "CSE111", credits: 2, completed: false },

    { name: "REL250A", credits: 1, completed: false },
    { name: "REL250B", credits: 1, completed: false },
    { name: "REL275A", credits: 1, completed: false },
    { name: "REL275B", credits: 1, completed: false },
    { name: "REL200", credits: 1, completed: false },

    { name: "ITM111", credits: 3, completed: false },

    { name: "MATH108X", credits: 3, completed: false },
    { name: "GS170", credits: 1, completed: false },



];

function displayCourses(filter = null) {
    const container = document.getElementById('course-list');
    container.innerHTML = '';

    let filteredCourses = filter ? courses.filter(course => course.name.startsWith(filter.toUpperCase())) : courses;

    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.textContent = `${course.name} (${course.credits} credits)`;
        if (course.completed) {
            div.classList.add('completed');
        }
        container.appendChild(div);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total Credits: ${totalCredits}`;
    totalElement.style.textAlign = 'center';
    totalElement.style.marginTop = '1rem';
    totalElement.style.fontWeight = 'bold';
    container.appendChild(totalElement);

    };

// Display all courses on page load
displayCourses();



// Handle filter buttons
document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter || null;
        displayCourses(filter);
    });
});