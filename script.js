document.addEventListener("DOMContentLoaded", () => {
    // Embedded JSON data
    const data = {
        profile: {
            name: "Rubia Magdelena Francesco",
            location: "Tolokia, Madagascar"
        },
        courses: [
            { code: "CSE 110", category: "CSE" },
            { code: "WDD 130", category: "WDD" },
            { code: "CSE 111", category: "CSE" },
            { code: "CSE 210", category: "CSE" },
            { code: "WDD 131", category: "WDD" },
            { code: "WDD 231", category: "WDD" }
        ]
    };

    // Update last modified date
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleString();
    const lastModified = document.getElementById("last-modified");
    const formattedDate = new Date(document.lastModified).toLocaleString();
    lastModified.textContent = formattedDate;

    // Filter certificates
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const certificatesContainer = document.querySelector(".certificate-grid");

    // Initialize certificates in the DOM
    function initializeCertificates() {
        certificatesContainer.innerHTML = ""; // Clear previous content
        data.courses.forEach(course => {
            const certificateDiv = document.createElement("div");
            certificateDiv.className = `certificate ${course.category}`;
            certificateDiv.textContent = course.code;
            certificatesContainer.appendChild(certificateDiv);
        });
    }

    // Apply filter to certificates
    function filterCertificates(filter) {
        const certificates = document.querySelectorAll(".certificate");
        certificates.forEach(cert => {
            if (filter === "all" || cert.classList.contains(filter)) {
                cert.style.display = "block";
            } else {
                cert.style.display = "none";
            }
        });
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterCertificates(button.dataset.filter);
        });
    });

    // Initialize certificates and set default filter ("all")
    initializeCertificates();
    filterCertificates("all");


    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
    
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'ITM',
            number: 111,
            title: 'Introduction to Database',
            credits: 2,
            certificate: 'Build a Database',
            description: 'This course introduces students to the fundamental concepts of databases. Students will learn about data modeling, normalization, and relational databases. Students will also learn to write basic SQL queries.',
            technology: ['Ongoing Courses'],
            completed: false
        },
        {
            subject: 'GS',
            number: 170,
            title: 'Career Development',
            credits: 2,
            certificate: 'Career Development',
            description: 'In this course, students develop resources, professional connections and essential employability skills to obtain or improve employment in a field related to their university certificate. Students will network and apply for job opportunities in their industry. The life-long skills gained in this course are valuable for both active and future job seekers.',
            technology: ['Ongoing Courses'],
            completed: false
        },
        {
            subject: 'REL',
            number: 250,
            title: 'REL250A - Jesus Christ and His Everlasting Gospel A',
            credits: 2,
            certificate: 'Institute of Religion',
            description: 'This course is a study of the life and teachings of Jesus Christ as found in the New Testament, with emphasis on His gospel, the Atonement, and the plan of salvation. Special attention is given to the application of His teachings in our lives today.',
            technology: ['Ongoing Courses'],
            completed: false
        }
    ]
    


});

