/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Injectable } from "@angular/core";
import { config } from "./config";
import { DOCUMENT } from "@angular/common";
var MaskService = (function () {
    function MaskService(
        // tslint:disable-next-line
        document, _config) {
        this.document = document;
        this._config = _config;
        this.maskExpression = '';
        this.onChange = function (_) { };
        this.onTouch = function () { };
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = /** @type {?} */ ((this._config)).specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this._regExpForRemove = new RegExp(this.maskSpecialCharacters
            .map(function (item) { return "\\" + item; })
            .join('|'), 'gi');
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        if (inputValue === undefined || inputValue === null) {
            return '';
        }
        var /** @type {?} */ cursor = 0;
        var /** @type {?} */ result = '';
        var /** @type {?} */ inputArray = inputValue.toString()
            .split('');
        // tslint:disable-next-line
        for (var /** @type {?} */ i = 0, /** @type {?} */ inputSymbol = inputArray[0]; i
            < inputArray.length; i++, inputSymbol = inputArray[i]) {
            if (result.length === maskExpression.length) {
                break;
            }
            if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                result += inputSymbol;
                cursor++;
            }
            else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                result += maskExpression[cursor];
                cursor++;
                this._shift.add(cursor);
                i--;
            }
            else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1
                && this.maskAvailablePatterns[maskExpression[cursor]]
                && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                cursor++;
                i--;
            }
        }
        if (result.length + 1 === maskExpression.length
            && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        var /** @type {?} */ shift = 1;
        var /** @type {?} */ newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0);
        return result;
    };
    /**
     * @param {?} element
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?} element
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (element, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        var /** @type {?} */ val = element.value;
        var /** @type {?} */ maskedInput = this.applyMask(val, this.maskExpression, position, cb);
        element.value = maskedInput;
        if (this.dropSpecialCharacters === true) {
            this.onChange(this._removeMask(maskedInput));
        }
        else {
            this.onChange(maskedInput);
        }
        if (element !== this.document.activeElement) {
            this.clearIfNotMatchFn(element);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (this.clearIfNotMatch === true && this.maskExpression.length
            !== element.value.length) {
            element.value = '';
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return value;
        }
        return value.replace(this._regExpForRemove, '');
    };
    /**
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    MaskService.prototype._checkSymbolMask = /**
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    function (inputSymbol, maskSymbol) {
        return inputSymbol
            === maskSymbol
            || this.maskAvailablePatterns[maskSymbol] && this.maskAvailablePatterns[maskSymbol].pattern
                && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    };
    MaskService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [config,] },] },
    ]; };
    return MaskService;
}());
export { MaskService };
function MaskService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaskService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaskService.ctorParameters;
    /** @type {?} */
    MaskService.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskService.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskService.prototype.maskExpression;
    /** @type {?} */
    MaskService.prototype.maskSpecialCharacters;
    /** @type {?} */
    MaskService.prototype.maskAvailablePatterns;
    /** @type {?} */
    MaskService.prototype._regExpForRemove;
    /** @type {?} */
    MaskService.prototype._shift;
    /** @type {?} */
    MaskService.prototype.onChange;
    /** @type {?} */
    MaskService.prototype.onTouch;
    /** @type {?} */
    MaskService.prototype.document;
    /** @type {?} */
    MaskService.prototype._config;
}
