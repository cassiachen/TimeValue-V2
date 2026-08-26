// 时值 TimeValue 共享数据存取层
// 统一封装 localStorage 的读写，避免每个页面各写一遍 try/catch 和 JSON.parse。
// 用法：TV.storage.get('timeValueData', {})   TV.storage.set('timeValueData', data)
window.TV = window.TV || {};

TV.storage = {
    /**
     * 读取数据。自动尝试 JSON.parse，失败则返回原始字符串（兼容历史上直接存字符串的数据）。
     * 读取失败（比如 localStorage 被禁用、隐私模式等）时返回 defaultValue，不会抛出异常。
     */
    get: function (key, defaultValue) {
        try {
            var raw = localStorage.getItem(key);
            if (raw === null || raw === undefined) return defaultValue;
            try {
                return JSON.parse(raw);
            } catch (parseErr) {
                return raw; // 不是 JSON，原样返回
            }
        } catch (e) {
            console.warn('[TV.storage.get] 读取失败：' + key, e);
            return defaultValue;
        }
    },

    /**
     * 写入数据。对象/数组会自动 JSON.stringify，字符串原样存储。
     * 返回 true/false 表示是否写入成功（比如超出配额时会返回 false，而不是让页面报错崩溃）。
     */
    set: function (key, value) {
        try {
            var raw = (typeof value === 'string') ? value : JSON.stringify(value);
            localStorage.setItem(key, raw);
            return true;
        } catch (e) {
            console.warn('[TV.storage.set] 写入失败：' + key, e);
            return false;
        }
    },

    remove: function (key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('[TV.storage.remove] 删除失败：' + key, e);
            return false;
        }
    },

    /** 读取 localStorage 中的全部数据（用于设置页的备份/导出功能） */
    getAll: function () {
        var data = {};
        try {
            var allKeys = Object.keys(localStorage);
            allKeys.forEach(function (key) {
                data[key] = TV.storage.get(key, null);
            });
        } catch (e) {
            console.warn('[TV.storage.getAll] 读取失败', e);
        }
        return data;
    }
};
