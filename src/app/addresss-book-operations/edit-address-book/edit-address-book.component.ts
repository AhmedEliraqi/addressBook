import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { AddressBook } from 'src/app/models/addressBook.model';
import { Department } from 'src/app/models/department.model';
import { JobTitle } from 'src/app/models/jobTitle.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-address-book',
  templateUrl: './edit-address-book.component.html',
  styleUrls: ['./edit-address-book.component.scss']
})
export class EditAddressBookComponent {
  addressBook: AddressBook[] = [];
  address: FormGroup;
  departments: Department[] = [];
  jobTitles: JobTitle[] = [];
  image:File;

  constructor(private route: ActivatedRoute,private bookService:BookService,private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {

    this.address = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      jobTitle: new FormControl(0, [Validators.required, Validators.min(1)]),
      department: new FormControl(0, [Validators.required ,Validators.min(1)]),
      mobileNumber: new FormControl("", [Validators.required,Validators.pattern("[0-9 ]{11}")]),
      dateOfBirth: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      age: new FormControl("", [Validators.required]),
    });
  }


  ngOnInit(): void {

    this.bookService.getLookupTables().subscribe({
      next: (res: any) => {
        console.log(res);
        this.departments = res.departments;
        this.jobTitles = res.jobTitles;
      },
      error: (err) => {
        this.toastr.error(err.message)
      },
    })
    console.log("data", this.data.addressBookId);
    this.getAddressById(this.data.addressBookId);


}

onSubmitt() {
  console.log(this.address);
  debugger
  if (this.address.valid) {
    let ngbDate = this.address.controls["dateOfBirth"].value
    let date = this.ngbDateParserFormatter.format(ngbDate)

    const formData = new FormData();
    formData.append('addressBookId', this.data.addressBookId);
    formData.append('fullName', this.address.get("fullName")?.value);
    formData.append('jobTitleId', this.address.get("jobTitle")?.value);
    formData.append('departmentId', this.address.get("department")?.value);
    formData.append('mobileNumber', this.address.get("mobileNumber")?.value);
    formData.append('dateOfBirth', date);
    formData.append('address', this.address.get("address")?.value);
    formData.append('email', this.address.get("email")?.value);
    formData.append('photo', this.image);
    formData.append('age', this.address.get("age")?.value);

    this.bookService.updateAddressBook(formData).subscribe({
      next: (addressBook) => {
        console.log(addressBook);
        this.toastr.success('updated successfully');
        this.dialogRef.close();
      }, error: (err) => {
        this.toastr.error(err);
      },
    });
  } else {
    this.toastr.error("please enter valid inputs");
  }
}

onFileChange(event: any) {
  if (event.target.files.length > 0) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.image = files[0];
  }
}

getAddressById(id :number) {
  this.bookService.getAddressBookById(id).subscribe({
    next: (addressBook) => {
      // const dateString = addressBook.dateOfBirth.split('T'); // use data for the id column
      // const dateParts = dateString[0].split('-');
      // const date = {
      //   year: parseInt(dateParts[0], 10),
      //   month: parseInt(dateParts[1], 10),
      //   day: parseInt(dateParts[2], 10),
      // }
      let ngbDate:any = addressBook.dateOfBirth
      const date = this.ngbDateParserFormatter.parse(ngbDate)

      debugger

      console.log( "addressBook",  addressBook);
      this.address.patchValue({
        fullName:addressBook.fullName,
        jobTitle:addressBook.jobTitle.id,
        department:addressBook.department.id,
        mobileNumber:addressBook.mobileNumber,
        dateOfBirth:date,
        address:addressBook.address,
        email:addressBook.email,
        age:addressBook.age

      });
    }, error: (err:any) => {
      console.log(err);
    },
  });
};

}



