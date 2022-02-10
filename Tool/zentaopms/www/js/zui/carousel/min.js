/*! Bootstrap: carousel v3.0.0 Copyright 2012 Twitter, Inc. */+function(t){"use strict";var e=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",this.pause.bind(this)).on("mouseleave",this.cycle.bind(this))};e.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,touchable:!0},e.prototype.touchable=function(){function e(e){var e=e||window.event;e.originalEvent&&(e=e.originalEvent);var a=t(this);switch(e.type){case"touchstart":s=e.touches[0].pageX,n=e.touches[0].pageY;break;case"touchend":var r=e.changedTouches[0].pageX-s,o=e.changedTouches[0].pageY-n;if(Math.abs(r)>Math.abs(o))i(a,r),Math.abs(r)>10&&e.preventDefault();else{var l=t(window);t("body,html").animate({scrollTop:l.scrollTop()-o},400)}}}function i(t,e){e>10?a.prev():e<-10&&a.next()}if(this.options.touchable){this.$element.on("touchstart touchmove touchend",e);var s,n,a=this}},e.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(this.next.bind(this),this.options.interval)),this},e.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},e.prototype.to=function(e){var i=this,s=this.getActiveIndex();if(!(e>this.$items.length-1||e<0))return this.sliding?this.$element.one("slid",function(){i.to(e)}):s==e?this.pause().cycle():this.slide(e>s?"next":"prev",t(this.$items[e]))},e.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition.end&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},e.prototype.next=function(){if(!this.sliding)return this.slide("next")},e.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},e.prototype.slide=function(e,i){var s=this.$element.find(".item.active"),n=i||s[e](),a=this.interval,r="next"==e?"left":"right",o="next"==e?"first":"last",l=this;if(!n.length){if(!this.options.wrap)return;n=this.$element.find(".item")[o]()}this.sliding=!0,a&&this.pause();var h=t.Event("slide.zui.carousel",{relatedTarget:n[0],direction:r});if(!n.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var e=t(l.$indicators.children()[l.getActiveIndex()]);e&&e.addClass("active")})),t.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(h),h.isDefaultPrevented())return;n.addClass(e),n[0].offsetWidth,s.addClass(r),n.addClass(r),s.one(t.support.transition.end,function(){n.removeClass([e,r].join(" ")).addClass("active"),s.removeClass(["active",r].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(h),h.isDefaultPrevented())return;s.removeClass("active"),n.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return a&&this.cycle(),this}};var i=t.fn.carousel;t.fn.carousel=function(i){return this.each(function(){var s=t(this),n=s.data("zui.carousel"),a=t.extend({},e.DEFAULTS,s.data(),"object"==typeof i&&i),r="string"==typeof i?i:a.slide;n||s.data("zui.carousel",n=new e(this,a)),"number"==typeof i?n.to(i):r?n[r]():a.interval&&n.pause().cycle(),a.touchable&&n.touchable()})},t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this},t(document).on("click.zui.carousel.data-api","[data-slide], [data-slide-to]",function(e){var i,s=t(this),n=t(s.attr("data-target")||(i=s.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),a=t.extend({},n.data(),s.data()),r=s.attr("data-slide-to");r&&(a.interval=!1),n.carousel(a),(r=s.attr("data-slide-to"))&&n.data("zui.carousel").to(r),e.preventDefault()}),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var e=t(this);e.carousel(e.data())})})}(window.jQuery);
