import {Component} from '@angular/core';
import {faArrowLeft, faArrowRight, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonService} from "../../../Service/PersonService/person.service";
import {Person} from "../../../Model/Entity/Person";

@Component({
  selector: 'app-personList',
  templateUrl: './Person.component.html',
  styleUrls: ['./Person.component.css']
})
export class PersonListComponent {
  persons!: Person[]

  form!: FormGroup

  isLeftButtonDisabled: boolean = false

  isSearchDisabled: boolean = false

  isRightButtonDisabled: boolean = false

  pageNumber!: number

  pageSize!: number

  isPersonEmpty: boolean = false

  iconArrowRight: IconDefinition = faArrowRight;

  iconArrowLeft: IconDefinition = faArrowLeft;

  email!: string

  constructor(private personService: PersonService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({email: ''})
    this.email = ''
    this.pageNumber = 0
    this.pageSize = 6
    this.showProducts()
  }

  onArrowRight(): void {
    this.pageNumber++
    if (this.email != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }

  onArrowLeft(): void {
    this.pageNumber--
    if (this.email != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }

  showProducts() {
    this.isRightButtonDisabled = true
    this.isLeftButtonDisabled = true
    this.personService.showPersons(this.pageNumber, this.pageSize, 'firstName').subscribe(
      {
        next: response => {
          if (Array.isArray(response)) {
            this.persons = response
            this.isPersonEmpty = false
            this.isRightButtonDisabled = false
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
          } else {
            this.isPersonEmpty = true
            this.isRightButtonDisabled = true
            this.persons = []
            this.isLeftButtonDisabled = false
          }
          this.isSearchDisabled = false
        },
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    );
  }

  showProductsByProductName(): void {
    this.isRightButtonDisabled = true
    this.isLeftButtonDisabled = true
    this.personService.showPersonsByEmail(this.pageNumber, this.pageSize, 'firstName', this.email).subscribe(
      {
        next: response => {
          if (Array.isArray(response)) {
            this.persons = response
            this.isPersonEmpty = false
            this.isRightButtonDisabled = false
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
          } else {
            this.isPersonEmpty = true
            this.persons = []
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
            this.isRightButtonDisabled = true
          }
          this.isSearchDisabled = false
        },
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    );
  }

  onSubmit(form: FormGroup): void {
    this.isSearchDisabled = true
    this.pageNumber = 0
    this.email = form.value.email
    if (this.email != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }
}
