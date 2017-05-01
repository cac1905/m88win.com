/*!
 * jQuery ClassyLoader
 * vox.SPACE
 * Licensed under the MIT license https://vox.SPACE/LICENSE-MIT
 * Version 1.2.1
 *
 */
 
/*js获取网页高度

网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth (包括边线的宽)
网页可见区域高： document.body.offsetHeight (包括边线的高)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
网页正文部分上： window.screenTop
网页正文部分左： window.screenLeft
屏幕分辨率的高： window.screen.height
屏幕分辨率的宽： window.screen.width
屏幕可用工作区高度： window.screen.availHeight
屏幕可用工作区宽度： window.screen.availWidth
*/
(function(d) {
		var coefficient=document.body.offsetWidth/1920;
    d.fn.ClassyLoader = function(a) {
        a = d.extend({}, {
            width: 300*coefficient,
            height: 300*coefficient,
            animate: !0,
            displayOnLoad: !0,
            percentage: 25,
            speed: 1,
            roundedLine: !1,
            showRemaining: !0,
            fontFamily: "AvantGarde LT ExtraLight",
            fontSize: 70*coefficient,//+"px"
            showText: !0,
            diameter: 100*coefficient, //直径
            fontColor: "rgba(255, 255, 255, 1)",
            lineColor: "rgba(187, 211, 216, 1)",
            remainingLineColor: "rgba(0, 0, 0, 0)",
            lineWidth: 5,
            start: "left"
        }, a);
        var e = d(this);
        this.draw = function(b) {
            "undefined" !== typeof b && (a.percentage = b);
            var c = e[0].getContext("2d"),
                h = e.width() / 2,
                d = e.height() / 2,
                f = 0,
                g = 0;
            c.scale(1, 1);
            c.lineWidth = a.lineWidth*coefficient;
            c.strokeStyle = a.lineColour;
			//alert(h+'; '+d);
				//alert(document.body.offsetWidth+'; '+document.body.offsetHeight );
            setTimeout(function k() {
                var b = Math.PI / 180 * 300 / 24 * (f + 1),
                    b = b || Math.PI / 180 * 360 / 24 * (f + 1);
                c.clearRect(0, 0, e.width(), e.height());
                !0 === a.showRemaining && (c.beginPath(), c.strokeStyle = a.remainingLineColor, c.arc(h, d, a.diameter, 0, 360), c.stroke(), c.closePath());
                c.strokeStyle = a.lineColor;
                c.beginPath();
                c.lineCap = !0 === a.roundedLine ? "round" : "butt";
                switch (a.start) {
                case "top":
                    g = 1.5 * Math.PI;
                    break;
                case "bottom":
                    g = .5 * Math.PI;
                    break;
                case "right":
                    g = 1 * Math.PI;
                    break;
                default:
                    g = 0
                }
                c.arc(h, d, a.diameter, g, (b + g));
                c.stroke();
                c.closePath();			
				
				
                var d1 = e.height() / 2;
				a.fontColor="rgba(255, 255, 255, 1)",
				//a.fontSize="70px";
				//alert(a.fontSize);
                !0 === a.showText && (c.fillStyle = a.fontColor, c.font = a.fontSize + " " + a.fontFamily,c.textAlign = "center", c.textBaseline = "middle", c.fillText( + f , h, d1));
				
				
				if(f == a.percentage-1)
				{
					var d2 = e.height() / 1.3;
					
					//画圆 start
					a.fontColor="rgba(187, 211, 216, 1)";
					c.fillStyle=a.fontColor;//颜色
					c.beginPath(); //从新画
					c.arc( e.width()/1.35,(d2-18*coefficient),40*coefficient,0,Math.PI*2,true); //圆心x坐标|圆心y坐标|直径|始|PI为圆周率，Math.PI*2为画圆|true为时针方向：逆时针，0为顺时针，
					c.closePath(); //结束
					c.fill();				
					//画圆 end
					/*
					moveTo(x,y)：moveTo方法并不能画出任何东西，它只是将画笔的当前点移动到(x,y)处
					lineTo(x,y)：从当前点到（x,y）点绘制一条直线。注意：绘制完成后，当前点就变成了(x,y)，除非你用 moveTo 方法去改变他
					arc(x, y, radius, startAngle, endAngle, anticlockwise) ：绘制一条弧线
					quadraticCurveTo(cp1x, cp1y, x, y)
					bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) ：这两个方法都是绘制贝叶斯曲线，具体用法看参考手册
					rect(x, y, width, height) ：绘制一个矩形。注意： 当它被调用时，moveTo 方法会自动被调用，参数为(0,0)，于是起始坐标又恢复成初始原点了。 
					*/			
						
					//箭头 start
					c.fillStyle=a.fontColor;//颜色
						c.beginPath();
						c.moveTo(190*coefficient,90*coefficient);
						c.lineTo(230*coefficient,85*coefficient);
						c.lineTo(225*coefficient,50*coefficient);
						c.lineTo(217*coefficient,77*coefficient);
						//c.lineTo(190,90);
						c.closePath(); //结束						
						c.fill();				
					//箭头 end
					
					a.fontColor="rgba(61, 126, 179, 1)";	//61 126 179			
					//a.fontSize="40px";
					!0 === a.showText && (c.fillStyle = a.fontColor, c.font = 65*coefficient+"px" + " " + a.fontFamily,c.textAlign = "left", c.textBaseline = "middle", c.fillText( "7"  , h+55*coefficient, d2-15*coefficient));
				}				
				

                f += 1;
                f < a.percentage && setTimeout(k, a.speed)
            }, a.speed);
				
        };
        this.setPercent = function(b) {
            a.percentage = b;
            return this
        };
        this.getPercent = function() {
            return a.percentage
        };
        this.show = function() {
            var b = e[0].getContext("2d"),
                c = e.width() / 2,
                d = e.height() / 2;
            b.scale(1, 1);
            b.lineWidth = a.lineWidth;
            b.strokeStyle = a.lineColour;
            b.clearRect(0, 0, e.width(), e.height());
            b.strokeStyle = a.lineColor;
            b.beginPath();
            b.arc(c, d, a.diameter, 0, Math.PI / 180 * (a.percentage / 25) * 360);
            b.stroke();
            b.closePath();
            !0 === a.showText && (b.fillStyle = a.fontColor, b.font = a.fontSize*coefficient + " " + a.font, b.textAlign = "center", b.textBaseline = "middle", b.fillText(a.percentage, c, d));
            !0 === a.showRemaining && (b.beginPath(), b.strokeStyle = a.remainingLineColor, b.arc(c, d, a.diameter, 0, 360), b.stroke(), b.closePath())
        };
        this.__constructor = function() {
            d(this).attr("width", a.width);
            d(this).attr("height", a.height);
            !0 === a.displayOnLoad && (!0 === a.animate ? this.draw() : this.show());
            return this
        };
		
        return this.__constructor();
    }
})(jQuery);