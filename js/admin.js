// ================================================================
// ADMIN SHARED — Sidebar, loader, init
// ================================================================

// SVG icon helpers (Feather-style outlines)
const Icon = {
    grid: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    users: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    bar: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    alert: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    globe: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    key: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    settings: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    tv: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
    logout: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
    qr: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="19" y="19" width="2" height="2"/></svg>',
    user: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    download: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    search: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    trash: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>',
    check: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 16 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    lock: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    chat: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    student: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
};

// Sidebar HTML — call injectSidebar(activeId) on each admin page
function injectSidebar(activeId) {
    if (!Auth.requireAdmin()) return;
    const user = Auth.getUser();

    const navLinks = [
        { id: 'dashboard', href: 'dashboard.html', icon: 'grid', label: 'Dashboard', group: 'Tổng Quan' },
        { id: 'reports', href: 'reports.html', icon: 'bar', label: 'Báo Cáo', group: 'Tổng Quan' },
        { id: 'alerts', href: 'alerts.html', icon: 'alert', label: 'Cảnh Báo AI', group: 'Tổng Quan' },
        { id: 'employees', href: 'employees.html', icon: 'users', label: 'Nhân Viên', group: 'Quản Lý' },
        { id: 'students', href: 'students.html', icon: 'student', label: 'Sinh Viên', group: 'Quản Lý' },
        { id: 'networks', href: 'networks.html', icon: 'globe', label: 'Mạng IP', group: 'Quản Lý' },
        { id: 'codes', href: 'codes.html', icon: 'key', label: 'Mã Đăng Ký', group: 'Quản Lý' },
        { id: 'devices', href: 'devices.html', icon: 'phone', label: 'Thiết Bị', group: 'Quản Lý' },
        { id: 'settings', href: 'settings.html', icon: 'settings', label: 'Cài Đặt', group: 'Hệ Thống' },
        { id: 'chat', href: 'chat.html', icon: 'chat', label: 'Chat Hỗ Trợ', group: 'Hệ Thống', badge: true },
        { id: 'qr', href: '../qr-display.html', icon: 'tv', label: 'Màn Hình QR', group: 'Hệ Thống', blank: true },
    ];

    let prevGroup = '';
    const navHtml = navLinks.map(n => {
        const groupLabel = n.group !== prevGroup ? `<div class="nav-group-label">${n.group}</div>` : '';
        prevGroup = n.group;
        return `${groupLabel}<a href="${n.href}" class="nav-item ${n.id === activeId ? 'active' : ''}" id="nav-${n.id}" ${n.blank ? 'target="_blank"' : ''}>${Icon[n.icon] || ''} ${n.label}${n.badge ? '<span id="chat-badge" style="display:none;background:var(--color-danger,#ef4444);color:#fff;font-size:.6rem;font-weight:800;padding:1px 5px;min-width:16px;text-align:center;margin-left:auto">0</span>' : ''}</a>`;
    }).join('');

    const sidebarHtml = `
    <div class="sidebar-header">
      <div class="sidebar-logo">Điểm Danh QR</div>
      <div class="sidebar-logo-sub">Quản Trị Hệ Thống</div>
    </div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">${user?.fullName || 'Admin'}</div>
      <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:0.5rem">${user?.email || ''}</div>
      <button onclick="Auth.logout()" class="btn btn-ghost btn-sm btn-full">${Icon.logout} Đăng Xuất</button>
    </div>`;

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.innerHTML = sidebarHtml;
        // Fix: nav-item needs to be flex to push badge to right
        document.querySelectorAll('.nav-item').forEach(el => {
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.gap = '.5rem';
        });
        // Load unread count
        loadChatBadge();
        setInterval(loadChatBadge, 30000);
    }
}

async function loadChatBadge() {
    try {
        const data = await Api.get('/chat/admin/unread-count');
        const badge = document.getElementById('chat-badge');
        if (!badge) return;
        if (data.count > 0) {
            badge.textContent = data.count > 99 ? '99+' : data.count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    } catch { }
}

// Page loader — called by each page
function pageReady() {
    setTimeout(() => UI.hideLoader(), 400);
    document.body.classList.add('page-enter');
}
