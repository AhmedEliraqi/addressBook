import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent {

  department: FormGroup;

  constructor(private lookupService: LookupService, private toastr: ToastrService, public dialogRef: MatDialogRef<any>, private bookService: BookService, @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.department = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {

  }


  onSubmitt() {
    console.log(this.department);
    if (this.department.valid) {
      const formData = new FormData();
      formData.append('Name', this.department.get("name")?.value);
      this.lookupService.createDEpartment(formData).subscribe({
        next: (department) => {
          console.log(department);
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
