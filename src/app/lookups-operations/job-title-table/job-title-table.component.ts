import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobTitle } from 'src/app/models/jobTitle.model';
import { LookupService } from 'src/app/services/lookup.service';
import { EditJobTitleComponent } from '../edit-job-title/edit-job-title.component';
import Swal from 'sweetalert2';
import { CreateJobTitleComponent } from '../create-job-title/create-job-title.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-title-table',
  templateUrl: './job-title-table.component.html',
  styleUrls: ['./job-title-table.component.scss']
})
export class JobTitleTableComponent {

  getJobTitle: JobTitle[] = [];

  constructor(private lookupService: LookupService, private dialog: MatDialog,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getJobTitles();
  }

  getJobTitles() {
    this.lookupService.getAllJobTitles().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getJobTitle = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    })
  };

  editJobTitle(id: number) {

    this.dialog.open(EditJobTitleComponent, {
      data: { id }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getJobTitles();
    });
    console.log(id);
  };

  createJobTitle() {
    this.dialog.open(CreateJobTitleComponent, {
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getJobTitles();
    });
  };


  deleteJobTitle(id: number) {
    console.log("deleteJobTitle",id);

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
        this.lookupService.removeJobTitle(id)
          .subscribe({
            next: (response) => {
            console.log(response);

            this.getJobTitles();
            }
          })
      }
    })

  };


}
