import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateAddressBookCompComponent } from './addresss-book-operations/create-address-book-comp/create-address-book-comp.component';
import { AddressBookTableComponent } from './addresss-book-operations/address-book-table/address-book-table.component';
import { EditAddressBookComponent } from './addresss-book-operations/edit-address-book/edit-address-book.component';
import { LookupsTableComponent } from './lookups-operations/lookups-table/lookups-table.component';
import { EditDepartmentComponent } from './lookups-operations/edit-department/edit-department.component';
import { EditJobTitleComponent } from './lookups-operations/edit-job-title/edit-job-title.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { JobTitleTableComponent } from './lookups-operations/job-title-table/job-title-table.component';


const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'CreateAddressBook',component:CreateAddressBookCompComponent},
  {path:'addressBookTable',component:AddressBookTableComponent},
  {path:'editAddressBookTable/:id',component:EditAddressBookComponent},
  {path:'lookupTable',component:LookupsTableComponent},
  {path:'editDepartment/:id',component:EditDepartmentComponent},
  {path:'editJobTitle/:id',component:EditJobTitleComponent},
  {path:'mainService',component:MainServiceComponent},
  {path:'jobTitle',component:JobTitleTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
