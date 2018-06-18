/**
 * Custom table by Kevin Alfaro
 * Year: 2017
 */

import { Component, Input, OnInit, ViewEncapsulation, SimpleChanges, DoCheck, IterableDiffers, IterableDiffer, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]

})

//Structure format:
//{columns:[{name: <"ColumnHeader">, type: <"text" | "number" | "date" | "mask" | "select">, editable: true|false>, min:<#>, max:<#> , mask:<[]>, linkText:<"text">, selectOptions: []}], 
//header:<true|false>, footer:<true|false>, edit:<true|false>, delete:<true|false>, sort: <true|false>, search: <true|false>, create: <true|false>, pagination: <true|false>}

//Structure example:
//{columns:[
//          {name: "Name", type:"text", editable: true},
//          {name: "Age", type:"number", min: 0 , max: 100, editable: true},
//          {name: "Phone", type:"mask", mask:[ /\d/, /\d/, /\d/, /\d/ ,'-', /\d/, /\d/, /\d/, /\d/], editable: true},
//          {name: "City", type:"select", selectOptions:["San Jose","Cartago","San Carlos","Limon"], editable: true},
//          {name: "Facebook", type:"link", linkText:"See facebook", editable: true}
//], header:true, footer:false, edit: true, delete: true, sort:true, search:true, create:true, pagination:true}

//Data must match with columns quantity and type
//Data example for structure example: [["Kevin","21","8888-8888","San Carlos","https://www.facebook.com/kevin"]]

export class TableComponent implements OnInit, DoCheck {

    @Input() structure: any;   //Structure of the table
    @Input() data: any;        //List of rows (arrays) with all data

    @Output() valueChange = new EventEmitter();
    @Output() deleted = new EventEmitter<Boolean>();
    @Output() created = new EventEmitter<Number>();
    @Output() valueChange2 = new EventEmitter();


    private iterableDiffer: IterableDiffer; // Variable to check changes in data
    rows: any;                 //Rows control data   
    order: any = {};
    searchEnable: boolean = false;
    searchTerm: string = "";

    //Pagination
    pageQuantity: number = 1;
    firstPage: number = 1;
    lastPage: number = 6;
    selectedPage: number = 1;
    rightPageOverflow: boolean = false;
    leftPageOverflow: boolean = false;
    paginationNumbers = [];

    //Creation
    createEnabled = false;
    createdRow = [];

    constructor(private _iterableDiffers: IterableDiffers) {
        this.iterableDiffer = this._iterableDiffers.find([]).create(null); //Initialize variable to detect changes in data
    }

