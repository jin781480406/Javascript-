// 等HTML元素全部加载完再执行js
window.addEventListener('load', function () {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    // 鼠标经过 轮播按钮出现 暂停定时播放
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 暂停定时器
        clearInterval(timer);
        // 清空变量
        timer = null;
    })
    // 鼠标移出 轮播按钮消失 开始定时器
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 开始定时器
        // 不需要var 再声明一次
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000)
    })
    // 动态创建小圆圈，有多少图片创建多少小圆圈
    // 先获取ul
    var ul = focus.querySelector('ul');
    var circle = document.querySelector('.circle');
    // console.log(ul.children);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var lis = document.createElement('li');
        // 添加节点
        circle.appendChild(lis);
        // 给每个小圆圈添加一个索引号 自定义属性
        circle.children[i].setAttribute('index', i);
        // lis绑定点击事件
        lis.addEventListener('click', function () {
            // 排他思想
            for (var i = 0; i < circle.children.length; i++) {
                // circle.children[i].removeAttribute('current');
                circle.children[i].className = '';
            }
            // 点击哪个就给哪个添加current样式
            this.className = 'current';
            // circle.children[0].setAttribute('current');
            // 获取小圆圈的索引号 自定义属性
            var index = this.getAttribute('index');
            // 应该是变量声明提升
            // 当我们获取索引号后，将index的值赋值给num和circlenum
            num = index;
            circlenum = index;
            console.log(num);
            console.log(circlenum);
            // console.log(index);
            // 获取元素
            var imgli = ul.querySelector('li');
            // console.log(imgli);
            // 点击图片，移动图片，移动的是ul而不是li
            // imgli是图片的大小
            animate(ul, -index * imgli.offsetWidth);
            // focus是整个大盒子的宽度
            // animate(ul,-index*focus.offsetWidth);
        })
    }
    // 默认第一个有current样式
    circle.children[0].className = 'current';
    // 深克隆第一个节点li
    var firstli = ul.children[0].cloneNode(true);
    ul.appendChild(firstli);

    // 点击右按钮 图片向右移动
    // 设置一个变量 控制右键按钮点击后 图片的移动位置
    var num = 0;
    // 设置一个变量 控制右键按钮点击后 小圆圈随之变化
    var circlenum = 0;
    // 节流阀
    // 防止事件未执行完 就再次进行事件
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // alert(1);
            // 如果是最后一张图片，就快速切回第一张
            // 无缝滚动
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });
            circlenum++;
            // 如果是最后一张图片，就切回第一个小圆圈添加current样式
            if (circlenum == circle.children.length) {
                circlenum = 0;
            }
            // 优化代码
            circleChange();
        }

    })

    // 点击右按钮 图片向右移动
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag=false;
            // alert(1);
            // 如果是第一张图片，就快速切回最后一张
            // 无缝滚动
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focus.offsetWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focus.offsetWidth,function(){
                flag=true;
            });
            circlenum--;
            // 如果是第一张图片 就返回最后一个小圆圈添加current样式
            if (circlenum < 0) {
                // 因为现在circlenum是-1了
                circlenum = circle.children.length - 1;
            }
            // 优化代码
            circleChange();
        }

    })

    // 优化代码 相同代码写成一个函数
    function circleChange() {
        // 排他思想
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        // 点击右键按钮 使得小圆圈添加current样式
        circle.children[circlenum].className = 'current';
    }

    // 自动轮播
    // 定时器
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000)
})

