/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Input, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MaskService } from "./mask.service";
var /** @type {?} */ resolvedPromise = Promise.resolve(null);
var MaskDirective = (function () {
    function MaskDirective(_elementRef, _renderer, _maskService) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._maskService = _maskService;
    }
    /**
     * @return {?}
     */
    MaskDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        resolvedPromise.then(function () { return _this._maskService.applyValueChanges(_this._elementRef.nativeElement); });
    };
    Object.defineProperty(MaskDirective.prototype, "maskExpression", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.maskExpression = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "specialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || !Array.isArray(value) || Array.isArray(value) && !value.length) {
                return;
            }
            this._maskService.maskSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "patterns", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.maskAvailablePatterns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "dropSpecialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.dropSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "clearIfNotMatch", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.clearIfNotMatch = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ el = (/** @type {?} */ (e.target));
        var /** @type {?} */ position = el.selectionStart;
        var /** @type {?} */ caretShift = 0;
        this._maskService.applyValueChanges(this._elementRef.nativeElement, position, function (shift) { return caretShift = shift; });
        el.selectionStart = el.selectionEnd = position + (
        // tslint:disable-next-line
        (/** @type {?} */ (e)).inputType === 'deleteContentBackward'
            ? 0
            : caretShift);
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn(this._elementRef.nativeElement);
        this._maskService.applyValueChanges(this._elementRef.nativeElement);
        this._maskService.onTouch();
    };
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        this._elementRef.nativeElement.value = this._maskService.applyMask(inputValue, this._maskService.maskExpression);
        this._maskService.applyValueChanges(this._elementRef.nativeElement);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._maskService.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._maskService.onTouch = fn;
    };
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            return this._renderer.setAttribute(this._elementRef.nativeElement, 'disabled', 'true');
        }
        return this._renderer.removeAttribute(this._elementRef.nativeElement, 'disabled');
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MaskDirective; }),
                            multi: true
                        },
                        MaskService
                    ],
                },] },
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: MaskService, },
    ]; };
    MaskDirective.propDecorators = {
        "maskExpression": [{ type: Input, args: ['mask',] },],
        "specialCharacters": [{ type: Input },],
        "patterns": [{ type: Input },],
        "dropSpecialCharacters": [{ type: Input },],
        "clearIfNotMatch": [{ type: Input },],
        "onInput": [{ type: HostListener, args: ['input', ['$event'],] },],
        "onBlur": [{ type: HostListener, args: ['blur',] },],
    };
    return MaskDirective;
}());
export { MaskDirective };
function MaskDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaskDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaskDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MaskDirective.propDecorators;
    /** @type {?} */
    MaskDirective.prototype._elementRef;
    /** @type {?} */
    MaskDirective.prototype._renderer;
    /** @type {?} */
    MaskDirective.prototype._maskService;
}
