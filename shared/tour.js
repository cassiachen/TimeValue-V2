// 时值 TimeValue 聚焦导览
// 页面暗下来，高亮目标区域，旁边显示文字说明
(function () {
    if (window.TV && TV.tourLoaded) return;
    if (!window.TV) window.TV = {};
    window.TV.tourLoaded = true;

    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'wage.html';

    // 配置
    var steps = [{
        page: 'wage.html',
        icon: '💰',
        title: '今日工资',
        desc: '这里实时显示你今天已经赚了多少钱\n每一秒都在更新，让你看见时间的价值',
        tabIndex: 0
    }, {
        page: 'learn.html',
        icon: '📚',
        title: '学习涨薪',
        desc: '设定学习目标，每学一小时，时薪就涨一点\n学多少，加多少，让自己越来越值钱',
        tabIndex: 1
    }, {
        page: 'time.html',
        icon: '💸',
        title: '时间消费',
        desc: '记录每一笔支出，看看你用了多少生命去换它\n理性消费，从看清时间的代价开始',
        tabIndex: 2
    }, {
        page: 'life.html',
        icon: '🌱',
        title: '人生剩余',
        desc: '每一格代表一周，你的人生还剩多少格？\n标记里程碑，写下反思，活得更清醒',
        tabIndex: 3
    }];

    var currentStep = -1;
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].page === filename) {
            currentStep = i;
            break;
        }
    }

    // 不在导览范围内（如 index.html、settings.html），不显示
    if (currentStep === -1) return;
    if (localStorage.getItem('tour_seen')) return;

    var step = steps[currentStep];

    // 样式
    var STYLE_ID = 'tv-tour-style';
    if (!document.getElementById(STYLE_ID)) {
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            '.tv-tour-overlay{position:fixed;top:0;left:0;width:100%;height:100%;',
            'background:rgba(0,0,0,0.65);z-index:9998;pointer-events:auto;}',

            '.tv-tour-highlight{position:fixed;z-index:9999;border-radius:16px;',
            'box-shadow:0 0 0 4px #4edea3,0 0 0 9999px rgba(0,0,0,0.65);',
            'transition:all 0.5s cubic-bezier(0.16,1,0.3,1);pointer-events:none;}',

            '.tv-tour-bubble{position:fixed;z-index:10000;background:#ffffff;',
            'border-radius:20px;padding:20px 24px;max-width:340px;',
            'box-shadow:0 12px 48px rgba(0,0,0,0.2);',
            'transition:all 0.5s cubic-bezier(0.16,1,0.3,1);',
            'pointer-events:auto;display:flex;flex-direction:column;}',

            '.tv-tour-bubble .icon{font-size:32px;margin-bottom:6px;}',
            '.tv-tour-bubble .title{font-family:Inter,sans-serif;font-size:18px;',
            'font-weight:700;color:#030304;letter-spacing:-0.01em;}',
            '.tv-tour-bubble .desc{font-family:Inter,sans-serif;font-size:14px;',
            'font-weight:400;color:#46464a;line-height:1.6;margin-top:4px;}',
            '.tv-tour-bubble .desc br{display:block;content:"";margin-top:4px;}',

            '.tv-tour-bubble .bottom{display:flex;justify-content:space-between;',
            'align-items:center;margin-top:16px;padding-top:14px;',
            'border-top:1px solid #f0f0f2;}',
            '.tv-tour-bubble .step{font-family:Inter,sans-serif;font-size:12px;',
            'color:#77767b;}',
            '.tv-tour-bubble .actions{display:flex;gap:10px;}',
            '.tv-tour-bubble .actions button{font-family:Inter,sans-serif;',
            'font-size:14px;font-weight:500;padding:8px 20px;border-radius:999px;',
            'border:none;cursor:pointer;transition:all 0.2s ease;}',
            '.tv-tour-bubble .actions .skip-btn{background:#f3f3f5;color:#77767b;}',
            '.tv-tour-bubble .actions .skip-btn:hover{background:#e8e8ea;}',
            '.tv-tour-bubble .actions .next-btn{background:#030304;color:#ffffff;',
            'box-shadow:0 2px 12px rgba(0,0,0,0.06);}',
            '.tv-tour-bubble .actions .next-btn:hover{opacity:0.9;}',
            '.tv-tour-bubble .actions .next-btn:active{transform:scale(0.97);}',

            '.tv-tour-bubble .arrow{position:absolute;width:14px;height:14px;',
            'background:#ffffff;transform:rotate(45deg);}',
            '.tv-tour-bubble .arrow.top{bottom:-7px;left:50%;margin-left:-7px;',
            'box-shadow:3px 3px 8px rgba(0,0,0,0.04);}',
            '.tv-tour-bubble .arrow.bottom{top:-7px;left:50%;margin-left:-7px;',
            'box-shadow:-3px -3px 8px rgba(0,0,0,0.04);}',

            '@media (max-width:480px){.tv-tour-bubble{max-width:calc(100vw - 32px);',
            'padding:16px 18px;}',
            '.tv-tour-bubble .title{font-size:16px;}',
            '.tv-tour-bubble .desc{font-size:13px;}',
            '.tv-tour-bubble .icon{font-size:28px;}}'
        ].join('');
        document.head.appendChild(style);
    }

    // 等待底部导航出现
    function waitForNav(callback, attempts) {
        attempts = attempts || 0;
        var nav = document.querySelector('.rounded-t-xl, .fixed\\.bottom-0, .bottom-0');
        if (nav) {
            callback(nav);
            return;
        }
        if (attempts > 20) return;
        setTimeout(function() {
            waitForNav(callback, attempts + 1);
        }, 200);
    }

    waitForNav(function(nav) {
        var targetEl = nav.querySelectorAll('button')[step.tabIndex];
        if (!targetEl) return;

        var rect = targetEl.getBoundingClientRect();
        var highlightTop = rect.top - 12;
        var highlightLeft = rect.left - 12;
        var highlightWidth = rect.width + 24;
        var highlightHeight = rect.height + 24;

        // 遮罩
        var overlay = document.createElement('div');
        overlay.className = 'tv-tour-overlay';
        overlay.id = 'tv-tour-overlay';
        document.body.appendChild(overlay);

        // 高亮框
        var highlight = document.createElement('div');
        highlight.className = 'tv-tour-highlight';
        highlight.id = 'tv-tour-highlight';
        highlight.style.top = highlightTop + 'px';
        highlight.style.left = highlightLeft + 'px';
        highlight.style.width = highlightWidth + 'px';
        highlight.style.height = highlightHeight + 'px';
        document.body.appendChild(highlight);

        // 气泡
        var bubble = document.createElement('div');
        bubble.className = 'tv-tour-bubble';
        bubble.id = 'tv-tour-bubble';

        // 计算气泡位置
        var isAbove = rect.top > 200;
        var bubbleTop, bubbleLeft, arrowClass;

        if (isAbove) {
            bubbleTop = rect.top - 20 - 160;
            arrowClass = 'bottom';
        } else {
            bubbleTop = rect.bottom + 20;
            arrowClass = 'top';
        }

        bubbleLeft = rect.left + rect.width / 2 - 160;
        if (bubbleLeft < 16) bubbleLeft = 16;
        if (bubbleLeft + 320 > window.innerWidth - 16) {
            bubbleLeft = window.innerWidth - 336;
        }

        bubble.style.top = bubbleTop + 'px';
        bubble.style.left = bubbleLeft + 'px';

        var isLast = currentStep === steps.length - 1;

        bubble.innerHTML = [
            '<div class="arrow ' + arrowClass + '"></div>',
            '<div class="icon">' + step.icon + '</div>',
            '<div class="title">' + step.title + '</div>',
            '<div class="desc">' + step.desc.replace(/\n/g, '<br>') + '</div>',
            '<div class="bottom">',
            '  <span class="step">' + (currentStep + 1) + ' / ' + steps.length + '</span>',
            '  <div class="actions">',
            '    <button class="skip-btn" id="tv-tour-skip">跳过</button>',
            '    <button class="next-btn" id="tv-tour-next">' + (isLast ? '开始使用' : '下一步') + '</button>',
            '  </div>',
            '</div>'
        ].join('');
        document.body.appendChild(bubble);

        // 点击遮罩 -> 跳过
        overlay.addEventListener('click', function() {
            finishTour();
        });

        // 下一步
        document.getElementById('tv-tour-next').addEventListener('click', function() {
            if (isLast) {
                finishTour();
            } else {
                var nextStep = steps[currentStep + 1];
                localStorage.setItem('tour_next_page', nextStep.page);
                finishTour();
                setTimeout(function() {
                    window.location.href = nextStep.page;
                }, 350);
            }
        });

        // 跳过
        document.getElementById('tv-tour-skip').addEventListener('click', function() {
            finishTour();
        });

        // 键盘：左右键切换 / ESC跳过
        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('tv-tour-overlay')) return;
            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('tv-tour-next').click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                finishTour();
            }
        });

        function finishTour() {
            localStorage.setItem('tour_seen', 'true');
            var el = document.getElementById('tv-tour-overlay');
            if (el) el.remove();
            el = document.getElementById('tv-tour-highlight');
            if (el) el.remove();
            el = document.getElementById('tv-tour-bubble');
            if (el) el.remove();
        }

        // 如果是从另一个页面跳转过来的，清除标记
        var nextPage = localStorage.getItem('tour_next_page');
        if (nextPage && nextPage === filename) {
            localStorage.removeItem('tour_next_page');
        }
    });
})();
