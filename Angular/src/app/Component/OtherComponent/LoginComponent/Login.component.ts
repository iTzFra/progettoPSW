import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Service/AuthService/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  isLoginDisabled: boolean = false

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({email: '', password: ''})
  }

  onSubmit(form: FormGroup): void {
    this.isLoginDisabled = true
    this.authService.login(form.value.email, form.value.password).subscribe({
        next: (response: HttpResponse<any>) => {
          localStorage.setItem('TOKEN', response.body.access_token);
          localStorage.setItem('RTOKEN', response.body.refresh_token);
          this.isLoginDisabled = false
          if (this.authService.getRole().includes("admin")) {
            this.router.navigate(['/adminPage'])
          } else {
            this.router.navigate(['/personPage'])
          }
        },
        error: error => {
          alert('Error')
          this.isLoginDisabled = false
        }
      }
    );
  }
}
