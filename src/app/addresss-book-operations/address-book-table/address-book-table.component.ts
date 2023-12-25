import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditAddressBookComponent } from '../edit-address-book/edit-address-book.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookService } from 'src/app/services/book.service';
import { AddressBook } from 'src/app/models/addressBook.model';
import { ToastrService } from 'ngx-toastr';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DataTableDirective } from 'angular-datatables';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-book-table',
  templateUrl: './address-book-table.component.html',
  styleUrls: ['./address-book-table.component.scss']
})
export class AddressBookTableComponent implements OnInit, OnDestroy {

  getAddressBook: AddressBook[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  firstDate
  lastDate

  dtOptions: any = {};
  dtTrigger: any

  constructor(private bookService: BookService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
    this.getAddressBooks();

    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy: true,
      ordering: true,

      dom: 'Bfrtip',

      // Configure the buttons
      buttons: [
        {
          extend: 'excelHtml5',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
        },
        {
          extend: 'print',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
        },
      ],
    };
  }

  getPhoto(photoName: string) {
    if (photoName) {
      this.bookService.GetPhoto(photoName).subscribe({
        next: (res: any) => {
          console.log(res);
          var a = document.createElement("a");
          a.href = res.photo;
          a.download = "Image.png";
          a.click();
        },
        error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.toastr.warning("image is not found")
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getAddressBooks() {
    this.bookService.getAllAddressBooks().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAddressBook = res;
      },
      error: (err) => {
        this.toastr.error(err.message)
      },
    })
  };


  editModal(addressBookId: number) {

    this.dialog.open(EditAddressBookComponent, {
      data: { addressBookId }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.reloadCurrentRoute();
    });
    console.log(addressBookId);
  };

  deletedEmployee(id: number) {

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
        //confirm
        console.log(id);

        this.bookService.removeAddressBook(id)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.getAddressBooks();
              this.toastr.success('Deleted Successfully');
              this.reloadCurrentRoute();
            }, error: (err: any) => {
              console.log(err);
              this.toastr.error('Delete Failed')
              this.reloadCurrentRoute();
            },
          })
      }
    })

  }

  filterByDate() {
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {

      let firstDate = this.ngbDateParserFormatter.format(this.firstDate)
      let lastDate = this.ngbDateParserFormatter.format(this.lastDate)

      // const dateString = data[5].split('T');
      // const dateParts = dateString[0].split('-');
      // const date = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`

      const date = data[5]
      console.log(date);
      if (
        (firstDate === null && lastDate === null) ||
        (firstDate === null && date <= lastDate) ||
        (firstDate <= date && lastDate === null) ||
        (firstDate <= date && date <= lastDate)
      ) {
        return true;
      }
      return false;
    });

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });

  }

  ngOnDestroy(): void {
    $.fn['dataTable'].ext.search.pop();
  }

  reset(){
    this.reloadCurrentRoute()
  }
}
