// 时值 TimeValue 共享导航组件（顶部 TopAppBar + 底部 BottomNavBar）
// 之前这两块在 wage/time/life/learn 四个页面里各抄了一份，细节还悄悄跑偏了
// （比如 wage.html 的顶栏少了 pt-safe 安全区、底栏背景色也和 learn.html 不完全一样）。
// 统一收到这里，改一处、四个页面都生效。
//
// 用法（页面里放两个占位 div，具体位置替换原来的 <header>/<nav>）：
//   <div id="tv-topbar"></div>
//   <div id="tv-bottomnav"></div>
// 然后在页面自己的脚本里调用：
//   TV.nav.renderTopBar({ title: '可选标题，默认"时值 TimeValue"', right: '可选右侧插槽 HTML' });
//   TV.nav.renderBottomNav('wage.html'); // 传当前页面文件名，用于高亮对应 tab
window.TV = window.TV || {};

TV.nav = {
    TABS: [
        { page: 'wage.html', icon: 'payments', label: '今日工资' },
        { page: 'learn.html', icon: 'school', label: '学习涨薪' },
        { page: 'time.html', icon: 'schedule', label: '时间消费' },
        { page: 'life.html', icon: 'auto_awesome', label: '人生剩余' }
    ],

    /** wage.html 专属的右上角悬浮窗按钮（带脉冲提示），其余页面不需要就不传 right 即可 */
    floatButtonHtml: function () {
        return '<button class="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-200 float-btn" onclick="openFloatWindow()" title="悬浮显示今日收入">' +
            '<span class="material-symbols-outlined">picture_in_picture_alt</span>' +
            '<span class="pulse-ring"></span></button>';
    },

    /**
     * 渲染顶部 TopAppBar。
     * opts.title  标题文字，默认 "时值 TimeValue"
     * opts.right  右侧插槽 HTML，默认渲染一个等宽占位（保持标题居中）
     * opts.backTo 左侧菜单按钮跳转目标，默认 settings.html
     */
    renderTopBar: function (opts) {
        opts = opts || {};
        var title = opts.title || '时值 TimeValue';
        var right = opts.right || '<div class="w-10"></div>';
        var backTo = opts.backTo || 'settings.html';
        var el = document.getElementById('tv-topbar');
        if (!el) return;
        el.outerHTML =
            '<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-page h-14 bg-surface-container-lowest pt-safe">' +
                '<button class="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-surface-container transition-colors active:scale-95 duration-200" onclick="window.location.href=\'' + backTo + '\'">' +
                    '<span class="material-symbols-outlined text-primary text-[24px]">menu</span>' +
                '</button>' +
                '<h1 class="font-headline-md text-headline-md-mobile md:text-headline-md font-bold tracking-tight text-primary absolute left-1/2 -translate-x-1/2">' + title + '</h1>' +
                right +
            '</header>';
    },

    /** 渲染底部 BottomNavBar。activePage 传当前页面文件名（如 'wage.html'），用于高亮对应 tab */
    renderBottomNav: function (activePage) {
        var el = document.getElementById('tv-bottomnav');
        if (!el) return;
        var buttons = TV.nav.TABS.map(function (tab) {
            var active = tab.page === activePage;
            return '<button class="flex flex-col items-center justify-center ' +
                (active ? 'text-primary font-bold' : 'text-outline hover:text-primary') +
                ' transition-opacity active:scale-[1.02] duration-300 ease-out w-16" onclick="window.location.href=\'' + tab.page + '\'">' +
                    '<span class="material-symbols-outlined text-[24px] mb-1" style="font-variation-settings:\'FILL\'' + (active ? 1 : 0) + ';">' + tab.icon + '</span>' +
                    '<span class="font-label-sm text-[11px]">' + tab.label + '</span>' +
                '</button>';
        }).join('');
        el.outerHTML =
            '<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-margin-page py-4 pb-safe bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.04)] rounded-t-xl">' +
                buttons +
            '</nav>';
    }
};
