// 时值 TimeValue 共享的"今天"相关工具
// 统一日期 key 的生成方式，以及"今日三餐"这笔手动记的固定支出的读写。
// wage.html（今日已花卡片）和 time.html（三餐按钮 + 净值时薪）都要用到。
window.TV = window.TV || {};

TV.daily = {
    /** 今天的日期 key，格式 YYYY-MM-DD */
    todayKey: function () {
        return TV.daily.keyFromDate(new Date());
    },

    /** 给定时间戳对应的日期 key */
    keyFromTimestamp: function (ts) {
        return TV.daily.keyFromDate(new Date(ts));
    },

    keyFromDate: function (d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    },

    /** 读取某一天（默认今天）手动填的三餐总花费，没填过则返回 0 */
    getMeal: function (dateKey) {
        var meals = TV.storage.get('dailyMeals', {}) || {};
        return meals[dateKey || TV.daily.todayKey()] || 0;
    },

    /** 某一天（默认今天）是否已经记录过三餐（哪怕填的是 0），用来决定按钮要不要隐藏 */
    hasMeal: function (dateKey) {
        var meals = TV.storage.get('dailyMeals', {}) || {};
        return Object.prototype.hasOwnProperty.call(meals, dateKey || TV.daily.todayKey());
    },

    /** 保存某一天（默认今天）的三餐总花费 */
    setMeal: function (amount, dateKey) {
        var meals = TV.storage.get('dailyMeals', {}) || {};
        meals[dateKey || TV.daily.todayKey()] = amount;
        TV.storage.set('dailyMeals', meals);
    },

    /** 清除某一天（默认今天）的三餐记录，清除后「今天三餐吃了多少钱」按钮会重新出现 */
    clearMeal: function (dateKey) {
        var meals = TV.storage.get('dailyMeals', {}) || {};
        delete meals[dateKey || TV.daily.todayKey()];
        TV.storage.set('dailyMeals', meals);
    }
};
