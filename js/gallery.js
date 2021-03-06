! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function c(c, d) {
            if (this.el = c, this.$el = a(c), this.s = a.extend({}, b, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        var b = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        c.prototype.init = function() {
            var b = this;
            b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
            var c = window.location.hash;
            c.indexOf("lg=" + this.s.galleryId) > 0 && (b.index = parseInt(c.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || (setTimeout(function() {
                b.build(b.index)
            }), a("body").addClass("lg-on"))), b.s.dynamic ? (b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function() {
                b.build(b.index), a("body").addClass("lg-on")
            })) : b.$items.on("click.lgcustom", function(c) {
                try {
                    c.preventDefault(), c.preventDefault()
                } catch (a) {
                    c.returnValue = !1
                }
                b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || b.$items.index(this), a("body").hasClass("lg-on") || (b.build(b.index), a("body").addClass("lg-on"))
            })
        }, c.prototype.build = function(b) {
            var c = this;
            c.structure(), a.each(a.fn.lightGallery.modules, function(b) {
                c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
            }), c.slide(b, !1, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 && (c.arrow(), setTimeout(function() {
                c.enableDrag(), c.enableSwipe()
            }, 50), c.s.mousewheel && c.mousewheel()), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function() {
                    c.$outer.addClass("lg-hide-items")
                }, c.s.hideBarsDelay)
            }), c.$outer.trigger("mousemove.lg")
        }, c.prototype.structure = function() {
            var f, b = "",
                c = "",
                d = 0,
                e = "",
                g = this;
            for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), d = 0; d < this.$items.length; d++) b += '<div class="lg-item"></div>';
            if (this.s.controls && this.$items.length > 1 && (c = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (e = '<div class="lg-sub-html"></div>'), f = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + b + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + c + e + "</div></div>", a("body").append(f), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), g.setTop(), a(window).on("resize.lg orientationchange.lg", function() {
                    setTimeout(function() {
                        g.setTop()
                    }, 100)
                }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                var h = this.$outer.find(".lg-inner");
                h.css("transition-timing-function", this.s.cssEasing), h.css("transition-duration", this.s.speed + "ms")
            }
            setTimeout(function() {
                a(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                g.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(window).scrollTop()
        }, c.prototype.setTop = function() {
            if ("100%" !== this.s.height) {
                var b = a(window).height(),
                    c = (b - parseInt(this.s.height, 10)) / 2,
                    d = this.$outer.find(".lg");
                b >= parseInt(this.s.height, 10) ? d.css("top", c + "px") : d.css("top", "0px")
            }
        }, c.prototype.doCss = function() {
            var a = function() {
                var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                    b = document.documentElement,
                    c = 0;
                for (c = 0; c < a.length; c++)
                    if (a[c] in b.style) return !0
            };
            return !!a()
        }, c.prototype.isVideo = function(a, b) {
            var c;
            if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a && c) return {
                html5: !0
            };
            var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return d ? {
                youtube: d
            } : e ? {
                vimeo: e
            } : f ? {
                dailymotion: f
            } : g ? {
                vk: g
            } : void 0
        }, c.prototype.counter = function() {
            this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, c.prototype.addHtml = function(b) {
            var d, e, c = null;
            if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? d = this.s.dynamicEl[b].subHtmlUrl : c = this.s.dynamicEl[b].subHtml : (e = this.$items.eq(b), e.attr("data-sub-html-url") ? d = e.attr("data-sub-html-url") : (c = e.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !c && (c = e.attr("title") || e.find("img").first().attr("alt")))), !d)
                if ("undefined" != typeof c && null !== c) {
                    var f = c.substring(0, 1);
                    "." !== f && "#" !== f || (c = this.s.subHtmlSelectorRelative && !this.s.dynamic ? e.find(c).html() : a(c).html())
                } else c = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? d ? this.$outer.find(this.s.appendSubHtmlTo).load(d) : this.$outer.find(this.s.appendSubHtmlTo).html(c) : d ? this.$slide.eq(b).load(d) : this.$slide.eq(b).append(c), "undefined" != typeof c && null !== c && ("" === c ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b])
        }, c.prototype.preload = function(a) {
            var b = 1,
                c = 1;
            for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
            for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0)
        }, c.prototype.loadContent = function(b, c, d) {
            var g, h, i, j, k, l, e = this,
                f = !1,
                m = function(b) {
                    for (var c = [], d = [], e = 0; e < b.length; e++) {
                        var f = b[e].split(" ");
                        "" === f[0] && f.splice(0, 1), d.push(f[0]), c.push(f[1])
                    }
                    for (var g = a(window).width(), i = 0; i < c.length; i++)
                        if (parseInt(c[i], 10) > g) {
                            h = d[i];
                            break
                        }
                };
            if (e.s.dynamic) {
                if (e.s.dynamicEl[b].poster && (f = !0, i = e.s.dynamicEl[b].poster), l = e.s.dynamicEl[b].html, h = e.s.dynamicEl[b].src, e.s.dynamicEl[b].responsive) {
                    var n = e.s.dynamicEl[b].responsive.split(",");
                    m(n)
                }
                j = e.s.dynamicEl[b].srcset, k = e.s.dynamicEl[b].sizes
            } else {
                if (e.$items.eq(b).attr("data-poster") && (f = !0, i = e.$items.eq(b).attr("data-poster")), l = e.$items.eq(b).attr("data-html"), h = e.$items.eq(b).attr("href") || e.$items.eq(b).attr("data-src"), e.$items.eq(b).attr("data-responsive")) {
                    var o = e.$items.eq(b).attr("data-responsive").split(",");
                    m(o)
                }
                j = e.$items.eq(b).attr("data-srcset"), k = e.$items.eq(b).attr("data-sizes")
            }
            var p = !1;
            e.s.dynamic ? e.s.dynamicEl[b].iframe && (p = !0) : "true" === e.$items.eq(b).attr("data-iframe") && (p = !0);
            var q = e.isVideo(h, b);
            if (!e.$slide.eq(b).hasClass("lg-loaded")) {
                if (p) e.$slide.eq(b).prepend('<div class="lg-video-cont" style="max-width:' + e.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + h + '"  allowfullscreen="true"></iframe></div></div>');
                else if (f) {
                    var r = "";
                    r = q && q.youtube ? "lg-has-youtube" : q && q.vimeo ? "lg-has-vimeo" : "lg-has-html5", e.$slide.eq(b).prepend('<div class="lg-video-cont ' + r + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + i + '" /></div></div>')
                } else q ? (e.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), e.$el.trigger("hasVideo.lg", [b, h, l])) : e.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + h + '" /></div>');
                if (e.$el.trigger("onAferAppendSlide.lg", [b]), g = e.$slide.eq(b).find(".lg-object"), k && g.attr("sizes", k), j) {
                    g.attr("srcset", j);
                    try {
                        picturefill({
                            elements: [g[0]]
                        })
                    } catch (a) {
                        console.error("Make sure you have included Picturefill version 2")
                    }
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && e.addHtml(b), e.$slide.eq(b).addClass("lg-loaded")
            }
            e.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                var c = 0;
                d && !a("body").hasClass("lg-from-hash") && (c = d), setTimeout(function() {
                    e.$slide.eq(b).addClass("lg-complete"), e.$el.trigger("onSlideItemLoad.lg", [b, d || 0])
                }, c)
            }), q && q.html5 && !f && e.$slide.eq(b).addClass("lg-complete"), c === !0 && (e.$slide.eq(b).hasClass("lg-complete") ? e.preload(b) : e.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                e.preload(b)
            }))
        }, c.prototype.slide = function(b, c, d, e) {
            var f = this.$outer.find(".lg-current").index(),
                g = this;
            if (!g.lGalleryOn || f !== b) {
                var h = this.$slide.length,
                    i = g.lGalleryOn ? this.s.speed : 0;
                if (!g.lgBusy) {
                    if (this.s.download) {
                        var j;
                        j = g.s.dynamic ? g.s.dynamicEl[b].downloadUrl !== !1 && (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src) : "false" !== g.$items.eq(b).attr("data-download-url") && (g.$items.eq(b).attr("data-download-url") || g.$items.eq(b).attr("href") || g.$items.eq(b).attr("data-src")), j ? (a("#lg-download").attr("href", j), g.$outer.removeClass("lg-hide-download")) : g.$outer.addClass("lg-hide-download")
                    }
                    if (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]), g.lgBusy = !0, clearTimeout(g.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                            g.addHtml(b)
                        }, i), this.arrowDisable(b), e || (b < f ? e = "prev" : b > f && (e = "next")), c) {
                        this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
                        var k, l;
                        h > 2 ? (k = b - 1, l = b + 1, 0 === b && f === h - 1 ? (l = 0, k = h - 1) : b === h - 1 && 0 === f && (l = 0, k = h - 1)) : (k = 0, l = 1), "prev" === e ? g.$slide.eq(l).addClass("lg-next-slide") : g.$slide.eq(k).addClass("lg-prev-slide"), g.$slide.eq(b).addClass("lg-current")
                    } else g.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === e ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(f).addClass("lg-next-slide")) : (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(f).addClass("lg-prev-slide")), setTimeout(function() {
                        g.$slide.removeClass("lg-current"), g.$slide.eq(b).addClass("lg-current"), g.$outer.removeClass("lg-no-trans")
                    }, 50);
                    g.lGalleryOn ? (setTimeout(function() {
                        g.loadContent(b, !0, 0)
                    }, this.s.speed + 50), setTimeout(function() {
                        g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])
                    }, this.s.speed)) : (g.loadContent(b, !0, g.s.backdropDuration), g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])), g.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1)
                }
            }
        }, c.prototype.goToNextSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : c ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-right-end"), setTimeout(function() {
                b.$outer.removeClass("lg-right-end")
            }, 400)))
        }, c.prototype.goToPrevSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : c ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-left-end"), setTimeout(function() {
                b.$outer.removeClass("lg-left-end")
            }, 400)))
        }, c.prototype.keyPress = function() {
            var b = this;
            this.$items.length > 1 && a(window).on("keyup.lg", function(a) {
                b.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()))
            }), a(window).on("keydown.lg", function(a) {
                b.s.escKey === !0 && 27 === a.keyCode && (a.preventDefault(), b.$outer.hasClass("lg-thumb-open") ? b.$outer.removeClass("lg-thumb-open") : b.destroy())
            })
        }, c.prototype.arrow = function() {
            var a = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                a.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                a.goToNextSlide()
            })
        }, c.prototype.arrowDisable = function(a) {
            !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, c.prototype.setTranslate = function(a, b, c) {
            this.s.useLeft ? a.css("left", b) : a.css({
                transform: "translate3d(" + b + "px, " + c + "px, 0px)"
            })
        }, c.prototype.touchMove = function(b, c) {
            var d = c - b;
            Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0))
        }, c.prototype.touchEnd = function(a) {
            var b = this;
            "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                b.$outer.removeClass("lg-dragging"), a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style")
            }), setTimeout(function() {
                b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide")
            }, b.s.speed + 100)
        }, c.prototype.enableSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1;
            a.s.enableSwipe && a.isTouch && a.doCss() && (a.$slide.on("touchstart.lg", function(c) {
                a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX)
            }), a.$slide.on("touchmove.lg", function(e) {
                a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0)
            }), a.$slide.on("touchend.lg", function() {
                a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"))
            }))
        }, c.prototype.enableDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1;
            b.s.enableDrag && !b.isTouch && b.doCss() && (b.$slide.on("mousedown.lg", function(d) {
                b.$outer.hasClass("lg-zoomed") || (a(d.target).hasClass("lg-object") || a(d.target).hasClass("lg-video-play")) && (d.preventDefault(), b.lgBusy || (b.manageSwipeClass(), c = d.pageX, e = !0, b.$outer.scrollLeft += 1, b.$outer.scrollLeft -= 1, b.$outer.removeClass("lg-grab").addClass("lg-grabbing"), b.$el.trigger("onDragstart.lg")))
            }), a(window).on("mousemove.lg", function(a) {
                e && (f = !0, d = a.pageX, b.touchMove(c, d), b.$el.trigger("onDragmove.lg"))
            }), a(window).on("mouseup.lg", function(g) {
                f ? (f = !1, b.touchEnd(d - c), b.$el.trigger("onDragend.lg")) : (a(g.target).hasClass("lg-object") || a(g.target).hasClass("lg-video-play")) && b.$el.trigger("onSlideClick.lg"), e && (e = !1, b.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, c.prototype.manageSwipeClass = function() {
            var a = this.index + 1,
                b = this.index - 1;
            this.s.loop && this.$slide.length > 2 && (0 === this.index ? b = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide")
        }, c.prototype.mousewheel = function() {
            var a = this;
            a.$outer.on("mousewheel.lg", function(b) {
                b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault())
            })
        }, c.prototype.closeGallery = function() {
            var b = this,
                c = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                b.destroy()
            }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) {
                c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"))
            }), b.$outer.on("mouseup.lg", function(d) {
                (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy())
            }))
        }, c.prototype.destroy = function(b) {
            var c = this;
            b || (c.$el.trigger("onBeforeClose.lg"), a(window).scrollTop(c.prevScrollTop)), b && (c.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(c.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) {
                c.modules[a] && c.modules[a].destroy()
            }), this.lGalleryOn = !1, clearTimeout(c.hideBartimeout), this.hideBartimeout = !1, a(window).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), c.$outer && c.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function() {
                c.$outer && c.$outer.remove(), a(".lg-backdrop").remove(), b || c.$el.trigger("onCloseAfter.lg")
            }, c.s.backdropDuration + 50)
        }, a.fn.lightGallery = function(b) {
            return this.each(function() {
                if (a.data(this, "lightGallery")) try {
                    a(this).data("lightGallery").init()
                } catch (a) {
                    console.error("lightGallery has not initiated properly")
                } else a.data(this, "lightGallery", new c(this, b))
            })
        }, a.fn.lightGallery.modules = {}
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), !(this.core.$items.length < 2) && (this.core.s = a.extend({}, b, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
            };
        c.prototype.init = function() {
            var a = this;
            a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.startlAuto(), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                a.interval && (a.cancelAuto(), a.canceledOnTouch = !0)
            }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1)
            })
        }, c.prototype.progress = function() {
            var b, c, a = this;
            a.$el.on("onBeforeSlide.lg.tm", function() {
                a.core.s.progressBar && a.fromAuto && (b = a.core.$outer.find(".lg-progress-bar"), c = a.core.$outer.find(".lg-progress"), a.interval && (c.removeAttr("style"), b.removeClass("lg-start"), setTimeout(function() {
                    c.css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), b.addClass("lg-start")
                }, 20))), a.fromAuto || a.core.s.fourceAutoplay || a.cancelAuto(), a.fromAuto = !1
            })
        }, c.prototype.controls = function() {
            var b = this,
                c = '<span class="lg-autoplay-button lg-icon"></span>';
            a(this.core.s.appendAutoplayControlsTo).append(c), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp)
            })
        }, c.prototype.startlAuto = function() {
            var a = this;
            a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function() {
                a.core.index + 1 < a.core.$items.length ? a.core.index++ : a.core.index = 0, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1, "next")
            }, a.core.s.speed + a.core.s.pause)
        }, c.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, c.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, a.fn.lightGallery.modules.autoplay = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }) : "object" == typeof exports ? module.exports = b() : b()
}(this, function() {
    ! function(a, b, c, d) {
        "use strict";
        var e = {
                fullScreen: !0
            },
            f = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.init(), this
            };
        f.prototype.init = function() {
            var a = "";
            if (this.core.s.fullScreen) {
                if (!(c.fullscreenEnabled || c.webkitFullscreenEnabled || c.mozFullScreenEnabled || c.msFullscreenEnabled)) return;
                a = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen()
            }
        }, f.prototype.requestFullscreen = function() {
            var a = c.documentElement;
            a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
        }, f.prototype.exitFullscreen = function() {
            c.exitFullscreen ? c.exitFullscreen() : c.msExitFullscreen ? c.msExitFullscreen() : c.mozCancelFullScreen ? c.mozCancelFullScreen() : c.webkitExitFullscreen && c.webkitExitFullscreen()
        }, f.prototype.fullScreen = function() {
            var b = this;
            a(c).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                b.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement || c.msFullscreenElement ? b.exitFullscreen() : b.requestFullscreen()
            })
        }, f.prototype.destroy = function() {
            this.exitFullscreen(), a(c).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, a.fn.lightGallery.modules.fullscreen = f
    }(jQuery, window, document)
}),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }) : "object" == typeof exports ? module.exports = b() : b()
}(this, function() {
    ! function(a, b, c, d) {
        "use strict";
        var e = {
                hash: !0
            },
            f = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.core.s.hash && (this.oldHash = b.location.hash, this.init()), this
            };
        f.prototype.init = function() {
            var d, c = this;
            c.core.$el.on("onAfterSlide.lg.tm", function(a, d, e) {
                b.location.hash = "lg=" + c.core.s.galleryId + "&slide=" + e
            }), a(b).on("hashchange.lg.hash", function() {
                d = b.location.hash;
                var a = parseInt(d.split("&slide=")[1], 10);
                d.indexOf("lg=" + c.core.s.galleryId) > -1 ? c.core.slide(a, !1, !1) : c.core.lGalleryOn && c.core.destroy()
            })
        }, f.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? b.location.hash = this.oldHash : history.pushState ? history.pushState("", c.title, b.location.pathname + b.location.search) : b.location.hash = "", this.core.$el.off(".lg.hash"))
        }, a.fn.lightGallery.modules.hash = f
    }(jQuery, window, document)
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                pager: !1
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), this.core.s = a.extend({}, b, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
            };
        c.prototype.init = function() {
            var d, e, f, b = this,
                c = "";
            if (b.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), b.core.s.dynamic)
                for (var g = 0; g < b.core.s.dynamicEl.length; g++) c += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + b.core.s.dynamicEl[g].thumb + '" /></div></span>';
            else b.core.$items.each(function() {
                c += b.core.s.exThumbImage ? '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(b.core.s.exThumbImage) + '" /></div></span>' : '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>'
            });
            e = b.core.$outer.find(".lg-pager-outer"), e.html(c), d = b.core.$outer.find(".lg-pager-cont"), d.on("click.lg touchend.lg", function() {
                var c = a(this);
                b.core.index = c.index(), b.core.slide(b.core.index, !1, !0, !1)
            }), e.on("mouseover.lg", function() {
                clearTimeout(f), e.addClass("lg-pager-hover")
            }), e.on("mouseout.lg", function() {
                f = setTimeout(function() {
                    e.removeClass("lg-pager-hover")
                })
            }), b.core.$el.on("onBeforeSlide.lg.tm", function(a, b, c) {
                d.removeClass("lg-pager-active"), d.eq(c).addClass("lg-pager-active")
            })
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.pager = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 150,
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.$el = a(c), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this
            };
        c.prototype.init = function() {
            var a = this;
            this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
                a.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, c.prototype.build = function() {
            function g(a, e, f) {
                var h, g = b.core.isVideo(a, f) || {},
                    i = "";
                g.youtube || g.vimeo || g.dailymotion ? g.youtube ? h = b.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + g.youtube[1] + "/" + b.core.s.youtubeThumbSize + ".jpg" : e : g.vimeo ? b.core.s.loadVimeoThumbnail ? (h = "//i.vimeocdn.com/video/error_" + d + ".jpg", i = g.vimeo[1]) : h = e : g.dailymotion && (h = b.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + g.dailymotion[1] : e) : h = e, c += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + b.core.s.thumbWidth + "px; margin-right: " + b.core.s.thumbMargin + 'px"><img src="' + h + '" /></div>', i = ""
            }
            var e, b = this,
                c = "",
                d = "",
                f = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    d = "640";
                    break;
                case "thumbnail_medium":
                    d = "200x150";
                    break;
                case "thumbnail_small":
                    d = "100x75"
            }
            if (b.core.$outer.addClass("lg-has-thumb"), b.core.$outer.find(".lg").append(f), b.$thumbOuter = b.core.$outer.find(".lg-thumb-outer"), b.thumbOuterWidth = b.$thumbOuter.width(), b.core.s.animateThumb && b.core.$outer.find(".lg-thumb").css({
                    width: b.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && b.$thumbOuter.css("height", b.core.s.thumbContHeight + "px"), b.core.s.dynamic)
                for (var h = 0; h < b.core.s.dynamicEl.length; h++) g(b.core.s.dynamicEl[h].src, b.core.s.dynamicEl[h].thumb, h);
            else b.core.$items.each(function(c) {
                b.core.s.exThumbImage ? g(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(b.core.s.exThumbImage), c) : g(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), c)
            });
            b.core.$outer.find(".lg-thumb").html(c), e = b.core.$outer.find(".lg-thumb-item"), e.each(function() {
                var c = a(this),
                    d = c.attr("data-vimeo-id");
                d && a.getJSON("//www.vimeo.com/api/v2/video/" + d + ".json?callback=?", {
                    format: "json"
                }, function(a) {
                    c.find("img").attr("src", a[0][b.core.s.vimeoThumbSize])
                })
            }), e.eq(b.core.index).addClass("active"), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                e.removeClass("active"), e.eq(b.core.index).addClass("active")
            }), e.on("click.lg touchend.lg", function() {
                var c = a(this);
                setTimeout(function() {
                    (b.thumbClickable && !b.core.lgBusy || !b.core.doCss()) && (b.core.index = c.index(), b.core.slide(b.core.index, !1, !0, !1))
                }, 50)
            }), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                b.animateThumb(b.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    b.animateThumb(b.core.index), b.thumbOuterWidth = b.$thumbOuter.width()
                }, 200)
            })
        }, c.prototype.setTranslate = function(a) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + a + "px, 0px, 0px)"
            })
        }, c.prototype.animateThumb = function(a) {
            var b = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                var c;
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        c = 0;
                        break;
                    case "middle":
                        c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        c = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, c.prototype.enableThumbDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1,
                g = 0;
            b.$thumbOuter.addClass("lg-grab"), b.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(a) {
                b.thumbTotalWidth > b.thumbOuterWidth && (a.preventDefault(), c = a.pageX, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.thumbClickable = !1, b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(a) {
                e && (g = b.left, f = !0, d = a.pageX, b.$thumbOuter.addClass("lg-dragging"), g -= d - c, g > b.thumbTotalWidth - b.thumbOuterWidth && (g = b.thumbTotalWidth - b.thumbOuterWidth), g < 0 && (g = 0), b.setTranslate(g))
            }), a(window).on("mouseup.lg.thumb", function() {
                f ? (f = !1, b.$thumbOuter.removeClass("lg-dragging"), b.left = g, Math.abs(d - c) < b.core.s.swipeThreshold && (b.thumbClickable = !0)) : b.thumbClickable = !0, e && (e = !1, b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, c.prototype.enableThumbSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1,
                e = 0;
            a.core.$outer.find(".lg-thumb").on("touchstart.lg", function(c) {
                a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1)
            }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function(f) {
                a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), e < 0 && (e = 0), a.setTranslate(e))
            }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0
            })
        }, c.prototype.toogle = function() {
            var a = this;
            a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                a.core.$outer.toggleClass("lg-thumb-open");
            }))
        }, c.prototype.thumbkeyPress = function() {
            var b = this;
            a(window).on("keydown.lg.thumb", function(a) {
                38 === a.keyCode ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), b.core.$outer.removeClass("lg-thumb-open"))
            })
        }, c.prototype.destroy = function() {
            this.core.s.thumbnail && this.core.$items.length > 1 && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }) : "object" == typeof exports ? module.exports = b() : b()
}(this, function() {
    ! function(a, b, c, d) {
        "use strict";
        var e = {
                videoMaxWidth: "855px",
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
            f = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
            };
        f.prototype.init = function() {
            var b = this;
            b.core.$el.on("hasVideo.lg.tm", function(a, c, d, e) {
                if (b.core.$slide.eq(c).find(".lg-video").append(b.loadVideo(d, "lg-object", !0, c, e)), e)
                    if (b.core.s.videojs) try {
                        videojs(b.core.$slide.eq(c).find(".lg-html5").get(0), b.core.s.videojsOptions, function() {
                            b.videoLoaded || this.play()
                        })
                    } catch (a) {
                        console.error("Make sure you have included videojs")
                    } else b.core.$slide.eq(c).find(".lg-html5").get(0).play()
            }), b.core.$el.on("onAferAppendSlide.lg.tm", function(a, c) {
                b.core.$slide.eq(c).find(".lg-video-cont").css("max-width", b.core.s.videoMaxWidth), b.videoLoaded = !0
            });
            var c = function(a) {
                if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                    if (a.hasClass("lg-has-video")) {
                        var g = a.find(".lg-youtube").get(0),
                            h = a.find(".lg-vimeo").get(0),
                            i = a.find(".lg-dailymotion").get(0),
                            j = a.find(".lg-html5").get(0);
                        if (g) g.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                        else if (h) try {
                                $f(h).api("play")
                            } catch (a) {
                                console.error("Make sure you have included froogaloop2 js")
                            } else if (i) i.contentWindow.postMessage("play", "*");
                            else if (j)
                            if (b.core.s.videojs) try {
                                videojs(j).play()
                            } catch (a) {
                                console.error("Make sure you have included videojs")
                            } else j.play();
                        a.addClass("lg-video-playing")
                    } else {
                        a.addClass("lg-video-playing lg-has-video");
                        var c, d, e = function(c, d) {
                            if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                                if (b.core.s.videojs) try {
                                    videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function() {
                                        this.play()
                                    })
                                } catch (a) {
                                    console.error("Make sure you have included videojs")
                                } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()
                        };
                        b.core.s.dynamic ? (c = b.core.s.dynamicEl[b.core.index].src, d = b.core.s.dynamicEl[b.core.index].html, e(c, d)) : (c = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), d = b.core.$items.eq(b.core.index).attr("data-html"), e(c, d));
                        var f = a.find(".lg-object");
                        a.find(".lg-video").append(f), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function() {
                            a.addClass("lg-complete")
                        }))
                    }
            };
            b.core.doCss() && b.core.$items.length > 1 && (b.core.s.enableSwipe && b.core.isTouch || b.core.s.enableDrag && !b.core.isTouch) ? b.core.$el.on("onSlideClick.lg.tm", function() {
                var a = b.core.$slide.eq(b.core.index);
                c(a)
            }) : b.core.$slide.on("click.lg", function() {
                c(a(this))
            }), b.core.$el.on("onBeforeSlide.lg.tm", function(c, d, e) {
                var f = b.core.$slide.eq(d),
                    g = f.find(".lg-youtube").get(0),
                    h = f.find(".lg-vimeo").get(0),
                    i = f.find(".lg-dailymotion").get(0),
                    j = f.find(".lg-vk").get(0),
                    k = f.find(".lg-html5").get(0);
                if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                else if (h) try {
                        $f(h).api("pause")
                    } catch (a) {
                        console.error("Make sure you have included froogaloop2 js")
                    } else if (i) i.contentWindow.postMessage("pause", "*");
                    else if (k)
                    if (b.core.s.videojs) try {
                        videojs(k).pause()
                    } catch (a) {
                        console.error("Make sure you have included videojs")
                    } else k.pause();
                j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
                var l;
                l = b.core.s.dynamic ? b.core.s.dynamicEl[e].src : b.core.$items.eq(e).attr("href") || b.core.$items.eq(e).attr("data-src");
                var m = b.core.isVideo(l, e) || {};
                (m.youtube || m.vimeo || m.dailymotion || m.vk) && b.core.$outer.addClass("lg-hide-download")
            }), b.core.$el.on("onAfterSlide.lg.tm", function(a, c) {
                b.core.$slide.eq(c).removeClass("lg-video-playing")
            })
        }, f.prototype.loadVideo = function(b, c, d, e, f) {
            var g = "",
                h = 1,
                i = "",
                j = this.core.isVideo(b, e) || {};
            if (d && (h = this.videoLoaded ? 0 : 1), j.youtube) i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1", this.core.s.youtubePlayerParams && (i = i + "&" + a.param(this.core.s.youtubePlayerParams)), g = '<iframe class="lg-video-object lg-youtube ' + c + '" width="560" height="315" src="//www.youtube.com/embed/' + j.youtube[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.vimeo) i = "?autoplay=" + h + "&api=1", this.core.s.vimeoPlayerParams && (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)), g = '<iframe class="lg-video-object lg-vimeo ' + c + '" width="560" height="315"  src="//player.vimeo.com/video/' + j.vimeo[1] + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            else if (j.dailymotion) i = "?wmode=opaque&autoplay=" + h + "&api=postMessage", this.core.s.dailymotionPlayerParams && (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)), g = '<iframe class="lg-video-object lg-dailymotion ' + c + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + j.dailymotion[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.html5) {
                var k = f.substring(0, 1);
                "." !== k && "#" !== k || (f = a(f).html()), g = f
            } else j.vk && (i = "&autoplay=" + h, this.core.s.vkPlayerParams && (i = i + "&" + a.param(this.core.s.vkPlayerParams)), g = '<iframe class="lg-video-object lg-vk ' + c + '" width="560" height="315" src="http://vk.com/video_ext.php?' + j.vk[1] + i + '" frameborder="0" allowfullscreen></iframe>');
            return g
        }, f.prototype.destroy = function() {
            this.videoLoaded = !1
        }, a.fn.lightGallery.modules.video = f
    }(jQuery, window, document)
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    ! function() {
        "use strict";
        var b = function() {
                var a = !1,
                    b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return b && parseInt(b[2], 10) < 54 && (a = !0), a
            },
            c = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300,
                useLeftForZoom: b()
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, c, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()), this
            };
        d.prototype.init = function() {
            var b = this,
                c = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
            b.core.s.actualSize && (c += '<span id="lg-actual-size" class="lg-icon"></span>'), b.core.s.useLeftForZoom ? b.core.$outer.addClass("lg-use-left-for-zoom") : b.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(c), b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(c, d, e) {
                var f = b.core.s.enableZoomAfter + e;
                a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), b.zoomabletimeout = setTimeout(function() {
                    b.core.$slide.eq(d).addClass("lg-zoomable")
                }, f + 30)
            });
            var d = 1,
                e = function(c) {
                    var e, f, d = b.core.$outer.find(".lg-current .lg-image"),
                        g = (a(window).width() - d.prop("offsetWidth")) / 2,
                        h = (a(window).height() - d.prop("offsetHeight")) / 2 + a(window).scrollTop();
                    e = b.pageX - g, f = b.pageY - h;
                    var i = (c - 1) * e,
                        j = (c - 1) * f;
                    d.css("transform", "scale3d(" + c + ", " + c + ", 1)").attr("data-scale", c), b.core.s.useLeftForZoom ? d.parent().css({
                        left: -i + "px",
                        top: -j + "px"
                    }).attr("data-x", i).attr("data-y", j) : d.parent().css("transform", "translate3d(-" + i + "px, -" + j + "px, 0)").attr("data-x", i).attr("data-y", j)
                },
                f = function() {
                    d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(), d < 1 && (d = 1), e(d)
                },
                g = function(c, e, g, h) {
                    var j, i = e.prop("offsetWidth");
                    j = b.core.s.dynamic ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || i : b.core.$items.eq(g).attr("data-width") || e[0].naturalWidth || i;
                    var k;
                    b.core.$outer.hasClass("lg-zoomed") ? d = 1 : j > i && (k = j / i, d = k || 2), h ? (b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop()) : (b.pageX = c.pageX || c.originalEvent.targetTouches[0].pageX, b.pageY = c.pageY || c.originalEvent.targetTouches[0].pageY), f(), setTimeout(function() {
                        b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                    }, 10)
                },
                h = !1;
            b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(a, c) {
                var d = b.core.$slide.eq(c).find(".lg-image");
                d.on("dblclick", function(a) {
                    g(a, d, c)
                }), d.on("touchstart", function(a) {
                    h ? (clearTimeout(h), h = null, g(a, d, c)) : h = setTimeout(function() {
                        h = null
                    }, 300), a.preventDefault()
                })
            }), a(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop(), e(d)
            }), a("#lg-zoom-out").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d -= b.core.s.scale, f())
            }), a("#lg-zoom-in").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d += b.core.s.scale, f())
            }), a("#lg-actual-size").on("click.lg", function(a) {
                g(a, b.core.$slide.eq(b.core.index).find(".lg-image"), b.core.index, !0)
            }), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                d = 1, b.resetZoom()
            }), b.core.isTouch || b.zoomDrag(), b.core.isTouch && b.zoomSwipe()
        }, d.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()
        }, d.prototype.zoomSwipe = function() {
            var a = this,
                b = {},
                c = {},
                d = !1,
                e = !1,
                f = !1;
            a.core.$slide.on("touchstart.lg", function(c) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var d = a.core.$slide.eq(a.core.index).find(".lg-object");
                    f = d.prop("offsetHeight") * d.attr("data-scale") > a.core.$outer.find(".lg").height(), e = d.prop("offsetWidth") * d.attr("data-scale") > a.core.$outer.find(".lg").width(), (e || f) && (c.preventDefault(), b = {
                        x: c.originalEvent.targetTouches[0].pageX,
                        y: c.originalEvent.targetTouches[0].pageY
                    })
                }
            }), a.core.$slide.on("touchmove.lg", function(g) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var i, j, h = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                    g.preventDefault(), d = !0, c = {
                        x: g.originalEvent.targetTouches[0].pageX,
                        y: g.originalEvent.targetTouches[0].pageY
                    }, a.core.$outer.addClass("lg-zoom-dragging"), j = f ? -Math.abs(h.attr("data-y")) + (c.y - b.y) : -Math.abs(h.attr("data-y")), i = e ? -Math.abs(h.attr("data-x")) + (c.x - b.x) : -Math.abs(h.attr("data-x")), (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) && (a.core.s.useLeftForZoom ? h.css({
                        left: i + "px",
                        top: j + "px"
                    }) : h.css("transform", "translate3d(" + i + "px, " + j + "px, 0)"))
                }
            }), a.core.$slide.on("touchend.lg", function() {
                a.core.$outer.hasClass("lg-zoomed") && d && (d = !1, a.core.$outer.removeClass("lg-zoom-dragging"), a.touchendZoom(b, c, e, f))
            })
        }, d.prototype.zoomDrag = function() {
            var b = this,
                c = {},
                d = {},
                e = !1,
                f = !1,
                g = !1,
                h = !1;
            b.core.$slide.on("mousedown.lg.zoom", function(d) {
                var f = b.core.$slide.eq(b.core.index).find(".lg-object");
                h = f.prop("offsetHeight") * f.attr("data-scale") > b.core.$outer.find(".lg").height(), g = f.prop("offsetWidth") * f.attr("data-scale") > b.core.$outer.find(".lg").width(), b.core.$outer.hasClass("lg-zoomed") && a(d.target).hasClass("lg-object") && (g || h) && (d.preventDefault(), c = {
                    x: d.pageX,
                    y: d.pageY
                }, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.zoom", function(a) {
                if (e) {
                    var j, k, i = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                    f = !0, d = {
                        x: a.pageX,
                        y: a.pageY
                    }, b.core.$outer.addClass("lg-zoom-dragging"), k = h ? -Math.abs(i.attr("data-y")) + (d.y - c.y) : -Math.abs(i.attr("data-y")), j = g ? -Math.abs(i.attr("data-x")) + (d.x - c.x) : -Math.abs(i.attr("data-x")), b.core.s.useLeftForZoom ? i.css({
                        left: j + "px",
                        top: k + "px"
                    }) : i.css("transform", "translate3d(" + j + "px, " + k + "px, 0)")
                }
            }), a(window).on("mouseup.lg.zoom", function(a) {
                e && (e = !1, b.core.$outer.removeClass("lg-zoom-dragging"), !f || c.x === d.x && c.y === d.y || (d = {
                    x: a.pageX,
                    y: a.pageY
                }, b.touchendZoom(c, d, g, h)), f = !1), b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, d.prototype.touchendZoom = function(a, b, c, d) {
            var e = this,
                f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
                g = e.core.$slide.eq(e.core.index).find(".lg-object"),
                h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
                i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
                j = (e.core.$outer.find(".lg").height() - g.prop("offsetHeight")) / 2,
                k = Math.abs(g.prop("offsetHeight") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").height() + j),
                l = (e.core.$outer.find(".lg").width() - g.prop("offsetWidth")) / 2,
                m = Math.abs(g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").width() + l);
            (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (i <= -k ? i = -k : i >= -j && (i = -j)), c && (h <= -m ? h = -m : h >= -l && (h = -l)), d ? f.attr("data-y", Math.abs(i)) : i = -Math.abs(f.attr("data-y")), c ? f.attr("data-x", Math.abs(h)) : h = -Math.abs(f.attr("data-x")), e.core.s.useLeftForZoom ? f.css({
                left: h + "px",
                top: i + "px"
            }) : f.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"))
        }, d.prototype.destroy = function() {
            var b = this;
            b.core.$el.off(".lg.zoom"), a(window).off(".lg.zoom"), b.core.$slide.off(".lg.zoom"), b.core.$el.off(".lg.tm.zoom"), b.resetZoom(), clearTimeout(b.zoomabletimeout), b.zoomabletimeout = !1
        }, a.fn.lightGallery.modules.zoom = d
    }()
});
