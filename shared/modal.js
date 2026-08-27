// 时值 TimeValue 通用弹窗组件 (alert / confirm / prompt)
(function () {
    // 防止重复注入
    if (window.TV && window.TV.modal) return;
    if (!window.TV) window.TV = {};

    // 等待 DOM 加载完成后再操作
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        var STYLE_ID = 'tv-modal-style';
        if (!document.getElementById(STYLE_ID)) {
            var style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = [
                '.tv-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;',
                'background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);',
                'z-index:9999;display:flex;align-items:center;justify-content:center;',
                'opacity:0;pointer-events:none;transition:opacity 0.3s ease;}',
                '.tv-modal-overlay.show{opacity:1;pointer-events:auto;}',
                '.tv-modal-box{background:#ffffff;border-radius:24px;padding:28px 24px 24px;',
                'max-width:380px;width:90%;transform:scale(0.92);',
                'transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);',
                'box-shadow:0 20px 60px rgba(0,0,0,0.15);max-height:90vh;overflow-y:auto;}',
                '.tv-modal-overlay.show .tv-modal-box{transform:scale(1);}',
                '.tv-modal-title{font-family:Inter,system-ui,-apple-system,sans-serif;',
                'font-size:20px;font-weight:600;color:#030304;text-align:center;',
                'letter-spacing:-0.01em;margin-bottom:8px;}',
                '.tv-modal-message{font-family:Inter,system-ui,-apple-system,sans-serif;',
                'font-size:15px;font-weight:400;color:#46464a;text-align:center;',
                'line-height:1.6;margin-bottom:0;}',
                '.tv-modal-input{display:none;width:100%;background:#f3f3f5;border:0;',
                'border-radius:12px;padding:12px 16px;margin-top:16px;',
                'font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;',
                'color:#030304;outline:none;transition:border-color 0.3s ease;}',
                '.tv-modal-input:focus{box-shadow:0 0 0 2px #4edea3;}',
                '.tv-modal-buttons{display:flex;gap:12px;margin-top:20px;}',
                '.tv-modal-buttons.center{justify-content:center;}',
                '.tv-modal-cancel{flex:1;height:44px;background:rgba(3,3,4,0.06);',
                'color:#030304;border:0;border-radius:12px;',
                'font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;',
                'font-weight:500;cursor:pointer;transition:all 0.2s ease;}',
                '.tv-modal-cancel:hover{background:rgba(3,3,4,0.10);}',
                '.tv-modal-cancel:active{transform:scale(0.98);}',
                '.tv-modal-confirm{flex:1;height:44px;background:#030304;',
                'color:#ffffff;border:0;border-radius:12px;',
                'font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;',
                'font-weight:500;cursor:pointer;transition:all 0.2s ease;',
                'box-shadow:0 4px 16px rgba(0,0,0,0.06);}',
                '.tv-modal-confirm:hover{opacity:0.9;}',
                '.tv-modal-confirm:active{transform:scale(0.98);}',
                '.tv-modal-confirm.alone{flex:0 0 auto;padding:0 40px;}',
                '@media (max-width:480px){.tv-modal-box{padding:24px 20px 24px;}}'
            ].join('');
            document.head.appendChild(style);
        }

        // 创建 DOM 节点
        var overlay = document.createElement('div');
        overlay.className = 'tv-modal-overlay';
        overlay.id = 'tv-modal-overlay';
        overlay.innerHTML = [
            '<div class="tv-modal-box">',
            '  <div class="tv-modal-title" id="tv-modal-title">提示</div>',
            '  <div class="tv-modal-message" id="tv-modal-message"></div>',
            '  <input class="tv-modal-input" id="tv-modal-input" type="text" placeholder="" />',
            '  <div class="tv-modal-buttons" id="tv-modal-buttons">',
            '    <button class="tv-modal-cancel" id="tv-modal-cancel">取消</button>',
            '    <button class="tv-modal-confirm" id="tv-modal-confirm">确定</button>',
            '  </div>',
            '</div>'
        ].join('');
        document.body.appendChild(overlay);

        var titleEl = document.getElementById('tv-modal-title');
        var messageEl = document.getElementById('tv-modal-message');
        var inputEl = document.getElementById('tv-modal-input');
        var buttonsEl = document.getElementById('tv-modal-buttons');
        var cancelBtn = document.getElementById('tv-modal-cancel');
        var confirmBtn = document.getElementById('tv-modal-confirm');

        var modalResolve = null;
        var modalType = 'alert';

        function closeModal(value) {
            overlay.classList.remove('show');
            if (modalResolve) {
                var resolveCopy = modalResolve;
                modalResolve = null;
                resolveCopy(value);
            }
        }

        cancelBtn.addEventListener('click', function () {
            if (modalType === 'prompt') {
                closeModal(null);
            } else {
                closeModal(false);
            }
        });

        confirmBtn.addEventListener('click', function () {
            if (modalType === 'prompt') {
                var val = inputEl.value.trim();
                closeModal(val || null);
            } else if (modalType === 'confirm') {
                closeModal(true);
            } else {
                closeModal(undefined);
            }
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === this && modalType === 'alert') {
                closeModal(undefined);
            }
        });

        document.addEventListener('keydown', function (e) {
            if (!overlay.classList.contains('show')) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                confirmBtn.click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelBtn.click();
            }
        });

        window.showAlert = function (title, message) {
            return new Promise(function (resolve) {
                modalType = 'alert';
                titleEl.textContent = title || '提示';
                messageEl.textContent = message || '';
                inputEl.style.display = 'none';
                inputEl.value = '';
                cancelBtn.style.display = 'none';
                confirmBtn.textContent = '确定';
                confirmBtn.className = 'tv-modal-confirm alone';
                buttonsEl.className = 'tv-modal-buttons center';
                modalResolve = resolve;
                overlay.classList.add('show');
                setTimeout(function () { confirmBtn.focus(); }, 300);
            });
        };

        window.showConfirm = function (title, message) {
            return new Promise(function (resolve) {
                modalType = 'confirm';
                titleEl.textContent = title || '确认';
                messageEl.textContent = message || '';
                inputEl.style.display = 'none';
                inputEl.value = '';
                cancelBtn.style.display = 'block';
                confirmBtn.textContent = '确定';
                cancelBtn.className = 'tv-modal-cancel';
                confirmBtn.className = 'tv-modal-confirm';
                buttonsEl.className = 'tv-modal-buttons';
                modalResolve = resolve;
                overlay.classList.add('show');
                setTimeout(function () { confirmBtn.focus(); }, 300);
            });
        };

        window.showPrompt = function (title, message, placeholder) {
            return new Promise(function (resolve) {
                modalType = 'prompt';
                titleEl.textContent = title || '请输入';
                messageEl.textContent = message || '';
                inputEl.style.display = 'block';
                inputEl.value = '';
                inputEl.placeholder = placeholder || '';
                cancelBtn.style.display = 'block';
                confirmBtn.textContent = '确定';
                cancelBtn.className = 'tv-modal-cancel';
                confirmBtn.className = 'tv-modal-confirm';
                buttonsEl.className = 'tv-modal-buttons';
                modalResolve = resolve;
                overlay.classList.add('show');
                setTimeout(function () { inputEl.focus();
                    inputEl.select(); }, 350);
            });
        };

        window.TV.modal = {
            alert: window.showAlert,
            confirm: window.showConfirm,
            prompt: window.showPrompt
        };
    }
})();
     
