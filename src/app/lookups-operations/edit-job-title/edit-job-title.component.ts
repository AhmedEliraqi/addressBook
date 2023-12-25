import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-edit-job-title',
  templateUrl: './edit-job-title.component.html',
  styleUrls: ['./edit-job-title.component.scss']
})
export class EditJobTitleComponent {

jobTitle:FormGroup;

  constructor(private lookupService: LookupService,private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data?: any) {
    this.jobTitle = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getJobTitle(this.data.id);
}


  onSubmitt() {
    console.log(this.jobTitle);
    if (this.jobTitle.valid) {
      const formData = new FormData();
      formData.append('id', this.data.id);
      formData.append('name', this.jobTitle.get("name")?.value);
      this.lookupService.updateJobTitle(formData).subscribe({
        next: (jobTitle) => {
          console.log(jobTitle);
          this.toastr.success('updated successfully');
          this.dialogRef.close();
        }, error: (err) => {
          console.log(err);

        },
      });
    } else {
      this.toastr.error('please enter valid inputs')
    }

  };

  getJobTitle(id :number) {
    this.lookupService.getJobTitleById(id).subscribe({
      next: (result) => {
        console.log( "jobTitle",  result);
        this.jobTitle.patchValue({
          name:result.name,

        });
      }, error: (err:any) => {
        console.log(err);
      },
    });
  };

  closeForm() {
    this.dialogRef.close();
  };

}
