function animate(obj, target, callback) {
    // 排他思想，触发函数时清除定时器
    clearInterval(obj.timer);
    // 利用定时器的效果 一步步的实现效果
    obj.timer = setInterval(function () {
        // 缓动动画效果原理：(目标值-当前位置)/10
        // 小数向上取整
        var step = (target - obj.offsetLeft) / 10;
        // 如果是正数向上取，如果是负数向下取
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质上是停止定时器
            clearInterval(obj.timer);
            // 当清除定时器后 执行回调函数
            // 如果有回调函数就执行
            if (callback) {
                callback();
            }
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}