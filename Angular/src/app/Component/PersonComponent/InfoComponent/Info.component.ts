import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonService} from "../../../Service/PersonService/person.service";
import {UpdatePersonDTO} from "../../../Model/DTO/PersonDTO/UpdatePersonDTO";

@Component({
  selector: 'app-info',
  templateUrl: './Info.component.html',
  styleUrls: ['./Info.component.css']
})
export class InfoComponent implements OnInit {
  form!: FormGroup

  isUpdateDisabled: boolean = false

  constructor(private formBuilder: FormBuilder, private personService: PersonService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({firstName: '', lastName: '', telephone: ''})
    this.personService.getLoggedPerson().subscribe({
      next: response => {
        this.form.setValue({
          firstName: response.firstName,
          lastName: response.lastName,
          telephone: response.telephone
        });
      },
      error: error => {
        alert('Error')
      }
    })
  }

  onSubmit(form: FormGroup): void {
    this.isUpdateDisabled = true
    let updatePerson: UpdatePersonDTO = new UpdatePersonDTO()
    updatePerson.firstName = form.value.firstName
    updatePerson.lastName = form.value.lastName
    updatePerson.telephone = form.value.telephone
    this.personService.updatePerson(updatePerson).subscribe({
      next: response => {
        this.isUpdateDisabled = false
        alert('Modificato')
      },
      error: error => {
        this.isUpdateDisabled = false
        alert('Error')
      }
    })
  }
}
