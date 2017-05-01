;
var require, define;
!
function(e) {
	function r(e, r) {
		function t() {
			clearTimeout(a)
		}
		if (!(e in u)) {
			u[e] = !0;
			var i = document.createElement("script");
			if (r) {
				var a = setTimeout(r, require.timeout);
				i.onerror = function() {
					clearTimeout(a), r()
				}, "onload" in i ? i.onload = t : i.onreadystatechange = function() {
					("loaded" == this.readyState || "complete" == this.readyState) && t()
				}
			}
			return i.type = "text/javascript", i.src = e, n.appendChild(i), i
		}
	}
	function t(e, t, n) {
		var a = i[e] || (i[e] = []);
		a.push(t);
		var o, u = s[e] || s[e + ".js"] || {},
			l = u.pkg;
		o = l ? c[l].url : u.url || e, r(o, n &&
		function() {
			n(e)
		})
	}
	if (!require) {
		var n = document.getElementsByTagName("head")[0],
			i = {},
			a = {},
			o = {},
			u = {},
			s = {},
			c = {};
		define = function(e, r) {
			e = e.replace(/\.js$/i, ""), a[e] = r;
			var t = i[e];
			if (t) {
				for (var n = 0, o = t.length; o > n; n++) t[n]();
				delete i[e]
			}
		}, require = function(e) {
			if (e && e.splice) return require.async.apply(this, arguments);
			e = require.alias(e);
			var r = o[e];
			if (r) return r.exports;
			var t = a[e];
			if (!t) throw "[ModJS] Cannot find module `" + e + "`";
			r = o[e] = {
				exports: {}
			};
			var n = "function" == typeof t ? t.apply(r, [require, r.exports, r]) : t;
			return n && (r.exports = n), r.exports
		}, require.async = function(r, n, i) {
			function o(e) {
				for (var r = 0, n = e.length; n > r; r++) {
					var f = require.alias(e[r]);
					if (f in a) {
						var p = s[f] || s[f + ".js"];
						p && "deps" in p && o(p.deps)
					} else if (!(f in c)) {
						c[f] = !0, l++, t(f, u, i);
						var p = s[f] || s[f + ".js"];
						p && "deps" in p && o(p.deps)
					}
				}
			}
			function u() {
				if (0 == l--) {
					for (var t = [], i = 0, a = r.length; a > i; i++) t[i] = require(r[i]);
					n && n.apply(e, t)
				}
			}
			"string" == typeof r && (r = [r]);
			var c = {},
				l = 0;
			o(r), u()
		}, require.resourceMap = function(e) {
			var r, t;
			t = e.res;
			for (r in t) t.hasOwnProperty(r) && (s[r] = t[r]);
			t = e.pkg;
			for (r in t) t.hasOwnProperty(r) && (c[r] = t[r])
		}, require.loadJs = function(e) {
			r(e)
		}, require.loadCss = function(e) {
			if (e.content) {
				var r = document.createElement("style");
				r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = e.content : r.innerHTML = e.content, n.appendChild(r)
			} else if (e.url) {
				var t = document.createElement("link");
				t.href = e.url, t.rel = "stylesheet", t.type = "text/css", n.appendChild(t)
			}
		}, require.alias = function(e) {
			return e.replace(/\.js$/i, "")
		}, require.timeout = 5e3
	}
}(this);
!
function(e, n, t) {
	function r(e, n) {
		return typeof e === n
	}
	function s() {
		var e, n, t, s, o, i, a;
		for (var f in h) {
			if (e = [], n = h[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
			for (s = r(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) i = e[o], a = i.split("."), 1 === a.length ? x[a[0]] = s : (!x[a[0]] || x[a[0]] instanceof Boolean || (x[a[0]] = new Boolean(x[a[0]])), x[a[0]][a[1]] = s), y.push((s ? "" : "no-") + a.join("-"))
		}
	}
	function o(e) {
		var n = S.className,
			t = x._config.classPrefix || "";
		if (x._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
			n = n.replace(r, "$1" + t + "js$2")
		}
		x._config.enableClasses && (n += " " + t + e.join(" " + t), S.className = n)
	}
	function i(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
			return n + t.toUpperCase()
		}).replace(/^-/, "")
	}
	function a(e) {
		return e.replace(/([A-Z])/g, function(e, n) {
			return "-" + n.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}
	function f(e, n) {
		return !!~ ("" + e).indexOf(n)
	}
	function u(e, n) {
		return function() {
			return e.apply(n, arguments)
		}
	}
	function l(e, n, t) {
		var s;
		for (var o in e) if (e[o] in n) return t === !1 ? e[o] : (s = n[e[o]], r(s, "function") ? u(s, t || n) : s);
		return !1
	}
	function d() {
		var e = n.body;
		return e || (e = b("body"), e.fake = !0), e
	}
	function p(e, n, t, r) {
		var s, o, i, a, f = "modernizr",
			u = b("div"),
			l = d();
		if (parseInt(t, 10)) for (; t--;) i = b("div"), i.id = r ? r[t] : f + (t + 1), u.appendChild(i);
		return s = ["&#173;", '<style id="s', f, '">', e, "</style>"].join(""), u.id = f, (l.fake ? l : u).innerHTML += s, l.appendChild(u), l.fake && (l.style.background = "", l.style.overflow = "hidden", a = S.style.overflow, S.style.overflow = "hidden", S.appendChild(l)), o = n(u, e), l.fake ? (l.parentNode.removeChild(l), S.style.overflow = a, S.offsetHeight) : u.parentNode.removeChild(u), !! o
	}
	function c(n, r) {
		var s = n.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; s--;) if (e.CSS.supports(a(n[s]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var o = []; s--;) o.push("(" + a(n[s]) + ":" + r + ")");
			return o = o.join(" or "), p("@supports (" + o + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == getComputedStyle(e, null).position
			})
		}
		return t
	}
	function m(e, n, s, o) {
		function a() {
			l && (delete A.style, delete A.modElem)
		}
		if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
			var u = c(e, s);
			if (!r(u, "undefined")) return u
		}
		var l, d, p, m, v;
		for (A.style || (l = !0, A.modElem = b("modernizr"), A.style = A.modElem.style), p = e.length, d = 0; p > d; d++) if (m = e[d], v = A.style[m], f(m, "-") && (m = i(m)), A.style[m] !== t) {
			if (o || r(s, "undefined")) return a(), "pfx" == n ? m : !0;
			try {
				A.style[m] = s
			} catch (g) {}
			if (A.style[m] != v) return a(), "pfx" == n ? m : !0
		}
		return a(), !1
	}
	function v(e, n, t, s, o) {
		var i = e.charAt(0).toUpperCase() + e.slice(1),
			a = (e + " " + k.join(i + " ") + i).split(" ");
		return r(n, "string") || r(n, "undefined") ? m(a, n, s, o) : (a = (e + " " + P.join(i + " ") + i).split(" "), l(a, n, t))
	}
	function g(e, n, r) {
		return v(e, t, t, n, r)
	}
	var y = [],
		h = [],
		C = {
			_version: "3.0.0-alpha.3",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, n) {
				var t = this;
				setTimeout(function() {
					n(t[e])
				}, 0)
			},
			addTest: function(e, n, t) {
				h.push({
					name: e,
					fn: n,
					options: t
				})
			},
			addAsyncTest: function(e) {
				h.push({
					name: null,
					fn: e
				})
			}
		},
		x = function() {};
	x.prototype = C, x = new x;
	var S = n.documentElement,
		b = function() {
			return "function" != typeof n.createElement ? n.createElement(arguments[0]) : n.createElement.apply(n, arguments)
		};
	x.addTest("rgba", function() {
		var e = b("div"),
			n = e.style;
		return n.cssText = "background-color:rgba(150,255,150,.5)", ("" + n.backgroundColor).indexOf("rgba") > -1
	});
	var _ = "CSS" in e && "supports" in e.CSS,
		w = "supportsCSS" in e;
	x.addTest("supports", _ || w);
	var T = "Moz O ms Webkit",
		k = C._config.usePrefixes ? T.split(" ") : [];
	C._cssomPrefixes = k;
	var z = function(n) {
			var r, s = prefixes.length,
				o = e.CSSRule;
			if ("undefined" == typeof o) return t;
			if (!n) return !1;
			if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in o) return "@" + n;
			for (var i = 0; s > i; i++) {
				var a = prefixes[i],
					f = a.toUpperCase() + "_" + r;
				if (f in o) return "@-" + a.toLowerCase() + "-" + n
			}
			return !1
		},
		P = C._config.usePrefixes ? T.toLowerCase().split(" ") : [];
	C._domPrefixes = P;
	var E = C.testStyles = p,
		j = {
			elem: b("modernizr")
		};
	x._q.push(function() {
		delete j.elem
	});
	var A = {
		style: j.elem.style
	};
	x._q.unshift(function() {
		delete A.style
	}), C.testAllProps = v; {
		var L = C.prefixed = function(e, n, t) {
				return 0 === e.indexOf("@") ? z(e) : (-1 != e.indexOf("-") && (e = i(e)), n ? v(e, n, t) : v(e, "pfx"))
			};
		C.prefixedCSS = function(e) {
			var n = L(e);
			return n && a(n)
		}
	}
	C.testAllProps = g, x.addTest("backgroundsize", g("backgroundSize", "100%", !0)), x.addTest("bgsizecover", g("backgroundSize", "cover")), x.addTest("cssanimations", g("animationName", "a", !0)), x.addTest("preserve3d", g("transformStyle", "preserve-3d")), x.addTest("csstransforms", function() {
		return -1 === navigator.userAgent.indexOf("Android 2.") && g("transform", "scale(1)", !0)
	}), x.addTest("csstransforms3d", function() {
		var e = !! g("perspective", "1px", !0),
			n = x._config.usePrefixes;
		if (e && (!n || "webkitPerspective" in S.style)) {
			var t;
			x.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)", n && (t += ",(-webkit-transform-3d)")), t += "{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", E(t, function(n) {
				e = 9 === n.offsetLeft && 5 === n.offsetHeight
			})
		}
		return e
	}), x.addTest("csstransitions", g("transition", "all", !0)), s(), o(y), delete C.addTest, delete C.addAsyncTest;
	for (var O = 0; O < x._q.length; O++) x._q[O]();
	e.Modernizr = x
}(window, document);