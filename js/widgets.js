; /*!/modules/app/widgets/slipblock.js*/
define("app/widgets/slipblock", function(n, t, i) {
	var e = $(window),
		o = function(n) {
			var t, i, o, u, a = $(n),
				f = a.siblings(".nav-highlight"),
				r = a.find("li"),
				c = $("body").attr("id"),
				s = function() {
					t = r.filter(".nav-" + c), i = t.length ? l(t) : {
						//width:80,
						width:e-20,
						left: -60
					}, f.css(i)
				},
				l = function(n) {
					var t, i = 15,
						e = n.outerWidth(),
						tt=n.offset().left,
						//o = a.find(".nav-home").outerWidth(),
						//u =n.is(".nav-home") ? 25 :80,
						u = e,
						f = n.index() - 1;
					return f = 0 > f ? 0 : f, t = n.is(".nav-home") ? 0 : o + f * e, {
						//width: u,
						//left:i + t + (e - u) / 2
						width: u-28,
						left:tt+14
					}
				},
				h = function(n) {
					clearTimeout(u), clearTimeout(o), o = setTimeout(function() {
						f.finish().animate(l(n), 400)
					}, 200)
				},
				d = function() {
					clearTimeout(o), u = setTimeout(function() {
						f.animate(i, 400)
					}, 200)
				},
				m = function() {
					a.on("mouseenter", "li", function() {
						h($(this))
					}).on("mouseleave", function() {
						d()
					}), e.on("resize", _.throttle(s, 100))
				};
			return {
				start: function() {
					s(), m()
				}
			}
		};
	i.exports = o
});; /*!/modules/app/widgets/sound.js*/
define("app/widgets/sound", function(a, n, e) {
	var s = /^(https?:\/\/(?:[^/]+\/)*)/,
		i = {
			play: function() {
				this.player.play()
			},
			pause: function() {
				this.player.pause()
			},
			start: function() {
				var a = s.exec(location.href)[1],
					n = a + "js/libs/soundmanager/swf/",
					e = a + "media/music.mp3",
					i = this;
				soundManager.setup({
					url: n,
					flashVersion: 9,
					onready: function() {
						i.player = soundManager.createSound({
							url: e,
							onfinish: function() {
								i.player.play()
							}
						}), i.player.play()
					}
				})
			}
		};
	e.exports = i
});; /*!/modules/utils/utils.js*/
define("utils", function(e, t, o) {
	!
	function(e, t) {
		"object" == typeof o && "object" == typeof o.exports ? o.exports = t(e) : t(e)
	}(window, function(e) {
		var t = {
			throttle: function(e, t) {
				clearTimeout(e.tId), e.tId = setTimeout(function() {
					e.call(t)
				}, 50)
			},
			keyCode: {
				BACKSPACE: 8,
				COMMA: 188,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				LEFT: 37,	
				NUMPAD_ADD: 107,
				NUMPAD_DECIMAL: 110,
				NUMPAD_DIVIDE: 111,
				NUMPAD_ENTER: 108,
				NUMPAD_MULTIPLY: 106,
				NUMPAD_SUBTRACT: 109,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SPACE: 32,
				TAB: 9,
				UP: 38
			},
			isSupportFixed: function() {
				var e = document.createElement("div"),
					t = document.createElement("div"),
					o = !0;
				return e.style.position = "absolute", e.style.top = "200px", t.style.position = "fixed", t.style.top = "100px", e.appendChild(t), document.body.appendChild(e), t.getBoundingClientRect && t.getBoundingClientRect().top === e.getBoundingClientRect().top && (o = !1), document.body.removeChild(e), o
			},
			getQueryString: function(e) {
				var t, o, n, i, d, c, u = {},
					l = /\?([^#]+)#?/;
				e || (e = location.href), t = e.indexOf("?"), o = -1 !== t ? l.exec(e)[1] : "", n = o.split("&");
				for (var p = 0, r = n.length; r > p; p++) i = n[p].split("="), d = decodeURIComponent(i[0]), c = decodeURIComponent(i[1]), u[d] = c;
				return u
			}
		};
		return e.utils = t, t
	})
});; /*!/modules/package/sid.js*/
define("package/sid", function(e, r, n) {
	var t = e("utils"),
		o = "http://j.br.baidu.com/v1/v/1/t/full/p/browser/tn/{0}/ch_dl_url.jsonp",
		u = "11000002",
		a = t.getQueryString(),
		i = function(e, r) {
			return e && r ? e : u
		},
		s = {
			get: function() {
				var e = $.Deferred(),
					r = a.sid,
					n = r ? r : u;
				return $.ajax(o.replace("{0}", n), {
					dataType: "jsonp",
					jsonp: "cb"
				}).done(function(n) {
					var t = -1 !== n.rst;
					e.resolve(i(r, t))
				}), e.promise()
			},
			defaultId: function() {
				return u
			}
		};
	n.exports = s
});; /*!/modules/package/info.js*/
define("package/info", function(e, t, r) {
	var n = e("package/sid"),
		o = "http://j.br.baidu.com/v1/t/{t}/p/browser/tn/{tn}/ch_url_info.jsonp",
		a = {
			_get: function(e, t) {
				var r = this,
					n = $.Deferred();
				return t = t || "full", $.ajax(o.replace("{t}", t).replace("{tn}", e), {
					cache: !0,
					dataType: "jsonp",
					jsonp: "cb",
					jsonpCallback: "getpackageinfo",
					success: function(o) {
						var a;
						0 === o.errCode && (a = o.data, "full" !== t || "object" === $.type(a) && a.fver ? n.resolve({
							size: a.fsize,
							version: a.fver,
							date: a.fdate,
							url: a.full_url,
							id: e
						}) : r._get(e, "ui"))
					}
				}), n.promise()
			},
			get: function() {
				var e = this,
					t = $.Deferred();
				return n.get().done(function(r) {
					e._get(r, "ui").done(function(e) {
						t.resolve(e)
					})
				}), t.promise()
			}
		};
	r.exports = a
});; /*!/modules/package/url.js*/
define("package/url", function(e, r, t) {
	var n = e("package/sid"),
		o = "http://j.br.baidu.com/v1/v/1/tn/{0}/ch_url_info.jsonp",
		a = "http://j.br.baidu.com/v1/t/full/p/browser/tn/{0}/ch_dl_url",
		u = {
			_get: function(e) {
				var r = $.Deferred();
				return $.ajax(o.replace("{0}", e), {
					dataType: "jsonp",
					jsonp: "cb"
				}).done(function(t) {
					r.resolve(0 === t.errCode && t.data && t.data.url ? t.data.url : a.replace("{0}", e))
				}), r.promise()
			},
			get: function() {
				var e = $.Deferred(),
					r = this;
				return n.get().done(function(t) {
					r._get(t).done(function(r) {
						e.resolve(r)
					})
				}), e.promise()
			}
		};
	t.exports = u
});