import { Department } from "./department.model";
import { JobTitle } from "./jobTitle.model";

export interface AddressBook {
  id:number;
  fullName: string ;
  jobTitle: JobTitle;
  department: Department;
  mobileNumber: string ;
  dateOfBirth: string ;
  address: string ;
  email: string ;
  photo: File ;
  photoName:string;
  age: number ;
}
