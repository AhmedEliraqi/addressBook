import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private route: Router, private auth: AuthService,private toastr: ToastrService) { }

  login = new FormGroup({
    email: new FormControl("", [Validators.required]),
    Password: new FormControl("", [Validators.required]),
  })

  ngOnInit(): void {
  }

  loginForm() {
    if (this.login.valid) {
      this.auth.userlogin(this.login.value
      ).subscribe({
        next: (res) => {
          console.log(res.message);
          this.route.navigate(['/mainService']);
        },
        error: (err) => {
          this.toastr.error("invalid username or password");
        },
      })

    } else {
      this.toastr.error("failed to login");
    }
  };

}
