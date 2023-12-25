import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditAddressBookComponent } from './addresss-book-operations/edit-address-book/edit-address-book.component';
import { CreateAddressBookCompComponent } from './addresss-book-operations/create-address-book-comp/create-address-book-comp.component';
import { AddressBookTableComponent } from './addresss-book-operations/address-book-table/address-book-table.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { LookupsTableComponent } from './lookups-operations/lookups-table/lookups-table.component';
import { EditJobTitleComponent } from './lookups-operations/edit-job-title/edit-job-title.component';
import { EditDepartmentComponent } from './lookups-operations/edit-department/edit-department.component';
import { CreateDepartmentComponent } from './lookups-operations/create-department/create-department.component';
import { CreateJobTitleComponent } from './lookups-operations/create-job-title/create-job-title.component';
import { JobTitleTableComponent } from './lookups-operations/job-title-table/job-title-table.component';
import { DataTablesModule } from 'angular-datatables';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CreateAddressBookCompComponent,
    AddressBookTableComponent,
    EditAddressBookComponent,
    MainServiceComponent,
    LookupsTableComponent,
    EditJobTitleComponent,
    EditDepartmentComponent,
    CreateDepartmentComponent,
    CreateJobTitleComponent,
    JobTitleTableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
