// 时值 TimeValue 新手指引
// 首次打开时显示，一次性介绍四个页面
(function () {
    if (window.TV && TV.onboardingLoaded) return;
    if (!window.TV) window.TV = {};
    window.TV.onboardingLoaded = true;

    var slides = [{
        icon: '💰',
        title: '今日工资',
        desc: '实时查看你今天赚了多少钱，精确到每一秒。\n时薪、分薪、秒薪——你的时间价值一目了然。\n下班后自动结算，每天的收入都清晰记录。'
    }, {
        icon: '📚',
        title: '学习涨薪',
        desc: '学习就是给自己加薪！\n设定学习目标，每学一小时，时薪就涨一点。\n学多少，加多少，让你的时间越来越值钱。'
    }, {
        icon: '💸',
        title: '时间消费',
        desc: '每一次消费，都是一次时间的交换。\n记录你的每一笔支出，看看你用了多少生命去换取它。\n理性消费，从看清时间的代价开始。'
    }, {
        icon: '🌱',
        title: '人生剩余',
        desc: '人生是一张格子图，每一格代表一周。\n你还有多少格子？想在哪里留下标记？\n记录里程碑，写下每日反思，活得更清醒。'
    }];

    var currentIndex = 0;

    // 样式
    var style = document.createElement('style');
    style.textContent = [
        '.tv-onboarding-overlay{position:fixed;top:0;left:0;width:100%;height:100%;',
        'background:#f9f9fb;z-index:9999;display:flex;flex-direction:column;',
        'justify-content:center;align-items:center;padding:40px 32px;',
        'opacity:0;transition:opacity 0.6s ease;}',
        '.tv-onboarding-overlay.show{opacity:1;}',
        '.tv-onboarding-overlay .slide{display:none;flex-direction:column;',
        'align-items:center;text-align:center;max-width:400px;width:100%;}',
        '.tv-onboarding-overlay .slide.active{display:flex;animation:fadeSlide 0.5s ease;}',
        '@keyframes fadeSlide{from{opacity:0;transform:translateY(20px);}',
        'to{opacity:1;transform:translateY(0);}}',
        '.tv-onboarding-overlay .icon{font-size:64px;margin-bottom:20px;}',
        '.tv-onboarding-overlay .title{font-family:Inter,sans-serif;font-size:28px;',
        'font-weight:700;color:#030304;margin-bottom:12px;letter-spacing:-0.01em;}',
        '.tv-onboarding-overlay .desc{font-family:Inter,sans-serif;font-size:16px;',
        'font-weight:400;color:#46464a;line-height:1.7;white-space:pre-line;}',
        '.tv-onboarding-overlay .desc strong{color:#030304;font-weight:600;}',
        '.tv-onboarding-overlay .dots{display:flex;gap:8px;margin-top:32px;}',
        '.tv-onboarding-overlay .dot{width:8px;height:8px;border-radius:999px;',
        'background:#c7c6ca;transition:all 0.3s ease;}',
        '.tv-onboarding-overlay .dot.active{width:24px;background:#4edea3;}',
        '.tv-onboarding-overlay .bottom{display:flex;justify-content:space-between;',
        'align-items:center;width:100%;max-width:400px;margin-top:32px;}',
        '.tv-onboarding-overlay .skip{font-family:Inter,sans-serif;font-size:14px;',
        'font-weight:500;color:#77767b;cursor:pointer;padding:8px 4px;',
        'transition:color 0.2s ease;background:none;border:none;}',
        '.tv-onboarding-overlay .skip:hover{color:#030304;}',
        '.tv-onboarding-overlay .next{font-family:Inter,sans-serif;font-size:15px;',
        'font-weight:600;color:#ffffff;background:#030304;padding:12px 28px;',
        'border-radius:999px;cursor:pointer;transition:all 0.2s ease;',
        'border:none;box-shadow:0 4px 16px rgba(0,0,0,0.06);}',
        '.tv-onboarding-overlay .next:hover{opacity:0.9;}',
        '.tv-onboarding-overlay .next:active{transform:scale(0.97);}',
        '@media (max-width:480px){.tv-onboarding-overlay .icon{font-size:48px;}',
        '.tv-onboarding-overlay .title{font-size:24px;}',
        '.tv-onboarding-overlay .desc{font-size:15px;}}'
    ].join('');
    document.head.appendChild(style);

    // DOM
    var overlay = document.createElement('div');
    overlay.className = 'tv-onboarding-overlay';
    overlay.innerHTML = [
        '<div class="slide active" data-index="0">',
        '  <div class="icon">💰</div>',
        '  <div class="title">今日工资</div>',
        '  <div class="desc">实时查看你今天赚了多少钱，精确到每一秒。\n时薪、分薪、秒薪——你的时间价值一目了然。\n下班后自动结算，每天的收入都清晰记录。</div>',
        '</div>',
        '<div class="slide" data-index="1">',
        '  <div class="icon">📚</div>',
        '  <div class="title">学习涨薪</div>',
        '  <div class="desc">学习就是给自己加薪！\n设定学习目标，每学一小时，时薪就涨一点。\n学多少，加多少，让你的时间越来越值钱。</div>',
        '</div>',
        '<div class="slide" data-index="2">',
        '  <div class="icon">💸</div>',
        '  <div class="title">时间消费</div>',
        '  <div class="desc">每一次消费，都是一次时间的交换。\n记录你的每一笔支出，看看你用了多少生命去换取它。\n理性消费，从看清时间的代价开始。</div>',
        '</div>',
        '<div class="slide" data-index="3">',
        '  <div class="icon">🌱</div>',
        '  <div class="title">人生剩余</div>',
        '  <div class="desc">人生是一张格子图，每一格代表一周。\n你还有多少格子？想在哪里留下标记？\n记录里程碑，写下每日反思，活得更清醒。</div>',
        '</div>',
        '<div class="dots" id="tv-dots"></div>',
        '<div class="bottom">',
        '  <button class="skip" id="tv-skip">跳过</button>',
        '  <button class="next" id="tv-next">下一步</button>',
        '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var slidesEls = overlay.querySelectorAll('.slide');
    var dotsEl = document.getElementById('tv-dots');
    var skipBtn = document.getElementById('tv-skip');
    var nextBtn = document.getElementById('tv-next');

    // 创建圆点
    for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dotsEl.appendChild(dot);
    }
    var dots = dotsEl.querySelectorAll('.dot');

    function goTo(index) {
        if (index < 0 || index >= slides.length) return;
        slidesEls.forEach(function(el, i) {
            el.classList.toggle('active', i === index);
        });
        dots.forEach(function(el, i) {
            el.classList.toggle('active', i === index);
        });
        currentIndex = index;
        nextBtn.textContent = index === slides.length - 1 ? '开始使用' : '下一步';
        // 重新触发动画
        var activeSlide = slidesEls[index];
        activeSlide.style.animation = 'none';
        setTimeout(function() {
            activeSlide.style.animation = '';
        }, 10);
    }

    function next() {
        if (currentIndex === slides.length - 1) {
            dismiss();
        } else {
            goTo(currentIndex + 1);
        }
    }

    function dismiss() {
        localStorage.setItem('guide_seen', 'true');
        overlay.classList.remove('show');
        setTimeout(function() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 600);
    }

    // 事件
    nextBtn.addEventListener('click', next);

    skipBtn.addEventListener('click', function() {
        dismiss();
    });

    // 点击圆点跳转
    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            goTo(parseInt(this.dataset.index));
        });
    });

    // 键盘左右键切换
    document.addEventListener('keydown', function(e) {
        if (!overlay.parentNode) return;
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex === slides.length - 1) {
                dismiss();
            } else {
                goTo(currentIndex + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex > 0) goTo(currentIndex - 1);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            dismiss();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            next();
        }
    });

    // 触摸滑动
    var touchStartX = 0;
    var touchEndX = 0;
    var isSwiping = false;

    overlay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = false;
    }, { passive: true });

    overlay.addEventListener('touchmove', function(e) {
        var deltaX = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(deltaX) > 10) isSwiping = true;
    }, { passive: true });

    overlay.addEventListener('touchend', function(e) {
        if (!isSwiping) {
            // 如果只是点击而非滑动，不处理
            return;
        }
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                // 左滑 → 下一页
                if (currentIndex === slides.length - 1) {
                    dismiss();
                } else {
                    goTo(currentIndex + 1);
                }
            } else {
                // 右滑 → 上一页
                if (currentIndex > 0) goTo(currentIndex - 1);
            }
        }
    }, { passive: true });

    // 显示
    setTimeout(function() {
        overlay.classList.add('show');
    }, 400);
})();
