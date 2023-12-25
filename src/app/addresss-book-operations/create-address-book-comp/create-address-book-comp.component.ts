import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressBook } from 'src/app/models/addressBook.model';
import { Department } from 'src/app/models/department.model';
import { JobTitle } from 'src/app/models/jobTitle.model';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-address-book-comp',
  templateUrl: './create-address-book-comp.component.html',
  styleUrls: ['./create-address-book-comp.component.scss']
})
export class CreateAddressBookCompComponent {
  model: NgbDateStruct;
  today = this.calendar.getToday();

  address: FormGroup;

  departments: Department[] = [];
  jobTitles: JobTitle[] = [];
  image:File

  constructor(private bookService: BookService,
              private toastr: ToastrService,
              private calendar: NgbCalendar,
              private route: Router,
              private ngbDateParserFormatter: NgbDateParserFormatter) {

    this.address = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      jobTitle: new FormControl(0, [Validators.required, Validators.min(1)]),
      department: new FormControl(0, [Validators.required, Validators.min(1)]),
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
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      this.image = files[0];
    }
  }


  onSubmit() {
    console.log(this.address);

    let ngbDate = this.address.controls["dateOfBirth"].value
    let date = this.ngbDateParserFormatter.format(ngbDate)

    console.log(date);

    if (this.address.valid) {
      const formData = new FormData();
      formData.append('fullName', this.address.get("fullName")?.value);
      formData.append('jobTitleId', this.address.get("jobTitle")?.value);
      formData.append('departmentId', this.address.get("department")?.value);
      formData.append('mobileNumber', this.address.get("mobileNumber")?.value);
      formData.append('dateOfBirth', date);
      formData.append('address', this.address.get("address")?.value);
      formData.append('email', this.address.get("email")?.value);
      formData.append('photo', this.image);
      formData.append('age', this.address.get("age")?.value);

      this.bookService.createAddressBook(formData).subscribe({
        next: (addressBook) => {
          console.log(addressBook);
          this.toastr.success('Created successfully');
          this.route.navigate(['/addressBookTable']);
        }, error: (err) => {
          console.log(err);
          this.toastr.error(err)
        },
      });
    } else {
      this.toastr.error("please enter valid inputs")
    }

  }

}
