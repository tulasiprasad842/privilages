import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertMessageService, ActionType } from '../../../_services/AlertMessageService';
import { PrivilegesService } from '../_service/privileges.service';
import { ModulesInfo, IResponse, ModuleData } from '../_model/priviligesModel';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material';


@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})

export class PrivilegesComponent implements OnInit {
count:number=0
  priviligeForm: FormGroup;
  labelPosition = 'before';
  loading: boolean = true;
  _adminData: ModulesInfo[] = [];
  _userData: ModulesInfo[] = [];
  constructor(private formBuilder: FormBuilder, private translate: TranslateService, private alertMessage: AlertMessageService,
    private priviligeService: PrivilegesService, private router: Router) {
    this.priviligeForm = this.formBuilder.group({
      adminPrevilages: this.formBuilder.array([]),
      userPrevilages: this.formBuilder.array([]),
      selectedAll:[null],
      select:[null]

    });
  }

  ngOnInit() {
    this.getModules();
  }
  changeAdminOptions(event:MatCheckboxChange){
    this.count=0
    if(event.checked){
      this._adminData.forEach(val=>{val.checked=true})
    }else{
      this._adminData.forEach(val=>{val.checked=false})
    }
    
  }
  changeUserOptions(event:MatCheckboxChange){
    this.count=0;
    if(event.checked){
      this._userData.forEach(val=>{val.checked=true})

    }else{
      this._userData.forEach(val=>{val.checked=false})

    }
  }



  onAdminChange(event: MatCheckboxChange) {
   this.count=0
    const accessRoleCtrl = <FormArray>this.priviligeForm.get('adminPrevilages') as FormArray;
    let module: any = event.source.value;
    // console.log("event.source.value", event.source.value);
    if (event.checked) {
      const i = accessRoleCtrl.controls.findIndex(x => x.value.moduleId === module.moduleId);
      let value = accessRoleCtrl.controls[i].value;
      value.checker = 1;
      value.checked=true;
      accessRoleCtrl.controls[i].setValue(value);
      //  accessRoleCtrl.push(new FormControl(event.source.value));
      // 
    } else {
      const i = accessRoleCtrl.controls.findIndex(x => x.value.moduleId === module.moduleId);
      let value = accessRoleCtrl.controls[i].value;
      value.checker = 0;
      value.checked=false;
      accessRoleCtrl.controls[i].setValue(value);
      //accessRoleCtrl.removeAt(i);
      // this.priviligeForm.get('selectedAll').setValue(true)
    }
    accessRoleCtrl.controls.forEach(control=>{
      if(control.value.checked)
      {
        this.count++;

        console.log("this.count==accessRoleCtrl.controls.length",this.count,accessRoleCtrl.controls.length) 
      }
    })
    if(this.count==accessRoleCtrl.controls.length)
    {
      this.priviligeForm.get('selectedAll').setValue(true);
      console.log("this.count==accessRoleCtrl.controls.length");
    }
    else{
      this.priviligeForm.get('selectedAll').setValue(false);
    }

  }

  onUserChange(event: MatCheckboxChange) {
    this.count=0;
    const accessRoleCtrl = <FormArray>this.priviligeForm.get('userPrevilages') as FormArray;
    let module: any = event.source.value;
    // console.log("event.source.value", event.source.value);
    if (event.checked) {
      const i = accessRoleCtrl.controls.findIndex(x => x.value.moduleId === module.moduleId);
      let value = accessRoleCtrl.controls[i].value;
      value.checker = 1;
      value.checked = true;
      accessRoleCtrl.controls[i].setValue(value);
      //  accessRoleCtrl.push(new FormControl(event.source.value));
    } else {
      const i = accessRoleCtrl.controls.findIndex(x => x.value.moduleId === module.moduleId);
      let value = accessRoleCtrl.controls[i].value;
      value.checker = 0;
      value.checked = false;
      accessRoleCtrl.controls[i].setValue(value);
      //accessRoleCtrl.removeAt(i);
    }
    accessRoleCtrl.controls.forEach(controls=>{
      if(controls.value.checked)
      {
        this.count++;

        console.log("this.count==accessRoleCtrl.controls.length",this.count,accessRoleCtrl.controls.length) 
      }
    })
    if(this.count==accessRoleCtrl.controls.length)
    {
      this.priviligeForm.get('select').setValue(true);
      console.log("this.count==accessRoleCtrl.controls.length");
    }
    else{
      this.priviligeForm.get('select').setValue(false);
    }

  }

  getModules() {
    this.loading = true;
    this.priviligeService.getAllModulesInfo().subscribe((response: ModulesInfo[]) => {
      if (response) {
        console.log("Response==>", response);
        this._adminData = response.filter(x => x.moduleType == 0);
        this._userData = response.filter(x => x.moduleType == 1);

        this._adminData.forEach(value => {
          const controls = <FormArray>this.priviligeForm.get('adminPrevilages') as FormArray;
          if (value.checker == 1) {
            value.checked = true;
            controls.push(new FormControl(value));
           this.priviligeForm.get('selectedAll').setValue(true)
          } else {
            value.checked = false;
            controls.push(new FormControl(value));
            this.priviligeForm.get('selectedAll').setValue(false)
          }
        });

        this._userData.forEach(value => {
          const controls = <FormArray>this.priviligeForm.get('userPrevilages') as FormArray;
          if (value.checker == 1) {
            value.checked = true;
            controls.push(new FormControl(value));
            this.priviligeForm.get('select').setValue(true);

          } else {
            value.checked = false;
            controls.push(new FormControl(value));
            this.priviligeForm.get('select').setValue(false);

          }
        });

      }
      this.loading = false;
    }, error => {
      let message = error.error.messages as string
      let errorMessage = error.status == 404 ? this.translate.instant('ActionNames.errorResponse') : message ? message : error.message;
      console.error("E-getModules==>", JSON.stringify(error));
      this.showAlert(errorMessage, ActionType.ERROR, error.status);
      this.loading = false;
    });
  }

  showAlert(error: any, action: ActionType, status: number = 0) {
    if (status == 401)
      this.router.navigate(['401']);
    else setTimeout(() => this.alertMessage.showAlert(error, action));
  }

  Submit() {
    this.loading = true;
    let modulesInfo = (this.priviligeForm.value.adminPrevilages) as ModulesInfo[];
    ((this.priviligeForm.value.userPrevilages) as ModulesInfo[]).forEach(x => {
      modulesInfo.push(x);
    })
    let moduleData = { modulesInfo: modulesInfo } as ModuleData;
    console.log("Module data=>", moduleData);
    this.priviligeService.updateModuleCheckerStatus(moduleData).subscribe((response: IResponse) => {
      console.log('response=>', response);
      if (response.status) {
        this.showAlert(response.message, ActionType.SUCCESS);
      } else {
        this.showAlert(response.message, ActionType.FAILED);
      }
      this.loading = false;
    }, error => {
      let message = error.error.message as string
      let errorMessage = error.status == 404 ? this.translate.instant('ActionNames.errorResponse') : message ? message : error.message;
      console.error("E-Submit==>", JSON.stringify(error));
      this.showAlert(errorMessage, ActionType.ERROR, error.status);
      this.loading = false;
    });
  }

}

