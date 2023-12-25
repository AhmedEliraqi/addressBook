import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressBook } from '../models/addressBook.model';
import { Observable } from 'rxjs';
import { PhotoDTO } from '../models/photoDTO';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseApiUrl: string = environment.apiUrl+'AddressBook';

  constructor(private http: HttpClient) { }

  createAddressBook(createBookRequest: FormData): Observable<AddressBook> {
    return this.http.post<AddressBook>(this.baseApiUrl + '/CreateAddressBook', createBookRequest)
  };

  updateAddressBook(updateBookRequest: FormData): Observable<AddressBook> {
    return this.http.post<AddressBook>(this.baseApiUrl + '/UpdateAddressBook', updateBookRequest)
  };

  removeAddressBook(id: number): Observable<AddressBook> {
    return this.http.delete<AddressBook>(this.baseApiUrl + '/RemoveAddressBook/'+ id )
  };

  getAddressBookById(id: number): Observable<AddressBook> {
    return this.http.get<AddressBook>(this.baseApiUrl + '/GetAddressBookById?id=' + id)
  };
  
  GetPhoto(photoName: string): Observable<PhotoDTO> {
    return this.http.get<PhotoDTO>(this.baseApiUrl + '/GetPhoto?photoName=' + photoName)
  };

  getAllAddressBooks(): Observable<AddressBook> {
    return this.http.get<AddressBook>(this.baseApiUrl + '/GetAllAddressBooks')
  };

  getLookupTables(): Observable<AddressBook> {
    return this.http.get<AddressBook>(this.baseApiUrl + '/GetLookUp')
  };

}
