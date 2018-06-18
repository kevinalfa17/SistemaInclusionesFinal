import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MaskService } from './mask.service';
import { IConfig } from './config';
export declare class MaskDirective implements OnInit, ControlValueAccessor {
    private _elementRef;
    private _renderer;
    private _maskService;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _maskService: MaskService);
    ngOnInit(): void;
    maskExpression: string;
    specialCharacters: IConfig['specialCharacters'];
    patterns: IConfig['patterns'];
    dropSpecialCharacters: IConfig['dropSpecialCharacters'];
    clearIfNotMatch: IConfig['clearIfNotMatch'];
    onInput(e: KeyboardEvent): void;
    onBlur(): void;
    /** It writes the value in the input */
    writeValue(inputValue: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    /** It disables the input element */
    setDisabledState(isDisabled: boolean): void;
}
