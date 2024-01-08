import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Service/AuthService/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AddPersonDTO} from "../../../Model/DTO/PersonDTO/AddPersonDTO";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup

  isRegisterDisabled: boolean = false

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({firstName: '', lastName: '', password: '', email: '', telephone: ''})
  }

  onSubmit(form: any): void {
    this.isRegisterDisabled = true
    let addPersonDTO: AddPersonDTO = new AddPersonDTO
    addPersonDTO.email = form.value.email
    addPersonDTO.password = form.value.password
    addPersonDTO.firstName = form.value.firstName
    addPersonDTO.lastName = form.value.lastName
    addPersonDTO.telephone = form.value.telephone
    this.authService.addPerson(addPersonDTO).subscribe({
      next: (response: HttpResponse<any>) => {
        this.isRegisterDisabled = false
        this.authService.login(form.value.email, form.value.password).subscribe({
            next: (response: HttpResponse<any>) => {
              localStorage.setItem('TOKEN', response.body.access_token);
              localStorage.setItem('RTOKEN', response.body.refresh_token);
              if (this.authService.getRole().includes("admin")) {
                this.router.navigate(['/adminPage'])
              } else {
                this.router.navigate(['/personPage'])
              }
            },
            error: error => {
              alert('Error')
            }
          }
        );
      },
      error: error => {
        alert('Error')
        this.isRegisterDisabled = false
      }
    })
  }
}
