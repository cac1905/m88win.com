;
define("app/scale", function(t, i, e) {
	var s = $("html"),
		n = $(window),
		h = {
			scale: function() {
				var t = n.height() / 1080,
					i = Math.min(1, t),
					e = t;
				this.$el.css("font-size", Math.max(this.minFontSize, 32 * i)), s.css("font-size", Math.max(this.minFontSize, 32 * e)), s.hasClass("lte8") && this.$el.find("#container").height(this.$el.height())
			},
			events: function() {
				n.on("resize", _.throttle(_.bind(this.scale, this), 100))
			},
			init: function(t) {
				this.$el = $("body"), this.minFontSize = t || 12, this.scale(), this.events()
			}
		};
	e.exports = h
});
define("app/main", function(e) {
	var i = e("app/scale"),
		t = e("app/widgets/slipblock"),
		n = e("app/widgets/sound"),
		a = e("package/info"),
		s = e("package/url"),
		o = Modernizr.cssanimations;
		i.init(18), t("#nav").start(), $.when(a.get(), s.get()).done(function(e, i) {
	});
	var r = function() {
			var e = $(".scene");
			return o || e.css("top", "100%").eq(0).css("top", 0), {
				to: function(i, t) {
					o || (e.finish(), e.eq(i).animate({
						top: "100%"
					}, 0).end().eq(t).animate({
						top: 0
					}, 0))
				}
			}
		}(),
		u = {
			scenes: $(".scene"),
			index: 0,
			slidebar: $("#slidebar li"),
			lockTime: 1e3,
			running: !1,
			KEY: {
				UP: 38,
				DOWN: 40,
				ENTER: 13
			},
			playTimer: "",
			auto: {
				timer: 0,
				gap: 1e4
			},
			UIChange: function(e) {
				var i = "#scene-" + (e + 1),
					t = $(i),
					n = this.slidebar.eq(e),
					a = "scene-state-in",
					s = "slidebar-active";
					
					var $el = $( '#baraja-el' ),
						baraja = $el.baraja();
				this.scenes.removeClass(a), t.addClass(a), this.slidebar.removeClass(s), n.addClass(s), r.to(this.index, e), this.index = e;

				 //7 x 24
				if(e==1){
					$('.loader').ClassyLoader({
			            percentage: 25,
			            speed: 20,
			            fontSize: '3.5em',
			            fontFamily: 'AvantGarde LT ExtraLight',
			            fontColor: "rgba(255, 255, 255, 1)",
			            lineColor: 'rgba(193,215,219,1)',
			            lineWidth: 10,
			            remainingLineColor: 'rgba(0,0,0,0)'
			        });					
				}
				else{
					$(".scene-content").off("mouseenter");			
				}
				if(e==2)
				{
					/*洗牌特效*/
					//var $el = $( '#baraja-el' ),
						//baraja = $el.baraja();
					$( '.baraja-demo' ).on('click', function( event ) {
						/*baraja.fan( {
							speed : 1000,
							easing : 'ease-in-out',
							range :70,
							direction : 'right',
							origin : { x : 25, y : 90 },
							center : true
						} );*/
						baraja.fan( {
						speed : 1000,
						easing : 'ease-in',
						range : 70,
						direction : 'right',
						origin : { x : 25, y : 90 },
						center : true
					} );
					} );	
					$('.baraja-demo').click();	
				}
				else
				{
					baraja.fan( {
						speed : 100,
						easing : 'ease-in',
						range : 0.1,
						direction : 'right',
						origin : { x : 25, y : 90 },
						center : true
					} );
					$('.baraja-demo').off('click');
				}					
			},
			event: function(e) {
				if (this.running) return !1;
				this.running = !0;
				var i = this;
				setTimeout(function() {
					i.running = !1
				}, this.lockTime);
				var t = 0;
				e > 0 ? (t = this.index + 1, t > 5 && (t = 0), this.UIChange(t)) : 0 > e && (t = this.index - 1, 0 > t && (t = 5), this.UIChange(t))
			},
			play: function() {
				clearTimeout(this.playTimer);
				var e = this,
					i = 3500;
				this.playTimer = setTimeout(function() {
					e.event(1), e.playTimer = setTimeout(arguments.callee, i)
				}, i)
			},
			autoPlay: function() {
				var e = this;
				clearTimeout(this.auto.timer), this.auto.timer = setTimeout(function() {
					e.event(1), e.auto.timer = setTimeout(arguments.callee, e.auto.gap)
				}, this.auto.gap)
			},
			enterPage: function() {
				$("#scene-1").addClass("scene-state-in"), $("html").hasClass("ie9") && $(".scene-icon-1-front").delay(400).fadeOut(600).delay(1200).siblings(".scene-icon-1-back").fadeIn(600)
			},
			todo: function(e) {
				clearTimeout(this.playTimer), this.event(e), this.autoPlay()
			},
			init: function() {
				var e = this;
				this.enterPage(), this.autoPlay(), $(document).on("keyup", function(i) {
					i.keyCode == e.KEY.DOWN && e.todo(1), i.keyCode == e.KEY.UP && e.todo(-1), i.keyCode == e.KEY.ENTER
				}).on("mousewheel", function(i) {
					i.deltaY < 0 && e.todo(1), i.deltaY > 0 && e.todo(-1)
				}), $("#slidebar").on("click", "li", function() {
					var i = $(this).index();
					e.UIChange(i), e.autoPlay()
				})
			}
		};
		$("body").addClass("scenes-ready"), u.init(), d.init();
});