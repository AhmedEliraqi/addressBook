import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/models/department.model';
import { JobTitle } from 'src/app/models/jobTitle.model';
import { BookService } from 'src/app/services/book.service';
import { LookupService } from 'src/app/services/lookup.service';
import Swal from 'sweetalert2';
import { EditJobTitleComponent } from '../edit-job-title/edit-job-title.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { CreateJobTitleComponent } from '../create-job-title/create-job-title.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lookups-table',
  templateUrl: './lookups-table.component.html',
  styleUrls: ['./lookups-table.component.scss']
})
export class LookupsTableComponent {


  getDepartment: Department[] = [];

  constructor(private lookupService: LookupService, private dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDepartments();

  }

  getDepartments() {
    this.lookupService.getAllDepartments().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getDepartment = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    })
  };



  editDepartment(id: number) {

    this.dialog.open(EditDepartmentComponent, {
      data: { id }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getDepartments();
    });
    console.log(id);
  };

  createDepartment() {
    this.dialog.open(CreateDepartmentComponent, {
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getDepartments();
    });
  }








  deleteDepartment(id: number) {

    Swal.fire({
      title: 'Do you want to delete ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //confirem
        this.lookupService.removeDepartment(id)
          .subscribe({
            next: (response) => {
              this.getDepartment = this.getDepartment.filter((item: any) => item.id !== id);
            }
          })
      }
    })

  };






}
