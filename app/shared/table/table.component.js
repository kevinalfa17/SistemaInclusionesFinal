/**
 * Custom table by Kevin Alfaro
 * Year: 2017
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var TableComponent = (function () {
    function TableComponent(_iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.valueChange = new core_1.EventEmitter();
        this.deleted = new core_1.EventEmitter();
        this.valueChange2 = new core_1.EventEmitter();
        this.order = {};
        this.searchEnable = false;
        this.searchTerm = "";
        //Pagination
        this.pageQuantity = 1;
        this.firstPage = 1;
        this.lastPage = 6;
        this.selectedPage = 1;
        this.rightPageOverflow = false;
        this.leftPageOverflow = false;
        this.paginationNumbers = [];
        //Creation
        this.createEnabled = false;
        this.createdRow = [];
        this.iterableDiffer = this._iterableDiffers.find([]).create(null); //Initialize variable to detect changes in data
    }
    TableComponent.prototype.ngOnInit = function () {
        //Fill rows control data for the first time
        this.fillRowsControl();
        //Ordering
        this.order = { Column: -1, Type: "Ascend" };
        //Pagination
        this.generatePagination();
        //Creation
        for (var i = 0; i < this.structure.columns.lenght; i++) {
            this.createdRow.push("");
        }
    };
    TableComponent.prototype.ngDoCheck = function () {
        var changes = this.iterableDiffer.diff(this.data);
        if (changes) {
            //Changes in data (refresh control data)
            this.fillRowsControl();
        }
    };
    //Function: Fill rows control data [{editing: <true/false>, editedData: <data>},...]
    TableComponent.prototype.fillRowsControl = function () {
        this.rows = [];
        for (var i = 0; i < this.data.length; i++) {
            var originalData = jQuery.extend(true, {}, this.data[i]);
            this.rows[i] = { editing: false, editedData: originalData, found: false };
        }
    };
    /**
     * This function it's used to pass a value to the parent component
     * @param value The value to send
     */
    TableComponent.prototype.eventInParent = function (value) {
        this.valueChange.emit(value);
    };
    /**
     * This function it's used to pass a value to the parent component
     * @param value The value to send
     */
    TableComponent.prototype.eventInParent2 = function (value) {
        this.valueChange2.emit(value);
    };
    //Function: Enable edit 
    //Input: row index
    TableComponent.prototype.edit = function (index) {
        //Show inputs
        this.rows[index].editing = true;
    };
    //Function: Save edited data
    //Input: row index
    TableComponent.prototype.confirmEdit = function (index) {
        //Hide inputs
        this.rows[index].editing = false;
        //Modidify original data with the input data
        var newData = jQuery.extend(true, {}, this.rows[index].editedData);
        this.data[index] = newData;
        console.log("index " + index);
        console.log("this.data[index] " + this.data[index]);
        console.log("this.rows[index] " + this.rows[index].editedData);
        //HTTP REQUEST
    };
    //Function: Cancel edition
    //Input: row index
    TableComponent.prototype.cancelEdit = function (index) {
        //Hide inputs
        this.rows[index].editing = false;
        //Reset input data to original data
        var originalData = jQuery.extend(true, {}, this.data[index]);
        this.rows[index].editedData = originalData;
    };
    //Function: Delete row
    //Input: row index
    TableComponent.prototype.delete = function (index) {
        this.deleted.emit(index);
        this.data.splice(index, 1);
        this.rows.splice(index, 1);
    };
    //Function: Sort column
    //Input: Column index
    TableComponent.prototype.sort = function (index) {
        var _this = this;
        //Change icon in selected column
        this.order.Column = index;
        if (this.order.Type == "Ascend") {
            this.order.Type = "Descend";
            //Descend ordering
            this.data.sort(function (a, b) {
                var i = _this.order.Column;
                if (a[i] < b[i])
                    return -1;
                if (a[i] > b[i])
                    return 1;
                return 0;
            });
        }
        else {
            this.order.Type = "Ascend";
            //Ascend ordering
            this.data.sort(function (a, b) {
                var i = _this.order.Column;
                if (a[i] < b[i])
                    return -1;
                if (a[i] > b[i])
                    return 1;
                return 0;
            });
            this.data.reverse();
        }
    };
    //Function: Search in data by term
    TableComponent.prototype.search = function () {
        var found = false;
        //Enable/disable search
        if (this.searchTerm !== "") {
            this.searchEnable = true;
            //Search term in data, iterate over rows
            for (var i = 0; i < this.data.length; i++) {
                found = false;
                //Iterate over columns
                for (var j = 0; j < this.structure.columns.length; j++) {
                    //Ignore links
                    if (this.structure.columns[j].type !== "link") {
                        //Search term in item
                        if (this.data[i][j].indexOf(this.searchTerm) !== -1) {
                            found = true;
                            console.log("found" + this.data[i][j]);
                        }
                    }
                }
                this.rows[i].found = found;
            }
        }
        else {
            this.searchEnable = false;
        }
    };
    TableComponent.prototype.generatePagination = function () {
        //Pagination
        if (this.data.lenght > 10) {
            this.pageQuantity = this.data.lenght / 10 + this.data.lenght % 10;
        }
        if (this.pageQuantity > 5) {
            this.rightPageOverflow = true;
        }
        for (var i = 0; i <= this.pageQuantity; i++) {
            this.paginationNumbers.push(i);
        }
    };
    TableComponent.prototype.next = function (pageNumber) {
        if (pageNumber < this.lastPage) {
            this.changePage(pageNumber);
        }
    };
    TableComponent.prototype.previous = function (pageNumber) {
        if (pageNumber >= this.firstPage) {
            this.changePage(pageNumber);
        }
    };
    TableComponent.prototype.changePage = function (pageNumber) {
        this.selectedPage = pageNumber;
        if (this.rightPageOverflow && (this.selectedPage + 2) >= this.pageQuantity) {
            this.firstPage = this.pageQuantity - 4;
            this.lastPage = this.pageQuantity + 1;
            this.rightPageOverflow = false;
            this.leftPageOverflow = true;
            console.log("1");
        }
        else if (this.leftPageOverflow && (this.selectedPage - 2) <= 1) {
            this.firstPage = 1;
            this.lastPage = 6;
            this.leftPageOverflow = false;
            this.rightPageOverflow = true;
            console.log("2");
        }
        else {
            if (this.rightPageOverflow && pageNumber >= (this.firstPage + 3)) {
                this.firstPage = this.firstPage + (2 - (this.lastPage - 1 - this.selectedPage));
                this.lastPage = this.lastPage + (2 - (this.lastPage - 1 - this.selectedPage));
                console.log("3");
                if (this.firstPage > 1) {
                    this.leftPageOverflow = true;
                }
            }
            else if (this.leftPageOverflow && pageNumber <= (this.lastPage - 4)) {
                console.log("pn" + pageNumber);
                console.log("lp" + this.lastPage);
                this.lastPage = this.lastPage - (2 - (this.selectedPage - this.firstPage));
                this.firstPage = this.firstPage - (2 - (this.selectedPage - this.firstPage));
                if (this.lastPage - 1 < this.pageQuantity) {
                    this.rightPageOverflow = true;
                }
                console.log("4");
            }
        }
    };
    TableComponent.prototype.checkPagination = function (index) {
        //La paginacion no esta activa --> mostrar todo
        if (!this.structure.pagination) {
            return true;
        }
        var firstRow;
        var lastRow;
        firstRow = (this.selectedPage - 1) * 10 + 1; //1,11,21
        lastRow = firstRow + 9; // 10, 20, 30
        if (index >= firstRow && index <= lastRow) {
            return true;
        }
        else {
            return false;
        }
    };
    TableComponent.prototype.create = function () {
        this.createEnabled = true;
    };
    TableComponent.prototype.save = function () {
        this.createEnabled = false;
        this.data.push(this.createdRow);
        //Push in data
    };
    TableComponent.prototype.cancel = function () {
        this.createEnabled = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "structure", void 0);
    __decorate([
        //Structure of the table
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "data", void 0);
    __decorate([
        //List of rows (arrays) with all data
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "deleted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "valueChange2", void 0);
    TableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-cmp',
            templateUrl: 'table.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [core_1.IterableDiffers])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map