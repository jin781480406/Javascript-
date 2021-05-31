// 先等页面元素全部加载完毕后再运行js
window.addEventListener('load',function(){
    // 获取元素
    var preview_img=document.querySelector('.preview_img');
    var mask=document.querySelector('.mask');
    var big=document.querySelector('.big');
    var bigimg=big.querySelector('.bigImg');
    // 鼠标经过弹出mask和bigimg
    preview_img.addEventListener('mouseover',function(){
        mask.style.display='block';
        big.style.display='block';
        
    })
    // 鼠标移出隐藏mask和bigimg
    preview_img.addEventListener('mouseout',function(){
        mask.style.display='none';
        big.style.display='none';
    })
    // 鼠标移动mask
    preview_img.addEventListener('mousemove',function(e){
        // 得到mask在盒子内的x，y坐标
        var x=e.pageX-preview_img.offsetLeft;
        var y=e.pageY-preview_img.offsetTop;
        // console.log(x);
        // console.log(y);
        // 把鼠标移动到mask的中心
        var maskX=x-mask.offsetWidth/2;
        var maskY=y-mask.offsetHeight/2;
        // mask最大的移动距离
        var maskXMax=preview_img.offsetWidth-mask.offsetWidth;
        var maskYMax=preview_img.offsetHeight-mask.offsetHeight;
        // 赋值操作
        // 千万别加px,老是忘记加
        // 加边距 卡主mask在盒子内的坐标
        // mask不能超出盒子  
        if(maskX<=0){
            maskX=0;
        }else if(maskX>=maskXMax){
            maskX=maskXMax;
        }
        if(maskY<=0){
            maskY=0;
        }else if(maskY>=maskYMax){
            maskY=maskYMax;
        }
        mask.style.left=maskX+'px';
        mask.style.top=maskY+'px';
        // bigimg也随着mask的移动而移动
        // bigimg移动的距离是根据mask移动的距离成比例的
        // bigimg最大移动的距离
        var bigimgXMax=bigimg.offsetWidth-big.offsetWidth;
        var bigimgYMax=bigimg.offsetHeight-big.offsetHeight;
        // bigimg移动的距离
        var bigimgX=maskX*bigimgXMax/maskXMax;
        var bigimgY=maskY*bigimgYMax/maskYMax;
        // 赋值操作
        bigimg.style.left='-'+bigimgX+'px';
        bigimg.style.top='-'+bigimgY+'px';
    })
})