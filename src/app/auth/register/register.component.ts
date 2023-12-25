import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('Password');
    const retypePassword = control.get('retypePassword');
    return password?.value === retypePassword?.value ? null : { PasswordNoMatch: true };
  };

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { }
  signup = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(6),Validators.maxLength(100)]),
    retypePassword: new FormControl("", [Validators.required, Validators.minLength(6),Validators.maxLength(100)]),
  
  }, { validators: this.passwordMatchingValidatior });

  ngOnInit(): void {
  }

  
  

  signupForm() {
    if (this.signup.valid) {
      this.auth.userRegister(this.signup.value
      ).subscribe({
        next: (res) => {
          this.router.navigate(['/mainService']);
        },
        error: (err) => {
          this.toastr.error(JSON.stringify(err));
        }
      });
    } else {
      this.toastr.error("inputs incorrect");
    }
  };
}
