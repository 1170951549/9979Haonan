!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("vue-cropper", [], t) : "object" == typeof exports ? exports["vue-cropper"] = t() : e["vue-cropper"] = t()
}(this, function () {
  return function (e) {
    function t(r) {
      if (o[r]) return o[r].exports;
      var i = o[r] = {i: r, l: !1, exports: {}};
      return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }

    var o = {};
    return t.m = e, t.c = o, t.i = function (e) {
      return e
    }, t.d = function (e, o, r) {
      t.o(e, o) || Object.defineProperty(e, o, {configurable: !1, enumerable: !0, get: r})
    }, t.n = function (e) {
      var o = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(o, "a", o), o
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 2)
  }([function (e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var r = o(5), i = function (e) {
      return e && e.__esModule ? e : {default: e}
    }(r);
    t.default = {
      data: function () {
        return {
          w: 0,
          h: 0,
          scale: 1,
          x: 0,
          y: 0,
          loading: !0,
          trueWidth: 0,
          trueHeight: 0,
          move: !0,
          moveX: 0,
          moveY: 0,
          crop: !1,
          cropping: !1,
          cropW: 0,
          cropH: 0,
          cropOldW: 0,
          cropOldH: 0,
          canChangeX: !1,
          canChangeY: !1,
          changeCropTypeX: 1,
          changeCropTypeY: 1,
          cropX: 0,
          cropY: 0,
          cropChangeX: 0,
          cropChangeY: 0,
          cropOffsertX: 0,
          cropOffsertY: 0,
          support: "",
          touches: [],
          touchNow: !1,
          rotate: 0,
          isIos: !1,
          orientation: 0,
          imgs: "",
          coe: .2,
          scaling: !1,
          scalingSet: "",
          coeStatus: ""
        }
      },
      props: {
        img: {type: [String, Blob, null, File], default: ""},
        outputSize: {type: Number, default: 1},
        outputType: {type: String, default: "jpeg"},
        info: {type: Boolean, default: !0},
        canScale: {type: Boolean, default: !0},
        autoCrop: {type: Boolean, default: !1},
        autoCropWidth: {type: Number, default: 0},
        autoCropHeight: {type: Number, default: 0},
        fixed: {type: Boolean, default: !1},
        fixedNumber: {
          type: Array, default: function () {
            return [1, 1]
          }
        },
        fixedBox: {type: Boolean, default: !1},
        full: {type: Boolean, default: !1},
        canMove: {type: Boolean, default: !0},
        canMoveBox: {type: Boolean, default: !0},
        original: {type: Boolean, default: !1},
        centerBox: {type: Boolean, default: !1},
        high: {type: Boolean, default: !0},
        infoTrue: {type: Boolean, default: !1},
        maxImgSize: {type: Number, default: 2e3}
      },
      computed: {
        cropInfo: function () {
          var e = {};
          if (e.top = this.cropOffsertY > 21 ? "-21px" : "0px", e.width = this.cropW > 0 ? this.cropW : 0, e.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
            if (this.high && !this.full) {
              var t = window.devicePixelRatio;
              e.width = e.width * t, e.height = e.height * t
            }
            this.full && (e.width = e.width / this.scale, e.height = e.height / this.scale)
          }
          return e.width = ~~e.width, e.height = ~~e.height, e
        }
      },
      watch: {
        img: function () {
          this.checkedImg()
        }, imgs: function (e) {
          "" !== e && this.reload()
        }, cropW: function () {
          this.cropW = ~~this.cropW, this.showPreview()
        }, cropH: function () {
          this.cropH = ~~this.cropH, this.showPreview()
        }, cropOffsertX: function () {
          this.showPreview()
        }, cropOffsertY: function () {
          this.showPreview()
        }, scale: function (e, t) {
          this.showPreview()
        }, x: function () {
          this.showPreview()
        }, y: function () {
          this.showPreview()
        }, autoCrop: function (e) {
          e && this.goAutoCrop()
        }, rotate: function () {
          this.showPreview(), this.autoCrop && this.goAutoCrop(this.cropW, this.cropH)
        }
      },
      methods: {
        checkOrientationImage: function (e, t, o, r) {
          var i = this, n = document.createElement("canvas"), a = n.getContext("2d");
          switch (a.save(), t) {
            case 2:
              n.width = o, n.height = r, a.translate(o, 0), a.scale(-1, 1);
              break;
            case 3:
              n.width = o, n.height = r, a.translate(o / 2, r / 2), a.rotate(180 * Math.PI / 180), a.translate(-o / 2, -r / 2);
              break;
            case 4:
              n.width = o, n.height = r, a.translate(0, r), a.scale(1, -1);
              break;
            case 5:
              n.height = o, n.width = r, a.rotate(.5 * Math.PI), a.scale(1, -1);
              break;
            case 6:
              n.width = r, n.height = o, a.translate(r / 2, o / 2), a.rotate(90 * Math.PI / 180), a.translate(-o / 2, -r / 2);
              break;
            case 7:
              n.height = o, n.width = r, a.rotate(.5 * Math.PI), a.translate(o, -r), a.scale(-1, 1);
              break;
            case 8:
              n.height = o, n.width = r, a.translate(r / 2, o / 2), a.rotate(-90 * Math.PI / 180), a.translate(-o / 2, -r / 2);
              break;
            default:
              n.width = o, n.height = r
          }
          a.drawImage(e, 0, 0, o, r), a.restore(), n.toBlob(function (e) {
            var t = URL.createObjectURL(e);
            i.imgs = t
          }, "image/" + this.outputType, 1)
        }, checkedImg: function () {
          var e = this;
          if ("" !== this.img) {
            this.loading = !0, this.scale = 1, this.clearCrop();
            var t = new Image;
            t.onload = function () {
              if ("" === e.img) return e.$emit("imgLoad", "error"), !1;
              var o = t.width, r = t.height;
              i.default.getData(t, function () {
                i.default.getAllTags(t), e.orientation = i.default.getTag(t, "Orientation");
                var n = e.maxImgSize;
                if (!e.orientation && o < n & r < n) return void(e.imgs = e.img);
                o > n && (r = r / o * n, o = n), r > n && (o = o / r * n, r = n), e.checkOrientationImage(t, e.orientation, o, r)
              })
            }, t.onerror = function () {
              e.$emit("imgLoad", "error")
            }, t.crossOrigin = "*", t.src = this.img
          }
        }, startMove: function (e) {
          if (e.preventDefault(), this.move && !this.crop) {
            if (!this.canMove) return !1;
            this.moveX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.x, this.moveY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.y, e.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), 2 == e.touches.length && (this.touches = e.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancleTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("imgMoving", {
              moving: !0,
              axis: this.getImgAxis()
            })
          } else this.cropping = !0, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = e.offsetX ? e.offsetX : e.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = e.offsetY ? e.offsetY : e.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = e.clientX ? e.clientX : e.touches[0].clientX, this.cropY = e.clientY ? e.clientY : e.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0
        }, touchScale: function (e) {
          var t = this;
          e.preventDefault();
          var o = this.scale, r = {x: this.touches[0].clientX, y: this.touches[0].clientY},
            i = {x: e.touches[0].clientX, y: e.touches[0].clientY},
            n = {x: this.touches[1].clientX, y: this.touches[1].clientY},
            a = {x: e.touches[1].clientX, y: e.touches[1].clientY},
            s = Math.sqrt(Math.pow(r.x - n.x, 2) + Math.pow(r.y - n.y, 2)),
            c = Math.sqrt(Math.pow(i.x - a.x, 2) + Math.pow(i.y - a.y, 2)), h = ~~(c - s), p = 1;
          p = p / this.trueWidth > p / this.trueHeight ? p / this.trueHeight : p / this.trueWidth, p = p > .1 ? .1 : p;
          var u = p * h;
          if (!this.touchNow) {
            if (this.touchNow = !0, h > 0 ? o += Math.abs(u) : h < 0 && o > Math.abs(u) && (o -= Math.abs(u)), this.touches = e.touches, setTimeout(function () {
                t.touchNow = !1
              }, 8), !this.checkoutImgAxis(this.x, this.y, o)) return !1;
            this.scale = o
          }
        }, cancleTouchScale: function (e) {
          window.removeEventListener("touchmove", this.touchScale)
        }, moveImg: function (e) {
          var t = this;
          if (e.preventDefault(), e.touches && 2 === e.touches.length) return this.touches = e.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancleTouchScale), window.removeEventListener("touchmove", this.moveImg), !1;
          var o = e.clientX ? e.clientX : e.touches[0].clientX, r = e.clientY ? e.clientY : e.touches[0].clientY,
            i = void 0, n = void 0;
          i = ~~(o - this.moveX), n = ~~(r - this.moveY), this.$nextTick(function () {
            if (t.centerBox) {
              var e = t.getImgAxis(i, n, t.scale), o = t.getCropAxis(), r = t.trueHeight * t.scale,
                a = t.trueWidth * t.scale, s = void 0, c = void 0, h = void 0, p = void 0;
              switch (t.rotate) {
                case 1:
                case-1:
                case 3:
                case-3:
                  s = t.cropOffsertX - t.trueWidth * (1 - t.scale) / 2 + (r - a) / 2, c = t.cropOffsertY - t.trueHeight * (1 - t.scale) / 2 + (a - r) / 2, h = s - r + t.cropW, p = c - a + t.cropH;
                  break;
                default:
                  s = t.cropOffsertX - t.trueWidth * (1 - t.scale) / 2, c = t.cropOffsertY - t.trueHeight * (1 - t.scale) / 2, h = s - a + t.cropW, p = c - r + t.cropH
              }
              e.x1 > o.x1 && (i = s - 1), e.y1 >= o.y1 && (n = c), e.x2 <= o.x2 && (i = h), e.y2 <= o.y2 && (n = p + 1)
            }
            t.x = i, t.y = n, t.$emit("imgMoving", {moving: !0, axis: t.getImgAxis()})
          })
        }, leaveImg: function (e) {
          window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("imgMoving", {
            moving: !1,
            axis: this.getImgAxis()
          })
        }, scaleImg: function () {
          this.support = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll", this.canScale && window.addEventListener(this.support, this.changeSize)
        }, cancleScale: function () {
          this.canScale && window.removeEventListener(this.support, this.changeSize)
        }, changeSize: function (e) {
          var t = this;
          e.preventDefault();
          var o = this.scale, r = e.deltaY || e.wheelDelta;
          r = navigator.userAgent.indexOf("Firefox") > 0 ? 30 * r : r;
          var i = this.coe;
          i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth;
          var n = i * r;
          n < 0 ? o += Math.abs(n) : o > Math.abs(n) && (o -= Math.abs(n));
          var a = n < 0 ? "add" : "reduce";
          if (a !== this.coeStatus && (this.coeStatus = a, this.coe = .2), this.scaling || (this.scalingSet = setTimeout(function () {
              t.scaling = !1, t.coe = t.coe += .01
            }, 50)), this.scaling = !0, !this.checkoutImgAxis(this.x, this.y, o)) return !1;
          this.scale = o
        }, changeScale: function (e) {
          var t = this.scale;
          e = e || 1;
          var o = 20;
          if (o = o / this.trueWidth > o / this.trueHeight ? o / this.trueHeight : o / this.trueWidth, e *= o, e > 0 ? t += Math.abs(e) : t > Math.abs(e) && (t -= Math.abs(e)), !this.checkoutImgAxis(this.x, this.y, t)) return !1;
          this.scale = t
        }, createCrop: function (e) {
          var t = this;
          e.preventDefault();
          var o = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0,
            r = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0;
          this.$nextTick(function () {
            var e = ~~(o - t.cropX), i = ~~(r - t.cropY);
            if (e > 0 ? (t.cropW = e + t.cropChangeX > t.w ? t.w - t.cropChangeX : e, t.cropOffsertX = t.cropChangeX) : (t.cropW = t.w - t.cropChangeX + Math.abs(e) > t.w ? t.cropChangeX : Math.abs(e), t.cropOffsertX = t.cropChangeX + e > 0 ? t.cropChangeX + e : 0), t.fixed) {
              var n = ~~(t.cropW / t.fixedNumber[0] * t.fixedNumber[1]);
              n + t.cropOffsertY > t.h ? (t.cropH = t.h - t.cropOffsertY, t.cropW = ~~(t.cropH / t.fixedNumber[1] * t.fixedNumber[0]), t.cropOffsertX = e > 0 ? t.cropChangeX : t.cropChangeX - t.cropW) : t.cropH = n, t.cropOffsertY = t.cropOffsertY
            } else i > 0 ? (t.cropH = i + t.cropChangeY > t.h ? t.h - t.cropChangeY : i, t.cropOffsertY = t.cropChangeY) : (t.cropH = t.h - t.cropChangeY + Math.abs(i) > t.h ? t.cropChangeY : Math.abs(i), t.cropOffsertY = t.cropChangeY + i > 0 ? t.cropChangeY + i : 0)
          })
        }, changeCropSize: function (e, t, o, r, i) {
          e.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = t, this.canChangeY = o, this.changeCropTypeX = r, this.changeCropTypeY = i, this.cropX = e.clientX ? e.clientX : e.touches[0].clientX, this.cropY = e.clientY ? e.clientY : e.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0)
        }, changeCropNow: function (e) {
          var t = this;
          e.preventDefault();
          var o = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0,
            r = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0, i = this.w, n = this.h, a = 0, s = 0;
          if (this.centerBox) {
            var c = this.getImgAxis(), h = c.x2, p = c.y2;
            a = c.x1 > 0 ? c.x1 : 0, s = c.y1 > 0 ? c.y1 : 0, i > h && (i = h), n > p && (n = p)
          }
          this.$nextTick(function () {
            var e = ~~(o - t.cropX), c = ~~(r - t.cropY);
            if (t.canChangeX && (1 === t.changeCropTypeX ? t.cropOldW - e > 0 ? (t.cropW = i - t.cropChangeX - e <= i - a ? t.cropOldW - e : t.cropOldW + t.cropChangeX - a, t.cropOffsertX = i - t.cropChangeX - e <= i - a ? t.cropChangeX + e : a) : (t.cropW = Math.abs(e) + t.cropChangeX <= i ? Math.abs(e) - t.cropOldW : i - t.cropOldW - t.cropChangeX, t.cropOffsertX = t.cropChangeX + t.cropOldW) : 2 === t.changeCropTypeX && (t.cropOldW + e > 0 ? (t.cropW = t.cropOldW + e + t.cropOffsertX <= i ? t.cropOldW + e : i - t.cropOffsertX, t.cropOffsertX = t.cropChangeX) : (t.cropW = i - t.cropChangeX + Math.abs(e + t.cropOldW) <= i - a ? Math.abs(e + t.cropOldW) : t.cropChangeX - a, t.cropOffsertX = i - t.cropChangeX + Math.abs(e + t.cropOldW) <= i - a ? t.cropChangeX - Math.abs(e + t.cropOldW) : a))), t.canChangeY && (1 === t.changeCropTypeY ? t.cropOldH - c > 0 ? (t.cropH = n - t.cropChangeY - c <= n - s ? t.cropOldH - c : t.cropOldH + t.cropChangeY - s, t.cropOffsertY = n - t.cropChangeY - c <= n - s ? t.cropChangeY + c : s) : (t.cropH = Math.abs(c) + t.cropChangeY <= n ? Math.abs(c) - t.cropOldH : n - t.cropOldH - t.cropChangeY, t.cropOffsertY = t.cropChangeY + t.cropOldH) : 2 === t.changeCropTypeY && (t.cropOldH + c > 0 ? (t.cropH = t.cropOldH + c + t.cropOffsertY <= n ? t.cropOldH + c : n - t.cropOffsertY, t.cropOffsertY = t.cropChangeY) : (t.cropH = n - t.cropChangeY + Math.abs(c + t.cropOldH) <= n - s ? Math.abs(c + t.cropOldH) : t.cropChangeY - s, t.cropOffsertY = n - t.cropChangeY + Math.abs(c + t.cropOldH) <= n - s ? t.cropChangeY - Math.abs(c + t.cropOldH) : s))), t.canChangeX && t.fixed) {
              var h = ~~(t.cropW / t.fixedNumber[0] * t.fixedNumber[1]);
              h + t.cropOffsertY > n ? (t.cropH = n - t.cropOffsertY, t.cropW = ~~(t.cropH / t.fixedNumber[1] * t.fixedNumber[0])) : t.cropH = h
            }
            if (t.canChangeY && t.fixed) {
              var p = ~~(t.cropH / t.fixedNumber[1] * t.fixedNumber[0]);
              p + t.cropOffsertX > i ? (t.cropW = i - t.cropOffsertX, t.cropH = ~~(t.cropW / t.fixedNumber[0] * t.fixedNumber[1])) : t.cropW = p
            }
          })
        }, changeCropEnd: function (e) {
          window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd)
        }, endCrop: function () {
          0 === this.cropW && 0 === this.cropH && (this.cropping = !1), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop)
        }, startCrop: function () {
          this.crop = !0
        }, stopCrop: function () {
          this.crop = !1
        }, clearCrop: function () {
          this.cropping = !1, this.cropW = 0, this.cropH = 0
        }, cropMove: function (e) {
          if (e.preventDefault(), !this.canMoveBox) return this.crop = !1, this.startMove(e), !1;
          if (e.touches && 2 === e.touches.length) return this.crop = !1, this.startMove(e), this.leaveCrop(), !1;
          window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
          var t = e.clientX ? e.clientX : e.touches[0].clientX, o = e.clientY ? e.clientY : e.touches[0].clientY,
            r = void 0, i = void 0;
          r = t - this.cropOffsertX, i = o - this.cropOffsertY, this.cropX = r, this.cropY = i, this.$emit("cropMoving", {
            moving: !0,
            axis: this.getCropAxis()
          })
        }, moveCrop: function (e, t) {
          var o = this, r = 0, i = 0;
          e && (e.preventDefault(), r = e.clientX ? e.clientX : e.touches[0].clientX, i = e.clientY ? e.clientY : e.touches[0].clientY), this.$nextTick(function () {
            var e = void 0, n = void 0, a = ~~(r - o.cropX), s = ~~(i - o.cropY);
            if (t && (a = o.cropOffsertX, s = o.cropOffsertY), e = a <= 1 ? 1 : ~~(a + o.cropW) > o.w ? o.w - o.cropW - 1 : a, n = s <= 1 ? 1 : ~~(s + o.cropH) > o.h ? o.h - o.cropH - 1 : s, o.centerBox) {
              var c = o.getImgAxis();
              e < c.x1 && (e = c.x1 + 1), e + o.cropW > c.x2 && (e = c.x2 - o.cropW), n < c.y1 && (n = c.y1), n + o.cropH > c.y2 && (n = c.y2 - o.cropH - 1)
            }
            o.cropOffsertX = e, o.cropOffsertY = n, o.$emit("cropMoving", {moving: !0, axis: o.getCropAxis()})
          })
        }, getImgAxis: function (e, t, o) {
          e = e || this.x, t = t || this.y, o = o || this.scale;
          var r = {x1: 0, x2: 0, y1: 0, y2: 0}, i = this.trueWidth * o, n = this.trueHeight * o;
          switch (this.rotate) {
            case 0:
              r.x1 = ~~(e + this.trueWidth * (1 - o) / 2), r.x2 = ~~(r.x1 + this.trueWidth * o), r.y1 = ~~(t + this.trueHeight * (1 - o) / 2), r.y2 = ~~(r.y1 + this.trueHeight * o);
              break;
            case 1:
            case-1:
            case 3:
            case-3:
              r.x1 = ~~(e + this.trueWidth * (1 - o) / 2) + (i - n) / 2, r.x2 = ~~(r.x1 + this.trueHeight * o), r.y1 = ~~(t + this.trueHeight * (1 - o) / 2) + (n - i) / 2, r.y2 = ~~(r.y1 + this.trueWidth * o);
              break;
            default:
              r.x1 = ~~(e + this.trueWidth * (1 - o) / 2), r.x2 = ~~(r.x1 + this.trueWidth * o), r.y1 = ~~(t + this.trueHeight * (1 - o) / 2), r.y2 = ~~(r.y1 + this.trueHeight * o)
          }
          return r
        }, getCropAxis: function () {
          var e = {x1: 0, x2: 0, y1: 0, y2: 0};
          return e.x1 = this.cropOffsertX, e.x2 = e.x1 + this.cropW, e.y1 = this.cropOffsertY, e.y2 = e.y1 + this.cropH, e
        }, leaveCrop: function (e) {
          window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("cropMoving", {
            moving: !1,
            axis: this.getCropAxis()
          })
        }, getCropData: function (e) {
          var t = this, o = document.createElement("canvas"), r = new Image, i = this.rotate, n = this.trueWidth,
            a = this.trueHeight, s = this.cropOffsertX, c = this.cropOffsertY;
          r.onload = function () {
            if (0 != ~~t.cropW) {
              var h = o.getContext("2d"), p = 1;
              t.high & !t.full && (p = window.devicePixelRatio);
              var u = t.cropW * p, l = t.cropH * p, d = n * t.scale * p, f = a * t.scale * p,
                g = (t.x - s + t.trueWidth * (1 - t.scale) / 2) * p,
                m = (t.y - c + t.trueHeight * (1 - t.scale) / 2) * p;
              switch (o.width = u, o.height = l, h.save(), i) {
                case 0:
                  t.full ? (o.width = u / t.scale, o.height = l / t.scale, h.drawImage(r, g / t.scale, m / t.scale, d / t.scale, f / t.scale)) : h.drawImage(r, g, m, d, f);
                  break;
                case 1:
                case-3:
                  t.full ? (o.width = u / t.scale, o.height = l / t.scale, g = g / t.scale + (d / t.scale - f / t.scale) / 2, m = m / t.scale + (f / t.scale - d / t.scale) / 2, h.rotate(90 * i * Math.PI / 180), h.drawImage(r, m, -g - f / t.scale, d / t.scale, f / t.scale)) : (g += (d - f) / 2, m += (f - d) / 2, h.rotate(90 * i * Math.PI / 180), h.drawImage(r, m, -g - f, d, f));
                  break;
                case 2:
                case-2:
                  t.full ? (o.width = u / t.scale, o.height = l / t.scale, h.rotate(90 * i * Math.PI / 180), g /= t.scale, m /= t.scale, h.drawImage(r, -g - d / t.scale, -m - f / t.scale, d / t.scale, f / t.scale)) : (h.rotate(90 * i * Math.PI / 180), h.drawImage(r, -g - d, -m - f, d, f));
                  break;
                case 3:
                case-1:
                  t.full ? (o.width = u / t.scale, o.height = l / t.scale, g = g / t.scale + (d / t.scale - f / t.scale) / 2, m = m / t.scale + (f / t.scale - d / t.scale) / 2, h.rotate(90 * i * Math.PI / 180), h.drawImage(r, -m - d / t.scale, g, d / t.scale, f / t.scale)) : (g += (d - f) / 2, m += (f - d) / 2, h.rotate(90 * i * Math.PI / 180), h.drawImage(r, -m - d, g, d, f));
                  break;
                default:
                  t.full ? (o.width = u / t.scale, o.height = l / t.scale, h.drawImage(r, g / t.scale, m / t.scale, d / t.scale, f / t.scale)) : h.drawImage(r, g, m, d, f)
              }
              h.restore()
            } else {
              var v = n * t.scale, w = a * t.scale, x = o.getContext("2d");
              switch (x.save(), i) {
                case 0:
                  o.width = v, o.height = w, x.drawImage(r, 0, 0, v, w);
                  break;
                case 1:
                case-3:
                  o.width = w, o.height = v, x.rotate(90 * i * Math.PI / 180), x.drawImage(r, 0, -w, v, w);
                  break;
                case 2:
                case-2:
                  o.width = v, o.height = w, x.rotate(90 * i * Math.PI / 180), x.drawImage(r, -v, -w, v, w);
                  break;
                case 3:
                case-1:
                  o.width = w, o.height = v, x.rotate(90 * i * Math.PI / 180), x.drawImage(r, -v, 0, v, w);
                  break;
                default:
                  o.width = v, o.height = w, x.drawImage(r, 0, 0, v, w)
              }
              x.restore()
            }
            var C = o.toDataURL("image/" + t.outputType, t.outputSize);
            e(C)
          }, "data" !== this.img.substr(0, 4) && (r.crossOrigin = "anonymous"), r.src = this.imgs
        }, getCropBlob: function (e) {
          this.getCropData(function (t) {
            for (var o = t.split(","), r = o[0].match(/:(.*?);/)[1], i = atob(o[1]), n = i.length, a = new Uint8Array(n); n--;) a[n] = i.charCodeAt(n);
            e(new Blob([a], {type: r}))
          })
        }, showPreview: function () {
          var e = {};
          e.div = {width: this.cropW + "px", height: this.cropH + "px"}, e.img = {
            width: this.trueWidth + "px",
            height: this.trueHeight + "px",
            transform: "scale(" + this.scale + "," + this.scale + ") translate3d(" + (this.x - this.cropOffsertX) / this.scale + "px," + (this.y - this.cropOffsertY) / this.scale + "px,0)rotateZ(" + 90 * this.rotate + "deg)"
          }, e.w = this.cropW, e.h = this.cropH, e.url = this.imgs, this.$emit("realTime", e)
        }, reload: function () {
          var e = this, t = new Image;
          t.onload = function () {
            e.w = ~~window.getComputedStyle(e.$refs.cropper).width.replace("px", ""), e.h = ~~window.getComputedStyle(e.$refs.cropper).height.replace("px", ""), e.trueWidth = t.width, e.trueHeight = t.height, e.original ? e.scale = 1 : (e.trueWidth > e.w && (e.scale = e.w / e.trueWidth), e.trueHeight * e.scale > e.h && (e.scale = e.h / e.trueHeight)), e.$nextTick(function () {
              e.x = -(e.trueWidth - e.trueWidth * e.scale) / 2 + (e.w - e.trueWidth * e.scale) / 2, e.y = -(e.trueHeight - e.trueHeight * e.scale) / 2 + (e.h - e.trueHeight * e.scale) / 2, e.loading = !1, e.autoCrop && e.goAutoCrop(), e.$emit("imgLoad", "success")
            })
          }, t.onerror = function () {
            e.$emit("imgLoad", "error")
          }, t.src = this.imgs
        }, goAutoCrop: function (e, t) {
          this.clearCrop(), this.cropping = !0;
          var o = this.w, r = this.h;
          if (this.centerBox) {
            var i = this.trueWidth * this.scale, n = this.trueHeight * this.scale;
            o = i < o ? i : o, r = n < r ? n : r
          }
          var a = e || this.autoCropWidth, s = t || this.autoCropHeight;
          0 !== a && 0 !== s || (a = .8 * o, s = .8 * r), a = a > o ? o : a, s = s > r ? r : s, this.fixed && (s = a / this.fixedNumber[0] * this.fixedNumber[1]), s > this.h && (s = this.h, a = s / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(a, s)
        }, changeCrop: function (e, t) {
          var o = this;
          this.cropW = e, this.cropH = t, this.cropOffsertX = (this.w - e) / 2, this.cropOffsertY = (this.h - t) / 2, this.centerBox && this.$nextTick(function () {
            o.moveCrop(null, !0)
          })
        }, refresh: function () {
          var e = this;
          this.img;
          this.imgs = "", this.scale = 1, this.crop = !1, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.clearCrop(), this.$nextTick(function () {
            e.checkedImg()
          })
        }, rotateLeft: function () {
          this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1
        }, rotateRight: function () {
          this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1
        }, rotateClear: function () {
          this.rotate = 0
        }, checkoutImgAxis: function (e, t, o) {
          e = e || this.x, t = t || this.y, o = o || this.scale;
          var r = !0;
          if (this.centerBox) {
            var i = this.getImgAxis(e, t, o), n = this.getCropAxis();
            i.x1 >= n.x1 && (r = !1), i.x2 <= n.x2 && (r = !1), i.y1 >= n.y1 && (r = !1), i.y2 <= n.y2 && (r = !1)
          }
          return r
        }
      },
      mounted: function () {
        var e = this;
        this.showPreview(), this.checkedImg();
        var t = navigator.userAgent;
        this.isIOS = !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
          value: function (t, o, r) {
            for (var i = atob(this.toDataURL(o, r).split(",")[1]), n = i.length, a = new Uint8Array(n), s = 0; s < n; s++) a[s] = i.charCodeAt(s);
            t(new Blob([a], {type: e.type || "image/png"}))
          }
        })
      },
      destroyed: function () {
        window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop)
      }
    }
  }, function (e, t, o) {
    "use strict";

    function r(e) {
      o(8)
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var i = o(0), n = o.n(i);
    for (var a in i) ["default", "default"].indexOf(a) < 0 && function (e) {
      o.d(t, e, function () {
        return i[e]
      })
    }(a);
    var s = o(7), c = o(6), h = r, p = o.i(c.a)(n.a, s.a, s.b, !1, h, "data-v-7b077dd1", null);
    t.default = p.exports
  }, function (e, t, o) {
    "use strict";
    var r = o(1);
    e.exports = r
  }, function (e, t, o) {
    t = e.exports = o(4)(), t.push([e.i, '.vue-cropper[data-v-7b077dd1]{position:relative;width:100%;height:100%;box-sizing:border-box;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;direction:ltr;touch-action:none;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")}.cropper-box-canvas[data-v-7b077dd1],.cropper-box[data-v-7b077dd1],.cropper-crop-box[data-v-7b077dd1],.cropper-drag-box[data-v-7b077dd1],.cropper-face[data-v-7b077dd1]{position:absolute;top:0;right:0;bottom:0;left:0;user-select:none}.cropper-box-canvas img[data-v-7b077dd1]{position:relative;text-align:left;user-select:none;transform:none;max-width:none;max-height:none}.cropper-box[data-v-7b077dd1]{overflow:hidden}.cropper-move[data-v-7b077dd1]{cursor:move}.cropper-crop[data-v-7b077dd1]{cursor:crosshair}.cropper-modal[data-v-7b077dd1]{background:rgba(0,0,0,.5)}.cropper-view-box[data-v-7b077dd1]{display:block;overflow:hidden;width:100%;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);user-select:none}.cropper-view-box img[data-v-7b077dd1]{user-select:none;text-align:left;max-width:none;max-height:none}.cropper-face[data-v-7b077dd1]{top:0;left:0;background-color:#fff;opacity:.1}.crop-info[data-v-7b077dd1]{position:absolute;left:0;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.8);font-size:12px}.crop-line[data-v-7b077dd1]{position:absolute;display:block;width:100%;height:100%;opacity:.1}.line-w[data-v-7b077dd1]{top:-3px;left:0;height:5px;cursor:n-resize}.line-a[data-v-7b077dd1]{top:0;left:-3px;width:5px;cursor:w-resize}.line-s[data-v-7b077dd1]{bottom:-3px;left:0;height:5px;cursor:s-resize}.line-d[data-v-7b077dd1]{top:0;right:-3px;width:5px;cursor:e-resize}.crop-point[data-v-7b077dd1]{position:absolute;width:8px;height:8px;opacity:.75;background-color:#39f;border-radius:100%}.point1[data-v-7b077dd1]{top:-4px;left:-4px;cursor:nw-resize}.point2[data-v-7b077dd1]{top:-5px;left:50%;margin-left:-3px;cursor:n-resize}.point3[data-v-7b077dd1]{top:-4px;right:-4px;cursor:ne-resize}.point4[data-v-7b077dd1]{top:50%;left:-4px;margin-top:-3px;cursor:w-resize}.point5[data-v-7b077dd1]{top:50%;right:-4px;margin-top:-3px;cursor:w-resize}.point6[data-v-7b077dd1]{bottom:-5px;left:-4px;cursor:sw-resize}.point7[data-v-7b077dd1]{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize}.point8[data-v-7b077dd1]{bottom:-5px;right:-4px;cursor:nw-resize}@media screen and (max-width:500px){.crop-point[data-v-7b077dd1]{position:absolute;width:20px;height:20px;opacity:.45;background-color:#39f;border-radius:100%}.point1[data-v-7b077dd1]{top:-10px;left:-10px}.point2[data-v-7b077dd1],.point4[data-v-7b077dd1],.point5[data-v-7b077dd1],.point7[data-v-7b077dd1]{display:none}.point3[data-v-7b077dd1]{top:-10px;right:-10px}.point4[data-v-7b077dd1]{top:0;left:0}.point6[data-v-7b077dd1]{bottom:-10px;left:-10px}.point8[data-v-7b077dd1]{bottom:-10px;right:-10px}}', ""])
  }, function (e, t) {
    e.exports = function () {
      var e = [];
      return e.toString = function () {
        for (var e = [], t = 0; t < this.length; t++) {
          var o = this[t];
          o[2] ? e.push("@media " + o[2] + "{" + o[1] + "}") : e.push(o[1])
        }
        return e.join("")
      }, e.i = function (t, o) {
        "string" == typeof t && (t = [[null, t, ""]]);
        for (var r = {}, i = 0; i < this.length; i++) {
          var n = this[i][0];
          "number" == typeof n && (r[n] = !0)
        }
        for (i = 0; i < t.length; i++) {
          var a = t[i];
          "number" == typeof a[0] && r[a[0]] || (o && !a[2] ? a[2] = o : o && (a[2] = "(" + a[2] + ") and (" + o + ")"), e.push(a))
        }
      }, e
    }
  }, function (e, t, o) {
    var r, i;
    (function () {
      function o(e) {
        return !!e.exifdata
      }

      function a(e, t) {
        t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
        for (var o = atob(e), r = o.length, i = new ArrayBuffer(r), n = new Uint8Array(i), a = 0; a < r; a++) n[a] = o.charCodeAt(a);
        return i
      }

      function s(e, t) {
        var o = new XMLHttpRequest;
        o.open("GET", e, !0), o.responseType = "blob", o.onload = function (e) {
          200 != this.status && 0 !== this.status || t(this.response)
        }, o.send()
      }

      function c(e, t) {
        function o(o) {
          var r = h(o);
          e.exifdata = r || {};
          var i = p(o);
          if (e.iptcdata = i || {}, y.isXmpEnabled) {
            var n = w(o);
            e.xmpdata = n || {}
          }
          t && t.call(e)
        }

        if (e.src) if (/^data\:/i.test(e.src)) {
          var r = a(e.src);
          o(r)
        } else if (/^blob\:/i.test(e.src)) {
          var i = new FileReader;
          i.onload = function (e) {
            o(e.target.result)
          }, s(e.src, function (e) {
            i.readAsArrayBuffer(e)
          })
        } else {
          var n = new XMLHttpRequest;
          n.onload = function () {
            if (200 != this.status && 0 !== this.status) throw"Could not load image";
            o(n.response), n = null
          }, n.open("GET", e.src, !0), n.responseType = "arraybuffer", n.send(null)
        } else if (self.FileReader && (e instanceof self.Blob || e instanceof self.File)) {
          var i = new FileReader;
          i.onload = function (e) {
            b && console.log("Got file of length " + e.target.result.byteLength), o(e.target.result)
          }, i.readAsArrayBuffer(e)
        }
      }

      function h(e) {
        var t = new DataView(e);
        if (b && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return b && console.log("Not a valid JPEG"), !1;
        for (var o, r = 2, i = e.byteLength; r < i;) {
          if (255 != t.getUint8(r)) return b && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)), !1;
          if (o = t.getUint8(r + 1), b && console.log(o), 225 == o) return b && console.log("Found 0xFFE1 marker"), v(t, r + 4, t.getUint16(r + 2));
          r += 2 + t.getUint16(r + 2)
        }
      }

      function p(e) {
        var t = new DataView(e);
        if (b && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return b && console.log("Not a valid JPEG"), !1;
        for (var o = 2, r = e.byteLength; o < r;) {
          if (function (e, t) {
              return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
            }(t, o)) {
            var i = t.getUint8(o + 7);
            i % 2 != 0 && (i += 1), 0 === i && (i = 4);
            return u(e, o + 8 + i, t.getUint16(o + 6 + i))
          }
          o++
        }
      }

      function u(e, t, o) {
        for (var r, i, n, a, s = new DataView(e), c = {}, h = t; h < t + o;) 28 === s.getUint8(h) && 2 === s.getUint8(h + 1) && (a = s.getUint8(h + 2)) in Y && (n = s.getInt16(h + 3), n + 5, i = Y[a], r = m(s, h + 5, n), c.hasOwnProperty(i) ? c[i] instanceof Array ? c[i].push(r) : c[i] = [c[i], r] : c[i] = r), h++;
        return c
      }

      function l(e, t, o, r, i) {
        var n, a, s, c = e.getUint16(o, !i), h = {};
        for (s = 0; s < c; s++) n = o + 12 * s + 2, a = r[e.getUint16(n, !i)], !a && b && console.log("Unknown tag: " + e.getUint16(n, !i)), h[a] = d(e, n, t, o, i);
        return h
      }

      function d(e, t, o, r, i) {
        var n, a, s, c, h, p, u = e.getUint16(t + 2, !i), l = e.getUint32(t + 4, !i), d = e.getUint32(t + 8, !i) + o;
        switch (u) {
          case 1:
          case 7:
            if (1 == l) return e.getUint8(t + 8, !i);
            for (n = l > 4 ? d : t + 8, a = [], c = 0; c < l; c++) a[c] = e.getUint8(n + c);
            return a;
          case 2:
            return n = l > 4 ? d : t + 8, m(e, n, l - 1);
          case 3:
            if (1 == l) return e.getUint16(t + 8, !i);
            for (n = l > 2 ? d : t + 8, a = [], c = 0; c < l; c++) a[c] = e.getUint16(n + 2 * c, !i);
            return a;
          case 4:
            if (1 == l) return e.getUint32(t + 8, !i);
            for (a = [], c = 0; c < l; c++) a[c] = e.getUint32(d + 4 * c, !i);
            return a;
          case 5:
            if (1 == l) return h = e.getUint32(d, !i), p = e.getUint32(d + 4, !i), s = new Number(h / p), s.numerator = h, s.denominator = p, s;
            for (a = [], c = 0; c < l; c++) h = e.getUint32(d + 8 * c, !i), p = e.getUint32(d + 4 + 8 * c, !i), a[c] = new Number(h / p), a[c].numerator = h, a[c].denominator = p;
            return a;
          case 9:
            if (1 == l) return e.getInt32(t + 8, !i);
            for (a = [], c = 0; c < l; c++) a[c] = e.getInt32(d + 4 * c, !i);
            return a;
          case 10:
            if (1 == l) return e.getInt32(d, !i) / e.getInt32(d + 4, !i);
            for (a = [], c = 0; c < l; c++) a[c] = e.getInt32(d + 8 * c, !i) / e.getInt32(d + 4 + 8 * c, !i);
            return a
        }
      }

      function f(e, t, o) {
        var r = e.getUint16(t, !o);
        return e.getUint32(t + 2 + 12 * r, !o)
      }

      function g(e, t, o, r) {
        var i = f(e, t + o, r);
        if (!i) return {};
        if (i > e.byteLength) return {};
        var n = l(e, t, t + i, P, r);
        if (n.Compression) switch (n.Compression) {
          case 6:
            if (n.JpegIFOffset && n.JpegIFByteCount) {
              var a = t + n.JpegIFOffset, s = n.JpegIFByteCount;
              n.blob = new Blob([new Uint8Array(e.buffer, a, s)], {type: "image/jpeg"})
            }
            break;
          case 1:
            console.log("Thumbnail image format is TIFF, which is not implemented.");
            break;
          default:
            console.log("Unknown thumbnail image format '%s'", n.Compression)
        } else 2 == n.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
        return n
      }

      function m(e, t, o) {
        var r = "";
        for (n = t; n < t + o; n++) r += String.fromCharCode(e.getUint8(n));
        return r
      }

      function v(e, t) {
        if ("Exif" != m(e, t, 4)) return b && console.log("Not valid EXIF data! " + m(e, t, 4)), !1;
        var o, r, i, n, a, s = t + 6;
        if (18761 == e.getUint16(s)) o = !1; else {
          if (19789 != e.getUint16(s)) return b && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
          o = !0
        }
        if (42 != e.getUint16(s + 2, !o)) return b && console.log("Not valid TIFF data! (no 0x002A)"), !1;
        var c = e.getUint32(s + 4, !o);
        if (c < 8) return b && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !o)), !1;
        if (r = l(e, s, s + c, I, o), r.ExifIFDPointer) {
          n = l(e, s, s + r.ExifIFDPointer, S, o);
          for (i in n) {
            switch (i) {
              case"LightSource":
              case"Flash":
              case"MeteringMode":
              case"ExposureProgram":
              case"SensingMethod":
              case"SceneCaptureType":
              case"SceneType":
              case"CustomRendered":
              case"WhiteBalance":
              case"GainControl":
              case"Contrast":
              case"Saturation":
              case"Sharpness":
              case"SubjectDistanceRange":
              case"FileSource":
                n[i] = X[i][n[i]];
                break;
              case"ExifVersion":
              case"FlashpixVersion":
                n[i] = String.fromCharCode(n[i][0], n[i][1], n[i][2], n[i][3]);
                break;
              case"ComponentsConfiguration":
                n[i] = X.Components[n[i][0]] + X.Components[n[i][1]] + X.Components[n[i][2]] + X.Components[n[i][3]]
            }
            r[i] = n[i]
          }
        }
        if (r.GPSInfoIFDPointer) {
          a = l(e, s, s + r.GPSInfoIFDPointer, O, o);
          for (i in a) {
            switch (i) {
              case"GPSVersionID":
                a[i] = a[i][0] + "." + a[i][1] + "." + a[i][2] + "." + a[i][3]
            }
            r[i] = a[i]
          }
        }
        return r.thumbnail = g(e, s, c, o), r
      }

      function w(e) {
        if ("DOMParser" in self) {
          var t = new DataView(e);
          if (b && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return b && console.log("Not a valid JPEG"), !1;
          for (var o = 2, r = e.byteLength, i = new DOMParser; o < r - 4;) {
            if ("http" == m(t, o, 4)) {
              var n = o - 1, a = t.getUint16(o - 2) - 1, s = m(t, n, a), c = s.indexOf("xmpmeta>") + 8;
              s = s.substring(s.indexOf("<x:xmpmeta"), c);
              var h = s.indexOf("x:xmpmeta") + 10;
              s = s.slice(0, h) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + s.slice(h);
              return C(i.parseFromString(s, "text/xml"))
            }
            o++
          }
        }
      }

      function x(e) {
        var t = {};
        if (1 == e.nodeType) {
          if (e.attributes.length > 0) {
            t["@attributes"] = {};
            for (var o = 0; o < e.attributes.length; o++) {
              var r = e.attributes.item(o);
              t["@attributes"][r.nodeName] = r.nodeValue
            }
          }
        } else if (3 == e.nodeType) return e.nodeValue;
        if (e.hasChildNodes()) for (var i = 0; i < e.childNodes.length; i++) {
          var n = e.childNodes.item(i), a = n.nodeName;
          if (null == t[a]) t[a] = x(n); else {
            if (null == t[a].push) {
              var s = t[a];
              t[a] = [], t[a].push(s)
            }
            t[a].push(x(n))
          }
        }
        return t
      }

      function C(e) {
        try {
          var t = {};
          if (e.children.length > 0) for (var o = 0; o < e.children.length; o++) {
            var r = e.children.item(o), i = r.attributes;
            for (var n in i) {
              var a = i[n], s = a.nodeName, c = a.nodeValue;
              void 0 !== s && (t[s] = c)
            }
            var h = r.nodeName;
            if (void 0 === t[h]) t[h] = x(r); else {
              if (void 0 === t[h].push) {
                var p = t[h];
                t[h] = [], t[h].push(p)
              }
              t[h].push(x(r))
            }
          } else t = e.textContent;
          return t
        } catch (e) {
          console.log(e.message)
        }
      }

      var b = !1, y = function (e) {
        return e instanceof y ? e : this instanceof y ? void(this.EXIFwrapped = e) : new y(e)
      };
      void 0 !== e && e.exports && (t = e.exports = y), t.EXIF = y;
      var S = y.Tags = {
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubsecTime",
        37521: "SubsecTimeOriginal",
        37522: "SubsecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "ISOSpeedRatings",
        34856: "OECF",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRation",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        40965: "InteroperabilityIFDPointer",
        42016: "ImageUniqueID"
      }, I = y.TiffTags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright"
      }, O = y.GPSTags = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential"
      }, P = y.IFD1Tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        273: "StripOffsets",
        274: "Orientation",
        277: "SamplesPerPixel",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        282: "XResolution",
        283: "YResolution",
        284: "PlanarConfiguration",
        296: "ResolutionUnit",
        513: "JpegIFOffset",
        514: "JpegIFByteCount",
        529: "YCbCrCoefficients",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        532: "ReferenceBlackWhite"
      }, X = y.StringValues = {
        ExposureProgram: {
          0: "Not defined",
          1: "Manual",
          2: "Normal program",
          3: "Aperture priority",
          4: "Shutter priority",
          5: "Creative program",
          6: "Action program",
          7: "Portrait mode",
          8: "Landscape mode"
        },
        MeteringMode: {
          0: "Unknown",
          1: "Average",
          2: "CenterWeightedAverage",
          3: "Spot",
          4: "MultiSpot",
          5: "Pattern",
          6: "Partial",
          255: "Other"
        },
        LightSource: {
          0: "Unknown",
          1: "Daylight",
          2: "Fluorescent",
          3: "Tungsten (incandescent light)",
          4: "Flash",
          9: "Fine weather",
          10: "Cloudy weather",
          11: "Shade",
          12: "Daylight fluorescent (D 5700 - 7100K)",
          13: "Day white fluorescent (N 4600 - 5400K)",
          14: "Cool white fluorescent (W 3900 - 4500K)",
          15: "White fluorescent (WW 3200 - 3700K)",
          17: "Standard light A",
          18: "Standard light B",
          19: "Standard light C",
          20: "D55",
          21: "D65",
          22: "D75",
          23: "D50",
          24: "ISO studio tungsten",
          255: "Other"
        },
        Flash: {
          0: "Flash did not fire",
          1: "Flash fired",
          5: "Strobe return light not detected",
          7: "Strobe return light detected",
          9: "Flash fired, compulsory flash mode",
          13: "Flash fired, compulsory flash mode, return light not detected",
          15: "Flash fired, compulsory flash mode, return light detected",
          16: "Flash did not fire, compulsory flash mode",
          24: "Flash did not fire, auto mode",
          25: "Flash fired, auto mode",
          29: "Flash fired, auto mode, return light not detected",
          31: "Flash fired, auto mode, return light detected",
          32: "No flash function",
          65: "Flash fired, red-eye reduction mode",
          69: "Flash fired, red-eye reduction mode, return light not detected",
          71: "Flash fired, red-eye reduction mode, return light detected",
          73: "Flash fired, compulsory flash mode, red-eye reduction mode",
          77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
          79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
          89: "Flash fired, auto mode, red-eye reduction mode",
          93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
          95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
          1: "Not defined",
          2: "One-chip color area sensor",
          3: "Two-chip color area sensor",
          4: "Three-chip color area sensor",
          5: "Color sequential area sensor",
          7: "Trilinear sensor",
          8: "Color sequential linear sensor"
        },
        SceneCaptureType: {0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"},
        SceneType: {1: "Directly photographed"},
        CustomRendered: {0: "Normal process", 1: "Custom process"},
        WhiteBalance: {0: "Auto white balance", 1: "Manual white balance"},
        GainControl: {0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down"},
        Contrast: {0: "Normal", 1: "Soft", 2: "Hard"},
        Saturation: {0: "Normal", 1: "Low saturation", 2: "High saturation"},
        Sharpness: {0: "Normal", 1: "Soft", 2: "Hard"},
        SubjectDistanceRange: {0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view"},
        FileSource: {3: "DSC"},
        Components: {0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B"}
      }, Y = {
        120: "caption",
        110: "credit",
        25: "keywords",
        55: "dateCreated",
        80: "byline",
        85: "bylineTitle",
        122: "captionWriter",
        105: "headline",
        116: "copyright",
        15: "category"
      };
      y.enableXmp = function () {
        y.isXmpEnabled = !0
      }, y.disableXmp = function () {
        y.isXmpEnabled = !1
      }, y.getData = function (e, t) {
        return !((self.Image && e instanceof self.Image || self.HTMLImageElement && e instanceof self.HTMLImageElement) && !e.complete) && (o(e) ? t && t.call(e) : c(e, t), !0)
      }, y.getTag = function (e, t) {
        if (o(e)) return e.exifdata[t]
      }, y.getIptcTag = function (e, t) {
        if (o(e)) return e.iptcdata[t]
      }, y.getAllTags = function (e) {
        if (!o(e)) return {};
        var t, r = e.exifdata, i = {};
        for (t in r) r.hasOwnProperty(t) && (i[t] = r[t]);
        return i
      }, y.getAllIptcTags = function (e) {
        if (!o(e)) return {};
        var t, r = e.iptcdata, i = {};
        for (t in r) r.hasOwnProperty(t) && (i[t] = r[t]);
        return i
      }, y.pretty = function (e) {
        if (!o(e)) return "";
        var t, r = e.exifdata, i = "";
        for (t in r) r.hasOwnProperty(t) && ("object" == typeof r[t] ? r[t] instanceof Number ? i += t + " : " + r[t] + " [" + r[t].numerator + "/" + r[t].denominator + "]\r\n" : i += t + " : [" + r[t].length + " values]\r\n" : i += t + " : " + r[t] + "\r\n");
        return i
      }, y.readFromBinaryFile = function (e) {
        return h(e)
      }, r = [], void 0 !== (i = function () {
        return y
      }.apply(t, r)) && (e.exports = i)
    }).call(this)
  }, function (e, t, o) {
    "use strict";

    function r(e, t, o, r, i, n, a, s) {
      e = e || {};
      var c = typeof e.default;
      "object" !== c && "function" !== c || (e = e.default);
      var h = "function" == typeof e ? e.options : e;
      t && (h.render = t, h.staticRenderFns = o, h._compiled = !0), r && (h.functional = !0), n && (h._scopeId = n);
      var p;
      if (a ? (p = function (e) {
          e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(a)
        }, h._ssrRegister = p) : i && (p = s ? function () {
          i.call(this, this.$root.$options.shadowRoot)
        } : i), p) if (h.functional) {
        h._injectStyles = p;
        var u = h.render;
        h.render = function (e, t) {
          return p.call(t), u(e, t)
        }
      } else {
        var l = h.beforeCreate;
        h.beforeCreate = l ? [].concat(l, p) : [p]
      }
      return {exports: e, options: h}
    }

    t.a = r
  }, function (e, t, o) {
    "use strict";
    o.d(t, "a", function () {
      return r
    }), o.d(t, "b", function () {
      return i
    });
    var r = function () {
      var e = this, t = e.$createElement, o = e._self._c || t;
      return o("div", {
        ref: "cropper",
        staticClass: "vue-cropper",
        on: {mouseover: e.scaleImg, mouseout: e.cancleScale}
      }, [o("div", {staticClass: "cropper-box"}, [o("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !e.loading,
          expression: "!loading"
        }],
        staticClass: "cropper-box-canvas",
        style: {
          width: e.trueWidth + "px",
          height: e.trueHeight + "px",
          transform: "scale(" + e.scale + "," + e.scale + ") translate3d(" + e.x / e.scale + "px," + e.y / e.scale + "px,0)rotateZ(" + 90 * e.rotate + "deg)"
        }
      }, [o("img", {
        ref: "cropperImg",
        attrs: {src: e.imgs, alt: "cropper-img"}
      })])]), e._v(" "), o("div", {
        staticClass: "cropper-drag-box",
        class: {"cropper-move": e.move && !e.crop, "cropper-crop": e.crop, "cropper-modal": e.cropping},
        on: {mousedown: e.startMove, touchstart: e.startMove}
      }), e._v(" "), o("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.cropping,
          expression: "cropping"
        }],
        staticClass: "cropper-crop-box",
        style: {
          width: e.cropW + "px",
          height: e.cropH + "px",
          transform: "translate3d(" + e.cropOffsertX + "px," + e.cropOffsertY + "px,0)"
        }
      }, [o("span", {staticClass: "cropper-view-box"}, [o("img", {
        style: {
          width: e.trueWidth + "px",
          height: e.trueHeight + "px",
          transform: "scale(" + e.scale + "," + e.scale + ") translate3d(" + (e.x - e.cropOffsertX) / e.scale + "px," + (e.y - e.cropOffsertY) / e.scale + "px,0)rotateZ(" + 90 * e.rotate + "deg)"
        }, attrs: {src: e.imgs, alt: "cropper-img"}
      })]), e._v(" "), o("span", {
        staticClass: "cropper-face cropper-move",
        on: {mousedown: e.cropMove, touchstart: e.cropMove}
      }), e._v(" "), e.info ? o("span", {
        staticClass: "crop-info",
        style: {top: e.cropInfo.top}
      }, [e._v("\n          " + e._s(this.cropInfo.width) + " × " + e._s(this.cropInfo.height) + "\n        ")]) : e._e(), e._v(" "), e.fixedBox ? e._e() : o("span", [o("span", {
        staticClass: "crop-line line-w",
        on: {
          mousedown: function (t) {
            e.changeCropSize(t, !1, !0, 0, 1)
          }, touchstart: function (t) {
            e.changeCropSize(t, !1, !0, 0, 1)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-line line-a", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !1, 1, 0)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !1, 1, 0)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-line line-s", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !1, !0, 0, 2)
          }, touchstart: function (t) {
            e.changeCropSize(t, !1, !0, 0, 2)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-line line-d", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !1, 2, 0)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !1, 2, 0)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point1", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !0, 1, 1)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !0, 1, 1)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point2", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !1, !0, 0, 1)
          }, touchstart: function (t) {
            e.changeCropSize(t, !1, !0, 0, 1)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point3", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !0, 2, 1)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !0, 2, 1)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point4", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !1, 1, 0)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !1, 1, 0)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point5", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !1, 2, 0)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !1, 2, 0)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point6", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !0, 1, 2)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !0, 1, 2)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point7", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !1, !0, 0, 2)
          }, touchstart: function (t) {
            e.changeCropSize(t, !1, !0, 0, 2)
          }
        }
      }), e._v(" "), o("span", {
        staticClass: "crop-point point8", on: {
          mousedown: function (t) {
            e.changeCropSize(t, !0, !0, 2, 2)
          }, touchstart: function (t) {
            e.changeCropSize(t, !0, !0, 2, 2)
          }
        }
      })])])])
    }, i = []
  }, function (e, t, o) {
    var r = o(3);
    "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
    var i = o(9).default;
    i("0f43175e", r, !0, {})
  }, function (e, t, o) {
    "use strict";

    function r(e, t, r, n) {
      g = r, v = n || {};
      var a = o.i(h.a)(e, t);
      return i(a), function (t) {
        for (var r = [], n = 0; n < a.length; n++) {
          var s = a[n], c = u[s.id];
          c.refs--, r.push(c)
        }
        t ? (a = o.i(h.a)(e, t), i(a)) : a = [];
        for (var n = 0; n < r.length; n++) {
          var c = r[n];
          if (0 === c.refs) {
            for (var p = 0; p < c.parts.length; p++) c.parts[p]();
            delete u[c.id]
          }
        }
      }
    }

    function i(e) {
      for (var t = 0; t < e.length; t++) {
        var o = e[t], r = u[o.id];
        if (r) {
          r.refs++;
          for (var i = 0; i < r.parts.length; i++) r.parts[i](o.parts[i]);
          for (; i < o.parts.length; i++) r.parts.push(a(o.parts[i]));
          r.parts.length > o.parts.length && (r.parts.length = o.parts.length)
        } else {
          for (var n = [], i = 0; i < o.parts.length; i++) n.push(a(o.parts[i]));
          u[o.id] = {id: o.id, refs: 1, parts: n}
        }
      }
    }

    function n() {
      var e = document.createElement("style");
      return e.type = "text/css", l.appendChild(e), e
    }

    function a(e) {
      var t, o, r = document.querySelector("style[" + w + '~="' + e.id + '"]');
      if (r) {
        if (g) return m;
        r.parentNode.removeChild(r)
      }
      if (x) {
        var i = f++;
        r = d || (d = n()), t = s.bind(null, r, i, !1), o = s.bind(null, r, i, !0)
      } else r = n(), t = c.bind(null, r), o = function () {
        r.parentNode.removeChild(r)
      };
      return t(e), function (r) {
        if (r) {
          if (r.css === e.css && r.media === e.media && r.sourceMap === e.sourceMap) return;
          t(e = r)
        } else o()
      }
    }

    function s(e, t, o, r) {
      var i = o ? "" : r.css;
      if (e.styleSheet) e.styleSheet.cssText = C(t, i); else {
        var n = document.createTextNode(i), a = e.childNodes;
        a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(n, a[t]) : e.appendChild(n)
      }
    }

    function c(e, t) {
      var o = t.css, r = t.media, i = t.sourceMap;
      if (r && e.setAttribute("media", r), v.ssrId && e.setAttribute(w, t.id), i && (o += "\n/*# sourceURL=" + i.sources[0] + " */", o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet) e.styleSheet.cssText = o; else {
        for (; e.firstChild;) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(o))
      }
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.default = r;
    var h = o(10), p = "undefined" != typeof document;
    if ("undefined" != typeof DEBUG && DEBUG && !p) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
    var u = {}, l = p && (document.head || document.getElementsByTagName("head")[0]), d = null, f = 0, g = !1,
      m = function () {
      }, v = null, w = "data-vue-ssr-id",
      x = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()), C = function () {
        var e = [];
        return function (t, o) {
          return e[t] = o, e.filter(Boolean).join("\n")
        }
      }()
  }, function (e, t, o) {
    "use strict";

    function r(e, t) {
      for (var o = [], r = {}, i = 0; i < t.length; i++) {
        var n = t[i], a = n[0], s = n[1], c = n[2], h = n[3], p = {id: e + ":" + i, css: s, media: c, sourceMap: h};
        r[a] ? r[a].parts.push(p) : o.push(r[a] = {id: a, parts: [p]})
      }
      return o
    }

    t.a = r
  }])
});