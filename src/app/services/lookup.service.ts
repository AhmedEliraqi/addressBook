import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { JobTitle } from '../models/jobTitle.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  baseApiUrl: string =  environment.apiUrl+'Lookup';

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department> {
    return this.http.get<Department>(this.baseApiUrl + '/GetAllDepartments')
  };

  createDEpartment(createDepartment: FormData): Observable<Department> {
    return this.http.post<Department>(this.baseApiUrl + '/AddDepartment', createDepartment)
  };

  updateDepartment(updateDepartment: FormData): Observable<Department> {
    return this.http.post<Department>(this.baseApiUrl + '/EditDepartments', updateDepartment)
  };

  removeDepartment(id: number): Observable<Department> {
    return this.http.delete<Department>(this.baseApiUrl + '/RemoveDepartments/'+ id )
  };

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(this.baseApiUrl + '/GetDepartmentById?id=' + id)
  };

  getAllJobTitles(): Observable<JobTitle> {
    return this.http.get<JobTitle>(this.baseApiUrl + '/GetJobsTitles')
  };

  createJobTitles(createJobTitle: FormData): Observable<JobTitle> {
    return this.http.post<JobTitle>(this.baseApiUrl + '/AddJobsTitles', createJobTitle)
  };

  updateJobTitle(updateDepartment: FormData): Observable<JobTitle> {
    return this.http.post<JobTitle>(this.baseApiUrl + '/EditJobsTitles', updateDepartment)
  };

  removeJobTitle(id: number): Observable<JobTitle> {
    return this.http.delete<JobTitle>(this.baseApiUrl + '/RemoveJobsTitles/' + id)
  };

  getJobTitleById(id: number): Observable<JobTitle> {
    return this.http.get<JobTitle>(this.baseApiUrl + '/GetJobTitleById?id=' + id)
  };

}
