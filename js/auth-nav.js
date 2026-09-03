document.addEventListener("DOMContentLoaded", function() {
  const session = JSON.parse(localStorage.getItem('userSession'));
  const currentPath = window.location.pathname;

  // 1. Proteksi Halaman
  if (!session && !currentPath.endsWith('index.html') && !currentPath.endsWith('/')) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
    return;
  }

  // 2. Tampilkan Navbar Otomatis
  if (session && !currentPath.endsWith('index.html')) {
    const nav = document.createElement('nav');
    nav.style.cssText = "background:#0d6efd; color:#fff; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; font-family:sans-serif; margin-bottom:20px;";
    
    const dashboardLink = session.role === 'guru' ? 'dashboard-guru.html' : 'dashboard-siswa.html';

    nav.innerHTML = `
      <div>
        <a href="${dashboardLink}" style="color:#fff; text-decoration:none; font-weight:bold; font-size:18px;">KTSM8</a>
        <span style="margin-left:10px; font-size:12px; background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:12px;">${session.role.toUpperCase()}</span>
      </div>
      <div style="display:flex; align-items:center; gap:15px;">
        <span><b>${session.nama}</b></span>
        <button onclick="logout()" style="background:#dc3545; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">Logout</button>
      </div>`;
    document.body.insertBefore(nav, document.body.firstChild);
  }
});

function logout() {
  localStorage.removeItem('userSession');
  window.location.href = 'index.html';
}
