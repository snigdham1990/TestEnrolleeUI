import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../app.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  showActiveInputVal = false;
  showNameInputVal = false;
  activationStatusValue: boolean;
  currentValue: string;
  isSaveDisabled = true;
  datacheckActive = false;
  datacheckName = false;
  ShowNewLabel = false;
  shownameError = false;

  dataCopy: any;
  ngOnInit(): void {
    console.log(" data oninit is: " + JSON.stringify(this.data));
    //copy of this.data....
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.activationStatusValue = this.data.active;

  }
  onNoClick(val: any): void {
    console.log("data is:" + JSON.stringify(this.data));
    console.log("data copy is:" + JSON.stringify(this.dataCopy));
    if (val == 'save') {
      // this.dataCopy.active = this.activationStatusValue ;
      // if(this.currentValue!==undefined){
      //   this.dataCopy.name = this.currentValue;
      if(JSON.stringify(this.data) != JSON.stringify(this.dataCopy)){
      this.data.name = this.dataCopy.name;
      if (this.dataCopy.active == "false") {
        this.data.active = false;
      } else {
        this.data.active = true;
      }

      this.dialogRef.close(this.data);
    }
    } else {
      this.dialogRef.close(null);
    }
  }
  showActiveInput() {
    this.datacheckActive = false;
    if (this.showActiveInputVal) {
      this.showActiveInputVal = false;
    } else {
      this.showActiveInputVal = true;
    }

  }
  showNameInput() {
    this.datacheckName = false;
    if (this.showNameInputVal) {
      this.showNameInputVal = false;
    } else {
      this.showNameInputVal = true;
    }
  }
  newDataReceived(val) {
    this.shownameError = false;
    if (val == 'name') {
      if(this.currentValue==undefined){
        this.shownameError =true;
      }else{
        this.dataCopy.name = this.currentValue;
        this.datacheckName = true;
        this.isSaveDisabled = false; 
      }      
    }
    if (val == 'active') {
      this.dataCopy.active = this.activationStatusValue;
      this.isSaveDisabled = false;
      this.datacheckActive = true;
    }
  }
  crossClicked(val) {
 
    if (val =='name') {        
      this.dataCopy.name = this.data.name;
      this.datacheckName = false;    
      this.showNameInputVal = false;
    }
   
    if (val =='active') {
      this.dataCopy.active = this.data.active;      
      this.datacheckActive = false;
      this.showActiveInputVal = false;
    }
    if(JSON.stringify(this.data) == JSON.stringify(this.dataCopy)){
      this.isSaveDisabled = true;
    }
  
}
}
