(function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* unused harmony export PopoverTransition */
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PopoverPopIn; });
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PopoverPopOut; });
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverMdPopIn; });
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PopoverMdPopOut; });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animations_animation__ = __webpack_require__(12);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions_page_transition__ = __webpack_require__(33);
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })()

/**
 * Animations for popover
 */
var PopoverTransition = (function (_super) {
    __extends(PopoverTransition, _super);
    function PopoverTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverTransition.prototype.mdPositionView = function (nativeEle, ev) {
        var originY = 'top';
        var originX = 'left';
        var popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
        // Popover content width and height
        var popoverEle = nativeEle.querySelector('.popover-content');
        var popoverDim = popoverEle.getBoundingClientRect();
        var popoverWidth = popoverDim.width;
        var popoverHeight = popoverDim.height;
        // Window body width and height
        var bodyWidth = this.plt.width();
        var bodyHeight = this.plt.height();
        // If ev was passed, use that for target element
        var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        var targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        var targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2) - (popoverWidth / 2);
        var targetHeight = targetDim && targetDim.height || 0;
        var popoverCSS = {
            top: targetTop,
            left: targetLeft
        };
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
            popoverCSS.left = POPOVER_MD_BODY_PADDING;
        }
        else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING;
            originX = 'right';
        }
        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            popoverCSS.top = targetTop - popoverHeight;
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
            // If there isn't room for it to pop up above the target cut it off
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
        }
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        popoverEle.style[this.plt.Css.transformOrigin] = originY + ' ' + originX;
        // Since the transition starts before styling is done we
        // want to wait for the styles to apply before showing the wrapper
        popoverWrapperEle.style.opacity = '1';
    };
    PopoverTransition.prototype.iosPositionView = function (nativeEle, ev) {
        var originY = 'top';
        var originX = 'left';
        var popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
        // Popover content width and height
        var popoverEle = nativeEle.querySelector('.popover-content');
        var popoverDim = popoverEle.getBoundingClientRect();
        var popoverWidth = popoverDim.width;
        var popoverHeight = popoverDim.height;
        // Window body width and height
        var bodyWidth = this.plt.width();
        var bodyHeight = this.plt.height();
        // If ev was passed, use that for target element
        var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        var targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        var targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2);
        var targetWidth = targetDim && targetDim.width || 0;
        var targetHeight = targetDim && targetDim.height || 0;
        // The arrow that shows above the popover on iOS
        var arrowEle = nativeEle.querySelector('.popover-arrow');
        var arrowDim = arrowEle.getBoundingClientRect();
        var arrowWidth = arrowDim.width;
        var arrowHeight = arrowDim.height;
        // If no ev was passed, hide the arrow
        if (!targetDim) {
            arrowEle.style.display = 'none';
        }
        var arrowCSS = {
            top: targetTop + targetHeight,
            left: targetLeft + (targetWidth / 2) - (arrowWidth / 2)
        };
        var popoverCSS = {
            top: targetTop + targetHeight + (arrowHeight - 1),
            left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
        }; 
        /*popoverCSS = {
            top: (bodyWidth/2)- (popoverHeight/2),
            left: (bodyHeight/2) - (popoverHeight/2)
        };*/
        
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        //
        var checkSafeAreaLeft = false;
        var checkSafeAreaRight = false;
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        // 25 is a random/arbitrary number. It seems to work fine for ios11
        // and iPhoneX. Is it perfect? No. Does it work? Yes.
        if (popoverCSS.left < (POPOVER_IOS_BODY_PADDING + 25)) {
            checkSafeAreaLeft = true;
            popoverCSS.left = POPOVER_IOS_BODY_PADDING;
        }
        else if ((popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25) > bodyWidth) {
            // Ok, so we're on the right side of the screen,
            // but now we need to make sure we're still a bit further right
            // cus....notchurally... Again, 25 is random. It works tho
            checkSafeAreaRight = true;
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING;
            originX = 'right';
        }
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            arrowCSS.top = targetTop - (arrowHeight + 1);
            popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1);
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
            // If there isn't room for it to pop up above the target cut it off
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
        }
        arrowEle.style.top = arrowCSS.top + 'px';
        arrowEle.style.left = arrowCSS.left + 'px';
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        if (checkSafeAreaLeft) {
            if (CSS.supports('left', 'constant(safe-area-inset-left)')) {
                popoverEle.style.left = "calc(" + popoverCSS.left + "px + constant(safe-area-inset-left)";
            }
            else if (CSS.supports('left', 'env(safe-area-inset-left)')) {
                popoverEle.style.left = "calc(" + popoverCSS.left + "px + env(safe-area-inset-left)";
            }
        }
        if (checkSafeAreaRight) {
            if (CSS.supports('right', 'constant(safe-area-inset-right)')) {
                popoverEle.style.left = "calc(" + popoverCSS.left + "px - constant(safe-area-inset-right)";
            }
            else if (CSS.supports('right', 'env(safe-area-inset-right)')) {
                popoverEle.style.left = "calc(" + popoverCSS.left + "px - env(safe-area-inset-right)";
            }
        }
        popoverEle.style[this.plt.Css.transformOrigin] = originY + ' ' + originX;
        // Since the transition starts before styling is done we
        // want to wait for the styles to apply before showing the wrapper
        popoverWrapperEle.style.opacity = '1';
    };
    return PopoverTransition;
}(__WEBPACK_IMPORTED_MODULE_1__transitions_page_transition__["a" /* PageTransition */]));


var PopoverPopIn = (function (_super) {
    __extends(PopoverPopIn, _super);
    function PopoverPopIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverPopIn.prototype.init = function () {
        var ele = this.enteringView.pageRef().nativeElement;
        var backdrop = new __WEBPACK_IMPORTED_MODULE_0__animations_animation__["a" /* Animation */](this.plt, ele.querySelector('ion-backdrop'));
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0__animations_animation__["a" /* Animation */](this.plt, ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);
        this
            .easing('ease')
            .duration(100)
            .add(backdrop)
            .add(wrapper);
    };
    PopoverPopIn.prototype.play = function () {
        var _this = this;
        this.plt.raf(function () {
            _this.iosPositionView(_this.enteringView.pageRef().nativeElement, _this.opts.ev);
            _super.prototype.play.call(_this);
        });
    };
    return PopoverPopIn;
}(PopoverTransition));

var PopoverPopOut = (function (_super) {
    __extends(PopoverPopOut, _super);
    function PopoverPopOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverPopOut.prototype.init = function () {
        var ele = this.leavingView.pageRef().nativeElement;
        var backdrop = new __WEBPACK_IMPORTED_MODULE_0__animations_animation__["a" /* Animation */](this.plt, ele.querySelector('ion-backdrop'));
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0__animations_animation__["a" /* Animation */](this.plt, ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        backdrop.fromTo('opacity', 0.5, 0);
        this
            .easing('ease')
            .duration(500)
            .add(backdrop)
            .add(wrapper);
    };
    return PopoverPopOut;
}(PopoverTransition));

});