    ngOnInit(): void {
        //Fill rows control data for the first time
        this.fillRowsControl();

        //Ordering
        this.order = { Column: -1, Type: "Ascend" };

        //Pagination
        this.generatePagination();

        //Creation
        for(var i = 0; i < this.structure.columns.lenght; i++){
            this.createdRow.push("");
        }
        
    }

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.data);
        if (changes) {
            //Changes in data (refresh control data)
            this.fillRowsControl();
        }
    }

    //Function: Fill rows control data [{editing: <true/false>, editedData: <data>},...]
    fillRowsControl(): void {
        this.rows = [];
        for (var i = 0; i < this.data.length; i++) {
            var originalData = jQuery.extend(true, {}, this.data[i]);
            this.rows[i] = { editing: false, editedData: originalData, found: false }
        }
    }
    /**
     * This function it's used to pass a value to the parent component
     * @param value The value to send
     */
    eventInParent(value) {
        this.valueChange.emit(value);
    }

    /**
     * This function it's used to pass a value to the parent component
     * @param value The value to send
     */
    eventInParent2(value) {
        this.valueChange2.emit(value);
    }

    //Function: Enable edit 
    //Input: row index
    edit(index): void {
        //Show inputs
        this.rows[index].editing = true;
    }

    //Function: Save edited data
    //Input: row index
    confirmEdit(index): void {
        //Hide inputs
        this.rows[index].editing = false;

        //Modidify original data with the input data
        var newData = jQuery.extend(true, {}, this.rows[index].editedData);
        this.data[index] = newData;

        console.log("index " + index)
        console.log("this.data[index] " + this.data[index])
        console.log("this.rows[index] " + this.rows[index].editedData)
        //HTTP REQUEST
    }

    //Function: Cancel edition
    //Input: row index
    cancelEdit(index): void {
        //Hide inputs
        this.rows[index].editing = false;
        //Reset input data to original data
        var originalData = jQuery.extend(true, {}, this.data[index]);
        this.rows[index].editedData = originalData;
    }

    //Function: Delete row
    //Input: row index
    delete(index): void {
        this.deleted.emit(index);
        this.data.splice(index, 1);
        this.rows.splice(index, 1);

    }

    //Function: Sort column
    //Input: Column index
    sort(index): void {

        //Change icon in selected column
        this.order.Column = index;
        if (this.order.Type == "Ascend") {
            this.order.Type = "Descend";

            //Descend ordering
            this.data.sort((a, b) => {
                var i = this.order.Column
                if (a[i] < b[i])
                    return -1;
                if (a[i] > b[i])
                    return 1;
                return 0;
            })
        }
        else {
            this.order.Type = "Ascend";

            //Ascend ordering
            this.data.sort((a, b) => {
                var i = this.order.Column
                if (a[i] < b[i])
                    return -1;
                if (a[i] > b[i])
                    return 1;
                return 0;
            })
            this.data.reverse();
        }
    }

    //Function: Search in data by term
    search() {

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
                            console.log("found" + this.data[i][j])
                        }
                    }

                }
                this.rows[i].found = found;
            }
        }
        else {
            this.searchEnable = false;
        }
    }

    generatePagination() {
        //Pagination
        if (this.data.lenght > 10) {
            this.pageQuantity = this.data.lenght / 10 + this.data.lenght % 10;
        }

        if (this.pageQuantity > 5) {
            this.rightPageOverflow = true;
        }

        for(var i = 0; i <= this.pageQuantity; i++){
            this.paginationNumbers.push(i);
        }
    }

    next(pageNumber){
        if(pageNumber < this.lastPage){
            this.changePage(pageNumber)
        }
    }

    previous(pageNumber){
        if(pageNumber >= this.firstPage){
            this.changePage(pageNumber)
        }
    }

    changePage(pageNumber) {


        this.selectedPage = pageNumber;
        if (this.rightPageOverflow && (this.selectedPage + 2) >= this.pageQuantity) {
            this.firstPage = this.pageQuantity - 4;
            this.lastPage = this.pageQuantity + 1;
            this.rightPageOverflow = false;
            this.leftPageOverflow = true;
            console.log("1");
        }
        else if(this.leftPageOverflow && (this.selectedPage - 2) <= 1){
            this.firstPage = 1
            this.lastPage = 6;
            this.leftPageOverflow = false;
            this.rightPageOverflow = true;
            console.log("2");
        }
        else {
            if (this.rightPageOverflow && pageNumber >= (this.firstPage + 3)) {
                this.firstPage = this.firstPage + (2 - (this.lastPage - 1 - this.selectedPage));
                this.lastPage =  this.lastPage + (2 - (this.lastPage - 1 - this.selectedPage));
                console.log("3");

                if(this.firstPage > 1){
                    this.leftPageOverflow = true
                }
            }
            else if (this.leftPageOverflow && pageNumber <= (this.lastPage - 4)) {
                console.log("pn" + pageNumber)
                console.log("lp" + this.lastPage)
                this.lastPage = this.lastPage - (2 - (this.selectedPage - this.firstPage));                
                this.firstPage = this.firstPage - (2 - (this.selectedPage - this.firstPage));

                if(this.lastPage - 1 < this.pageQuantity){
                    this.rightPageOverflow = true
                }

                console.log("4");
            }
        }

    }

    checkPagination(index){

        //La paginacion no esta activa --> mostrar todo
        if(!this.structure.pagination){
            return true;
        }

        var firstRow;
        var lastRow;

        firstRow = (this.selectedPage-1)*10 + 1; //1,11,21
        lastRow = firstRow + 9; // 10, 20, 30

        if(index >= firstRow && index <= lastRow ){
            return true;
        }
        else{
            return false;
        }
    }

    create(){
        this.createEnabled = true;
    }

    save(){
        this.createEnabled = false;
        this.data.push(this.createdRow);
        this.deleted.emit(true);
        //Push in data

    }

    cancel(){
        this.createEnabled = false;
    }

    
}
