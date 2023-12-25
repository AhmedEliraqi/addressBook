import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  userRegister(userOb:any) {
    return this.http.post<any>(environment.apiUrl+"User/RegisterUser" ,userOb)
   }

   userlogin(userObj:any) {
     return this.http.post<any>(environment.apiUrl+"User/Login" ,userObj)
   }


}
