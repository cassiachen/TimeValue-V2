// 时值 TimeValue 新手指引组件 - 自动检测页面，无需手动调用
(function () {
    // 防止重复注入
    if (window.TV && window.TV.onboarding) return;
    if (!window.TV) window.TV = {};

    // 配置：根据页面路径自动匹配
    var GUIDES = {
        wage: {
            key: 'guide_wage_seen',
            icon: '💰',
            title: '今日工资',
            desc: '看看你今天赚了多少',
            cta: '去看看 →',
            target: 'wage.html'
        },
        learn: {
            key: 'guide_learn_seen',
            icon: '📚',
            title: '学习涨薪',
            desc: '学多少，加多少！',
            cta: '去学习 →',
            target: 'learn.html'
        },
        time: {
            key: 'guide_time_seen',
            icon: '💸',
            title: '时间消费',
            desc: '用时间换来的每一笔，都算数',
            cta: '去记账 →',
            target: 'time.html'
        },
        life: {
            key: 'guide_life_seen',
            icon: '🌱',
            title: '人生剩余',
            desc: '你的人生还剩多少格子？',
            cta: '去看看 →',
            target: 'life.html'
        }
    };

    // 根据当前页面路径自动匹配
    function detectPage() {
        var path = window.location.pathname;
        var filename = path.split('/').pop() || 'index.html';
        if (filename === 'wage.html' || filename === '') return 'wage';
        if (filename === 'learn.html') return 'learn';
        if (filename === 'time.html') return 'time';
        if (filename === 'life.html') return 'life';
        return null;
    }

    var pageKey = detectPage();
    if (!pageKey) return;

    var config = GUIDES[pageKey];
    if (!config) return;

    // 检查是否已看过
    var seen = localStorage.getItem(config.key);
    if (seen === 'true') return;

    var STYLE_ID = 'tv-onboarding-style';
    if (!document.getElementById(STYLE_ID)) {
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            '.tv-onboarding-wrapper{position:fixed;bottom:88px;left:12px;right:12px;z-index:9998;',
            'transform:translateY(80px);opacity:0;pointer-events:none;',
            'transition:all 0.5s cubic-bezier(0.16,1,0.3,1);}',
            '.tv-onboarding-wrapper.show{transform:translateY(0);opacity:1;pointer-events:auto;}',
            '.tv-onboarding-card{background:#ffffff;border-radius:16px;',
            'padding:12px 16px;display:flex;align-items:center;gap:14px;',
            'box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.04);',
            'cursor:pointer;position:relative;user-select:none;-webkit-user-select:none;}',
            '.tv-onboarding-card .drag-hint{position:absolute;top:-4px;left:50%;',
            'transform:translateX(-50%);width:36px;height:3px;',
            'background:#e2e2e4;border-radius:999px;opacity:0.4;}',
            '.tv-onboarding-card .icon{font-size:24px;flex-shrink:0;width:36px;text-align:center;}',
            '.tv-onboarding-card .text{flex:1;min-width:0;}',
            '.tv-onboarding-card .text .title{font-family:Inter,system-ui,sans-serif;',
            'font-size:14px;font-weight:600;color:#030304;line-height:1.3;}',
            '.tv-onboarding-card .text .desc{font-family:Inter,system-ui,sans-serif;',
            'font-size:12px;font-weight:400;color:#77767b;line-height:1.3;margin-top:1px;}',
            '.tv-onboarding-card .cta{font-family:Inter,system-ui,sans-serif;',
            'font-size:13px;font-weight:600;color:#4edea3;flex-shrink:0;',
            'padding:4px 0;white-space:nowrap;}',
            '.tv-onboarding-card .close-btn{background:none;border:none;',
            'color:#c7c6ca;font-size:16px;cursor:pointer;padding:4px;flex-shrink:0;',
            'transition:color 0.2s ease;line-height:1;}',
            '.tv-onboarding-card .close-btn:hover{color:#77767b;}',
            '@keyframes slideUp{from{transform:translateY(20px);opacity:0;}',
            'to{transform:translateY(0);opacity:1;}}',
            '.tv-onboarding-card.animate{animation:slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;}',
            '@media (max-width:480px){.tv-onboarding-card{padding:10px 14px;gap:10px;}',
            '.tv-onboarding-card .icon{font-size:20px;width:30px;}',
            '.tv-onboarding-card .text .title{font-size:13px;}',
            '.tv-onboarding-card .text .desc{font-size:11px;}',
            '.tv-onboarding-card .cta{font-size:12px;}}'
        ].join('');
        document.head.appendChild(style);
    }

    // 创建浮条 DOM
    function createCard(config) {
        var wrapper = document.createElement('div');
        wrapper.className = 'tv-onboarding-wrapper';
        wrapper.id = 'tv-onboarding-wrapper';

        wrapper.innerHTML = [
            '<div class="tv-onboarding-card" id="tv-onboarding-card">',
            '  <div class="drag-hint"></div>',
            '  <span class="icon">' + config.icon + '</span>',
            '  <div class="text">',
            '    <div class="title">' + config.title + '</div>',
            '    <div class="desc">' + config.desc + '</div>',
            '  </div>',
            '  <span class="cta">' + config.cta + '</span>',
            '  <button class="close-btn" id="tv-onboarding-close">✕</button>',
            '</div>'
        ].join('');

        document.body.appendChild(wrapper);
        return wrapper;
    }

    // 显示浮条
    function show() {
        var wrapper = createCard(config);
        var card = document.getElementById('tv-onboarding-card');
        var closeBtn = document.getElementById('tv-onboarding-close');

        function markSeen() {
            localStorage.setItem(config.key, 'true');
        }

        function dismiss() {
            wrapper.classList.remove('show');
            setTimeout(function () {
                if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
            }, 500);
        }

        card.addEventListener('click', function (e) {
            if (e.target.closest('.close-btn')) return;
            markSeen();
            dismiss();
            setTimeout(function () {
                window.location.href = config.target;
            }, 300);
        });

        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            markSeen();
            dismiss();
        });

        // 右滑关闭
        var startX = 0,
            startY = 0,
            isDragging = false;
        card.addEventListener('touchstart', function (e) {
            var touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = false;
        }, { passive: true });

        card.addEventListener('touchmove', function (e) {
            var touch = e.touches[0];
            var deltaX = touch.clientX - startX;
            var deltaY = touch.clientY - startY;
            if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
                isDragging = true;
                var progress = Math.min(1, Math.abs(deltaX) / 150);
                var opacity = 1 - progress * 0.7;
                var translate = deltaX;
                card.style.transform = 'translateX(' + translate + 'px)';
                card.style.opacity = opacity;
            }
        }, { passive: true });

        card.addEventListener('touchend', function (e) {
            if (isDragging) {
                var transform = card.style.transform || '';
                var match = transform.match(/translateX\((-?\d+)px\)/);
                if (match && Math.abs(parseInt(match[1])) > 80) {
                    markSeen();
                    dismiss();
                } else {
                    card.style.transform = '';
                    card.style.opacity = '';
                }
            }
            isDragging = false;
        }, { passive: true });

        setTimeout(function () {
            wrapper.classList.add('show');
            if (card) card.classList.add('animate');
        }, 600);

        setTimeout(function () {
            if (wrapper.parentNode) {
                markSeen();
                dismiss();
            }
        }, 12000);
    }

    // 等待 DOM 加载完成后显示
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', show);
    } else {
        show();
    }
})();
