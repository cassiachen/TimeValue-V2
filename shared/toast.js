// 时值 TimeValue 共享 Toast 提示组件
// 自包含样式和 DOM 节点，页面只需引入本文件即可调用 showToast('提示文字', 'success' | 'error' | '')
(function () {
    var STYLE_ID = 'tv-toast-style';
    if (!document.getElementById(STYLE_ID)) {
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            '.tv-toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);',
            'background:#1a1c1d;color:#f9f9fb;padding:10px 24px;border-radius:12px;font-size:14px;',
            'box-shadow:0 8px 30px rgba(0,0,0,0.2);opacity:0;pointer-events:none;',
            'transition:all 0.4s cubic-bezier(0.16,1,0.3,1);z-index:300;white-space:nowrap;}',
            '.tv-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}',
            '.tv-toast.success{background:#005236;color:#ffffff;}',
            '.tv-toast.error{background:#ba1a1a;color:#ffffff;}'
        ].join('');
        document.head.appendChild(style);
    }

    function ensureEl() {
        var el = document.getElementById('tv-toast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'tv-toast';
            el.className = 'tv-toast';
            document.body.appendChild(el);
        }
        return el;
    }

    var timer = null;

    // 挂到 window 上，和各页面原有的 showToast(msg, type) 调用方式保持一致，无需改调用代码
    window.showToast = function (msg, type) {
        var el = ensureEl();
        if (timer) clearTimeout(timer);
        el.textContent = msg;
        el.className = 'tv-toast ' + (type || '') + ' show';
        timer = setTimeout(function () {
            el.classList.remove('show');
        }, 3000);
    };
})();
