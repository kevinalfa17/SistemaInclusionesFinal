import { IConfig } from './config';
export declare class MaskService {
    private document;
    private _config;
    dropSpecialCharacters: IConfig['dropSpecialCharacters'];
    clearIfNotMatch: IConfig['clearIfNotMatch'];
    maskExpression: string;
    maskSpecialCharacters: IConfig['specialCharacters'];
    maskAvailablePatterns: IConfig['patterns'];
    private _regExpForRemove;
    private _shift;
    constructor(document: any, _config: IConfig);
    onChange: (_: any) => void;
    onTouch: () => void;
    applyMask(inputValue: string, maskExpression: string, position?: number, cb?: Function): string;
    applyValueChanges(element: HTMLInputElement, position?: number, cb?: Function): void;
    clearIfNotMatchFn(element: HTMLInputElement): void;
    private _removeMask(value);
    private _checkSymbolMask(inputSymbol, maskSymbol);
}
