import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../app.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    showActiveInputVal = false;
    showNameInputVal = false;
    activationStatusValue :boolean;
    currentValue: string;

  ngOnInit(): void {
    //console.log(" data here is: "+this.data);
    this.activationStatusValue = this.data.active;
  
  }
  onNoClick(val:any): void { 
    if(val =='save'){
    this.data.active = this.activationStatusValue ;
    if(this.currentValue!==undefined){
      this.data.name = this.currentValue;
    } 
   // console.log(this.data);
    this.dialogRef.close(this.data);
    }else{
    this.dialogRef.close(null);
    }
  }
  showActiveInput(){
    if(this.showActiveInputVal){
      this.showActiveInputVal = false;
    } else{
      this.showActiveInputVal = true;

    }
   
  }
  showNameInput(){
    if(this.showNameInputVal){
      this.showNameInputVal = false;
    } else{
      this.showNameInputVal = true;

    }  
  }
}
