// لوحة التحكم - GitHub API Integration

let githubConfig = { repo: '', token: '', sha: '' };
let currentData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if gh config exists in memory/session (for quick reloads)
    const storedGH = sessionStorage.getItem('ghConfig');
    if (storedGH) {
        githubConfig = JSON.parse(storedGH);
        document.getElementById('github-setup').classList.add('hidden');
        document.getElementById('dashboard-app').classList.remove('hidden');
        loadDataFromGitHub();
    }
});

function initGitHub() {
    const repo = document.getElementById('gh-repo').value.trim();
    const token = document.getElementById('gh-token').value.trim();
    const errEl = document.getElementById('gh-error');
    
    if(!repo || !token) {
        errEl.textContent = "يرجى ملء جميع الحقول!";
        errEl.classList.remove('hidden');
        return;
    }
    
    errEl.classList.add('hidden');
    githubConfig = { repo, token, sha: '' };
    
    // Test Connection
    fetch(`https://api.github.com/repos/` + repo + `/contents/js/data.js`, {
        headers: {
            'Authorization': 'token ' + token,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("فشل الاتصال! تأكد من التوكن واسم المستودع.");
        return res.json();
    })
    .then(data => {
        githubConfig.sha = data.sha;
        sessionStorage.setItem('ghConfig', JSON.stringify(githubConfig));
        document.getElementById('github-setup').classList.add('hidden');
        document.getElementById('dashboard-app').classList.remove('hidden');
        
        // We will just use the global DEFAULT_DATA that loaded with the page
        currentData = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
        renderDashboard();
    })
    .catch(err => {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
    });
}

function loadDataFromGitHub() {
    currentData = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
    renderDashboard();
    
    // fetch sha
    fetch(`https://api.github.com/repos/` + githubConfig.repo + `/contents/js/data.js`, {
        headers: { 'Authorization': 'token ' + githubConfig.token }
    }).then(res => res.json()).then(data => { githubConfig.sha = data.sha; });
}

function saveToGitHub() {
    if(!currentData) return;
    
    const saveBtn = document.getElementById('save-btn');
    saveBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> جاري الحفظ...";
    saveBtn.disabled = true;
    
    // 1. Fetch current data.js to get exact text (to preserve functions)
    fetch(`https://api.github.com/repos/` + githubConfig.repo + `/contents/js/data.js`, {
        headers: { 'Authorization': 'token ' + githubConfig.token }
    })
    .then(res => res.json())
    .then(fileData => {
        const decoded = decodeURIComponent(escape(atob(fileData.content)));
        
        // 2. Replace the DEFAULT_DATA object in the string
        // We know it starts with "const DEFAULT_DATA = {" and ends before "const STORAGE_KEY"
        const regex = /(const DEFAULT_DATA = )([\s\S]*?)(;\s*const STORAGE_KEY)/;
        const newJSContent = decoded.replace(regex, "$1" + JSON.stringify(currentData, null, 2) + "$3");
        
        const newContentBase64 = btoa(unescape(encodeURIComponent(newJSContent)));
        
        // 3. Commit
        return fetch(`https://api.github.com/repos/` + githubConfig.repo + `/contents/js/data.js`, {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + githubConfig.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "تحديث البيانات من لوحة التحكم",
                content: newContentBase64,
                sha: fileData.sha
            })
        });
    })
    .then(res => {
        if(!res.ok) throw new Error("فشل الحفظ");
        return res.json();
    })
    .then(() => {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3000);
    })
    .catch(err => alert("حدث خطأ: " + err.message))
    .finally(() => {
        saveBtn.innerHTML = "<i class='bx bx-cloud-upload'></i> حفظ ونشر التعديلات";
        saveBtn.disabled = false;
    });
}

function renderDashboard() {
    // Very simplified rendering for demonstration
    const pForm = document.getElementById('personal-form');
    pForm.innerHTML = `
        <div class="form-group"><label>الاسم (عربي)</label><input type="text" value="`+currentData.personal.name.ar+`" onchange="currentData.personal.name.ar=this.value"></div>
        <div class="form-group"><label>المسمى الوظيفي (عربي)</label><input type="text" value="`+currentData.personal.title.ar+`" onchange="currentData.personal.title.ar=this.value"></div>
    `;
    
    // Sections Tab Logic
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            const section = document.getElementById('section-' + btn.dataset.section);
            if(section) section.classList.add('active');
        });
    });
}
