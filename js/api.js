// API base configuration — auto-detect server from current browser host
const API_BASE = `https://diemdanh-be.fly.dev/api`;

// ===== TOKEN MANAGEMENT =====
const Auth = {
    getToken: () => localStorage.getItem('jwt_token'),
    getUser: () => {
        const token = Auth.getToken();
        if (!token) return null;
        try {
            // Use decodeURIComponent to handle UTF-8 Vietnamese characters correctly
            const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')));
            return {
                id: payload.sub,
                email: payload.email,
                role: payload.role,
                fullName: payload.fullName
            };
        } catch { return null; }
    },
    setToken: (token) => localStorage.setItem('jwt_token', token),
    clearToken: () => localStorage.removeItem('jwt_token'),
    isAdmin: () => Auth.getUser()?.role === 'Admin',
    isLoggedIn: () => !!Auth.getToken(),
    logout: () => {
        Auth.clearToken();
        window.location.href = '/index.html';
    },
    requireLogin: () => {
        if (!Auth.isLoggedIn()) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    },
    requireAdmin: () => {
        if (!Auth.isLoggedIn()) { window.location.href = '/index.html'; return false; }
        if (!Auth.isAdmin()) { window.location.href = '/scan.html'; return false; }
        return true;
    }
};

// ===== HTTP CLIENT =====
const Api = {
    async request(method, path, body = null, auth = true) {
        const headers = { 'Content-Type': 'application/json' };
        if (auth && Auth.getToken()) headers['Authorization'] = `Bearer ${Auth.getToken()}`;

        const res = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { data = { message: text }; }

        if (!res.ok) {
            const err = new Error(data?.message || data?.title || `HTTP ${res.status}`);
            err.errorCode = data?.refreshToken || null; // backend reuses refreshToken slot for errorCode
            throw err;
        }
        return data;
    },
    get: (path, auth = true) => Api.request('GET', path, null, auth),
    post: (path, body, auth = true) => Api.request('POST', path, body, auth),
    put: (path, body, auth = true) => Api.request('PUT', path, body, auth),
    delete: (path, auth = true) => Api.request('DELETE', path, null, auth),
};

// ===== DEVICE FINGERPRINT =====
const DeviceFingerprint = {
    generate() {
        const nav = navigator;
        const screen = window.screen;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('DiemDanh🔒', 2, 2);
        const canvasData = canvas.toDataURL();
        const raw = [
            nav.userAgent, nav.language, nav.platform,
            screen.width, screen.height, screen.colorDepth,
            nav.hardwareConcurrency || '',
            canvasData.substring(0, 100)
        ].join('||');
        // Simple hash
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
            hash = ((hash << 5) - hash) + raw.charCodeAt(i);
            hash |= 0;
        }
        const deviceId = Math.abs(hash).toString(36) + '_' + (nav.hardwareConcurrency || 0) + '_' + screen.width;
        localStorage.setItem('device_id', deviceId);
        return deviceId;
    },
    get() {
        return localStorage.getItem('device_id') || DeviceFingerprint.generate();
    },
    getName() {
        const ua = navigator.userAgent;
        if (/iPhone|iPad/i.test(ua)) return 'iOS Device';
        if (/Android/i.test(ua)) return 'Android Device';
        if (/Windows/i.test(ua)) return 'Windows PC';
        if (/Mac/i.test(ua)) return 'MacOS';
        return 'Unknown Device';
    }
};

// ===== UI HELPERS =====
const UI = {
    showAlert(container, message, type = 'error') {
        const svgIcons = {
            success: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
            error:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            warning: '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            info:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };
        container.innerHTML = `<div class="alert alert-${type}">${svgIcons[type] || ''} ${message}</div>`;
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    clearAlert(container) { if (container) container.innerHTML = ''; },
    setLoading(btn, loading = true) {
        if (loading) {
            btn._originalHTML = btn.innerHTML;
            btn.innerHTML = '<span class="fire-spinner"></span> Đang xử lý...';
            btn.disabled = true;
        } else {
            btn.innerHTML = btn._originalHTML || btn.innerHTML;
            btn.disabled = false;
        }
    },
    formatDate(dateStr) {
        return new Date(dateStr).toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    },
    showLoader() {
        const el = document.getElementById('page-loader');
        if (el) { el.classList.remove('hidden'); }
    },
    hideLoader() {
        const el = document.getElementById('page-loader');
        if (el) { el.classList.add('hidden'); }
    },
    startTopBar() {
        const bar = document.getElementById('top-loading-bar');
        if (!bar) return;
        bar.style.width = '0%';
        bar.style.opacity = '1';
        bar.classList.remove('done');
        let w = 0;
        bar._iv = setInterval(() => {
            w = Math.min(w + Math.random() * 15, 88);
            bar.style.width = w + '%';
        }, 300);
    },
    endTopBar() {
        const bar = document.getElementById('top-loading-bar');
        if (!bar) return;
        clearInterval(bar._iv);
        bar.style.width = '100%';
        setTimeout(() => bar.classList.add('done'), 300);
    }
};
