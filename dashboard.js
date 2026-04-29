// ===== LOAD JSON DATA =====
async function loadData() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    renderStats(data.stats);
    renderTable(data.projects);
    renderSkills(data.skills);
    renderMessages(data.messages);
  } catch (err) {
    console.error('Data load failed:', err);
  }
}

// ===== STAT CARDS =====
function renderStats(stats) {
  const container = document.getElementById('statsContainer');
  if (!container) return;
  container.innerHTML = stats.map((s, i) => `
    <div class="col-md-6 col-xl-3 animate-in" style="animation-delay:${i * 0.1}s">
      <div class="stat-card ${s.color}">
        <div class="stat-icon ${s.color}">
          <i class="bi ${s.icon}"></i>
        </div>
        <div class="stat-info">
          <h3>${s.value}</h3>
          <p>${s.title}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== PROJECT TABLE =====
function renderTable(projects) {
  const tbody = document.getElementById('projectTable');
  if (!tbody) return;
  tbody.innerHTML = projects.map(p => `
    <tr>
      <td><strong>#${p.id}</strong></td>
      <td>${p.name}</td>
      <td>${p.client}</td>
      <td><span class="status-badge ${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span></td>
      <td>${p.date}</td>
      <td><small class="text-muted">${p.tech}</small></td>
    </tr>
  `).join('');
}

// ===== SKILL BARS =====
function renderSkills(skills) {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  container.innerHTML = skills.map(s => `
    <div class="skill-item">
      <div class="skill-label">
        <span>${s.name}</span>
        <span>${s.percent}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-width="${s.percent}"></div>
      </div>
    </div>
  `).join('');
  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 300);
}

// ===== MESSAGES =====
function renderMessages(messages) {
  const container = document.getElementById('messagesContainer');
  if (!container) return;
  container.innerHTML = messages.map(m => `
    <div class="msg-item ${!m.read ? 'msg-unread' : ''}">
      <div class="msg-avatar">${m.from.charAt(0)}</div>
      <div class="msg-body">
        <div class="msg-from">${m.from}</div>
        <div class="msg-sub">${m.subject}</div>
      </div>
      <div class="d-flex flex-column align-items-end gap-1">
        <span class="msg-time">${m.time}</span>
        ${!m.read ? '<div class="unread-dot"></div>' : ''}
      </div>
    </div>
  `).join('');
}

// ===== MOBILE SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', loadData);