import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-create-job-title',
  templateUrl: './create-job-title.component.html',
  styleUrls: ['./create-job-title.component.scss']
})
export class CreateJobTitleComponent {

  jobTitle:FormGroup;

  constructor(private lookupService: LookupService,private toastr: ToastrService,public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data?: any) {
    this.jobTitle = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {


}

onSubmitt() {
  console.log(this.jobTitle);
  if (this.jobTitle.valid) {
    const formData = new FormData();
    formData.append('name', this.jobTitle.get("name")?.value);
    this.lookupService.createJobTitles(formData).subscribe({
      next: (jobTitle) => {
        console.log(jobTitle);
        this.toastr.success('Created successfully');
        this.dialogRef.close();
      }, error: (err) => {
        console.log(err);

      },
    });
  } else {
    this.toastr.error('please enter valid inputs')
  }

};

closeForm() {
  this.dialogRef.close();
};

}
