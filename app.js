
let currentSubject = "c";

document.addEventListener("DOMContentLoaded", function() {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const notesForm = document.getElementById("notesForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (localStorage.getItem("studentEmail")) {
                alert("A student is already registered in this browser.");
                return;
            }

            localStorage.setItem("studentName", name);
            localStorage.setItem("studentEmail", email);
            localStorage.setItem("studentPassword", password);

            alert("Registration successful!");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (
                email === localStorage.getItem("studentEmail") &&
                password === localStorage.getItem("studentPassword")
            ) {
                sessionStorage.setItem("loggedIn", "true");
                window.location.href = "index.html";
            } else {
                alert("Incorrect email or password!");
            }
        });
    }

    if (notesForm) {
        notesForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let notes = JSON.parse(localStorage.getItem("sharedNotes")) || [];

            notes.push({
                title: document.getElementById("noteTitle").value,
                content: document.getElementById("noteContent").value
            });

            localStorage.setItem("sharedNotes", JSON.stringify(notes));

            notesForm.reset();
            displayNotes();
            alert("Notes shared successfully!");
        });

        displayNotes();
    }

    if (document.getElementById("welcome")) {
        if (sessionStorage.getItem("loggedIn") !== "true") {
            window.location.href = "login.html";
            return;
        }

        document.getElementById("welcome").innerText =
            "Welcome, " + (localStorage.getItem("studentName") || "Student") + "!";
    }

});

const chapters = {
    c: ["Introduction to C Programming", "Data Types and Operators", "Loops and Conditions", "Arrays and Functions"],
    math: ["Algebra", "Differentiation", "Integration"],
    physics: ["Mechanics", "Waves", "Electricity"],
    english: ["Grammar", "Communication Skills"]
};

const notes = {
    "Introduction to C Programming": "C is a general-purpose programming language developed by Dennis Ritchie. It is used to develop applications and system software.",
    "Data Types and Operators": "C data types include int, float, char and double. Operators perform arithmetic, relational and logical operations.",
    "Loops and Conditions": "Loops repeat instructions. C has for, while and do-while loops. Conditions use if, else and switch.",
    "Arrays and Functions": "Arrays store multiple values of the same type. Functions are reusable blocks of code.",
    "Algebra": "Algebra uses variables and symbols. Example: x + 2 = 5, so x = 3.",
    "Differentiation": "Differentiation finds the rate of change of a function.",
    "Integration": "Integration is the reverse process of differentiation.",
    "Mechanics": "Mechanics is the branch of physics dealing with motion and forces.",
    "Waves": "Waves transfer energy from one place to another.",
    "Electricity": "Electricity is associated with electric charges and their movement.",
    "Grammar": "Grammar is the set of rules used to form correct sentences.",
    "Communication Skills": "Communication includes speaking, listening, reading and writing."
};

function openSubject(subject) {
    currentSubject = subject;

    let output = "<h2>Chapters</h2>";

    chapters[subject].forEach(function(chapter) {
        output += `
            <div class="chapter">
                <h3>${chapter}</h3>
                <button onclick="openNotes('${chapter}')">Open Notes</button>
            </div>
        `;
    });

    document.getElementById("chapters").innerHTML = output;
}

function openNotes(chapter) {
    document.getElementById("chapters").innerHTML = `
        <div class="chapter">
            <h2>${chapter}</h2>
            <p>${notes[chapter]}</p>
            <button onclick="openSubject(currentSubject)">Back to Chapters</button>
        </div>
    `;
}

function searchSubjects() {
    let value = document.getElementById("search").value.toLowerCase();

    document.querySelectorAll(".subject").forEach(function(subject) {
        subject.style.display = subject.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
}

function displayNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("sharedNotes")) || [];
    let output = "";

    savedNotes.forEach(function(note) {
        output += `
            <div class="chapter">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
            </div>
        `;
    });

    document.getElementById("sharedNotes").innerHTML =
        output || "<p>No notes shared yet.</p>";
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
