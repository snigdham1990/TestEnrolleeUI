import { Component,inject } from '@angular/core';
import { ApiService } from './service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponentComponent} from 'src/app/dialog-component/dialog-component.component';
export interface DialogData {
  id: string;
  name: string;
  dateOfBirth: string;
  active : boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'enrollee';
  displayedColumns: string[] = ['action','id','name', 'dateOfBirth','active'];
  dataSource = new MatTableDataSource();
  element:any[];
  selectedData:DialogData;
  alertError =false;
  alertSuccess =false;
  ErrMsg ='';
  SuccessMsg='';
  setTimeout: any;
   constructor(private ApiService: ApiService,public dialog: MatDialog,
    ) { }
  ngOnInit() {     
    this.getEnrolleeList();
    }
    getEnrolleeList(){
      this.ApiService.getEnrolleesAPI()
        .subscribe(
          (data) => {
        //   console.log("Enrollees Data"+JSON.stringify(data));
           this.dataSource = data;
           
          },(err: any) => {
            this.alertError =true;
      //     console.log(JSON.stringify(err));
            this.ErrMsg=err.error;
            setTimeout(
              function () {
                this.alertError =false;
              this.ErrMsg='';
              }.bind(this),
              5000
            );
          });
    }
    openDialog(element:DialogData): void {
      this.selectedData = element;
      const dialogRef = this.dialog.open(DialogComponentComponent, {
        width: '600px',
        height:'400px',
        data: { id: element.id, name: element.name, dateOfBirth: element.dateOfBirth, active : element.active}
      });
  
      dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed'+JSON.stringify(result));
      if((result.name!=element.name && result.name!=undefined) || result.active!= element.active){
        // call service to update.
        let activeVal:boolean;
        if(result.active == "1"){
          activeVal=true;
        }else{
          activeVal=false;

        }
       
        let ApiBody ={id:result.id,active:activeVal,name:result.name,dateOfBirth:result.dateOfBirth};
       
        this.ApiService.updateEnrolleesAPI(ApiBody)
        .subscribe(
          (data) => {
      //     console.log("Enrollees Data"+JSON.stringify(data));
           this.dataSource = data;
           this.alertSuccess =true;         
            this.SuccessMsg="Record was successfully Updated ----  " +(JSON.stringify(data));
           
            setTimeout(
              function () {
                this.alertSuccess =false;
              this.SuccessMsg='';
              }.bind(this),
              5000
            );
            this.getEnrolleeList();

          },(err: any) => {
            this.alertError =true;
        //   console.log(JSON.stringify(err));
            this.ErrMsg=err.error;
            setTimeout(
              function () {
                this.alertError =false;
              this.ErrMsg='';
              }.bind(this),
              5000
            );
          });
      }
      });
    }
  
  }

