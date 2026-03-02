const courses = [
    { name: 'Mathematics', desc: 'Calculus, Linear Algebra, Number Theory', icon: 'fa-square-root-variable', view: 'math' },
    { name: 'Theoretical Physics', desc: 'Quantum Mechanics, Relativity', icon: 'fa-atom', view: 'home' },
    { name: 'Bio-Chemistry', desc: 'Molecular Biology, Organic Chemistry', icon: 'fa-vial', view: 'home' },
    { name: 'Earth Sciences', desc: 'Geophysics, Environmental Policy', icon: 'fa-globe-americas', view: 'home' }
];

const questions = [
    { q: "Evaluate the limit: $\lim_{x \to 0} \frac{\sin x}{x}$", o: ["0", "1", "Undefined"], a: 1 },
    { q: "Which property defines a Group in Abstract Algebra?", o: ["Commutativity", "Associativity", "Distributivity"], a: 1 }
];

let curQ = 0;
let score = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    const grid = document.getElementById('courseGrid');
    if(!grid) return;

    courses.forEach(c => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-icon"><i class="fas ${c.icon}"></i></div>
            <div>
                <h4 style="font-size: 1.2rem; font-weight: 700;">${c.name}</h4>
                <p style="color: var(--slate-600); font-size: 0.9rem; margin-top: 4px;">${c.desc}</p>
            </div>
            <div style="margin-top: auto; display:flex; align-items:center; gap:8px; color:var(--primary); font-weight:600; font-size:0.85rem;">
                View Certification <i class="fas fa-arrow-right" style="font-size: 0.7rem;"></i>
            </div>
        `;
        card.onclick = () => navigateTo(c.view);
        grid.appendChild(card);
    });
}

function navigateTo(view) {
    document.querySelectorAll('.view-pane').forEach(v => v.classList.remove('active-view'));
    
    let targetId = 'mainView';
    if (view !== 'home') {
        targetId = view + 'HubView';
    }
    
    const target = document.getElementById(targetId);
    if(target) {
        target.classList.add('active-view');
        window.scrollTo(0, 0);
    }
}

function startExam() {
    curQ = 0; 
    score = 0;
    document.getElementById('examModal').classList.add('active');
    renderQ();
}

function closeExam() {
    document.getElementById('examModal').classList.remove('active');
}

function renderQ() {
    const container = document.getElementById('modalContent');
    const progressText = document.getElementById('progress');
    
    if (curQ >= questions.length) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Assessment Complete</h2>
                <p style="font-size: 1.2rem; color: var(--slate-600); margin-bottom: 40px;">Your responses have been verified. Final Score: ${score}/${questions.length}</p>
                <button class="btn btn-primary" onclick="closeExam()">Return to Dashboard</button>
            </div>
        `;
        return;
    }

    const q = questions[curQ];
    progressText.innerText = `Session Active: Q${curQ + 1}/${questions.length}`;
    
    container.innerHTML = `
        <h2 style="margin-bottom: 40px; font-size: 2rem;">${q.q}</h2>
        <div id="optionsContainer">
            ${q.o.map((opt, i) => `
                <div class="quiz-option" onclick="checkAnswer(${i})">${opt}</div>
            `).join('')}
        </div>
    `;
}

function checkAnswer(idx) {
    const q = questions[curQ];
    const options = document.querySelectorAll('.quiz-option');
    
    if (idx === q.a) {
        options[idx].classList.add('correct');
        score++;
    } else {
        options[idx].classList.add('wrong');
        options[q.a].classList.add('correct');
    }

    // Delay before next question
    setTimeout(() => {
        curQ++;
        renderQ();
    }, 1500);
          }
