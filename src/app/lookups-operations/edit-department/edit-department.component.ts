import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent  implements OnInit {
  department:FormGroup;

  constructor(private lookupService: LookupService,private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data?: any) {
    this.department = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.getDepartment(this.data.id);
  }



  onSubmitt() {
    console.log(this.department);
    if (this.department.valid) {
      const formData = new FormData();
      formData.append('id', this.data.id);
      formData.append('name', this.department.get("name")?.value);
      this.lookupService.updateDepartment(formData).subscribe({
        next: (department) => {
          console.log(department);
          this.toastr.success('update successfully');
          this.dialogRef.close();
        }, error: (err) => {
          console.log(err);

        },
      });
    } else {
      this.toastr.error('please enter valid inputs')
    }

  };


  getDepartment(id :number) {
    this.lookupService.getDepartmentById(id).subscribe({
      next: (result) => {
        console.log( "department",  result);
        this.department.patchValue({
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
