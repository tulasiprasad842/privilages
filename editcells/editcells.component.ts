import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { PeriodicElement } from './model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editcells',
  templateUrl: './editcells.component.html',
  styleUrls: ['./editcells.component.css']
})
export class EditcellsComponent implements OnInit {

displayedColumns: string[]=['position', 'name', 'weight', 'code']
User: PeriodicElement[]=[];
isSelected:boolean=false; 
filterData:PeriodicElement[];
selection = new SelectionModel<PeriodicElement>(true, []);
selectedPosition:any;
dataSource:any;
// pageSize = 9;
// public listPage = 0;
data= Object.assign(this.User);

@ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  constructor(private dataservice:DataService) {
    
   }
             

getdata(){
   this.dataservice.getUsers().subscribe((result:PeriodicElement[])=>{
     this.User=result;
     this.data=this.User;
     this.dataSource= new MatTableDataSource<PeriodicElement>(this.User);
     console.log("data==>",this.data);
    this.selection= new SelectionModel<PeriodicElement>(true, []);
     console.log("user==>", this.User);
    //  console.log("pazesize", this.pageSize)
    //  this.getListData({ pageIndex: this.listPage, pageSize: this.pageSize });
     console.log("datasource==>", this.dataSource);
  })
}
toggleSelected(obj, event){

  if (event.ctrlKey) {
    this.toggleRow(obj);
}
}

toggleRow(obj){
  obj.isSelected = obj.isSelected == 'selected' ? '' : 'selected';
}

removeSelectedRows(){
  console.log("this.selection",this.selection)
  this.selection.selected.forEach(item => {
    console.log("item==>",item,this.data);
    
    let index = this.data.findIndex(d=>_.isEqual(d, item));
    console.log("data",this.data.findIndex(d=>_.isEqual(d, item)));
    this.data.splice(index, 1)
    console.log("===>", this.data);
  });
  this.dataSource= new MatTableDataSource<PeriodicElement>(this.data);
  this.selection= new SelectionModel<PeriodicElement>(true, []);
}

// getListData(_pageData) {
//   let index = 0;
//   let startingIndex = _pageData.pageIndex * _pageData.pageSize;
//   let endingIndex = startingIndex + _pageData.pageSize;
//   this.filterData = this.User.filter(() => {
//     index++;
//     return (index > startingIndex && index <= endingIndex) ? true : false;
//   });
//   console.log("filterData==>" + JSON.stringify(this.filterData));
//   this.dataSource = new MatTableDataSource(this.filterData);
// }


ngOnInit() {
  this.getdata();
  // this.dataSource.paginator = this.paginator;
}




























// selectRowsBetweenIndexes(indexes) {
//   indexes.sort(function(a, b) {
//       return a - b;
//   });

// }


























  // if(event.shiftKey){
  //   console.log("SHIFT");
    
  // }else if(event.ctrlKey){
  //   console.log("CONTROL");
  //   obj.isSelected=true;
  //   this.previousSelected= obj;
  //   console.log("obj=>", obj);
      
  // }
  // else{
  //   this.User.forEach(element=>{
  //     element.isSelected = false;
  //       obj.isSelected = true;
  //       this.previousSelected = obj;
       
  //   })
  // }
  // this.source=this.data.push(obj);
  // console.log("outsource",this.source);
  
// }

// removeSelectedRows(){
// this.dataSource.data=this.dataSource.data.filter(
//   element =>element.position !== this.selectedPosition);
// console.log(this.dataSource.data);
  

// }
  

}
