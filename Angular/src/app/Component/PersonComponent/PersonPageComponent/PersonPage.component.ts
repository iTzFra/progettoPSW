import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Service/AuthService/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personPage',
  templateUrl: './PersonPage.component.html',
  styleUrls: ['./PersonPage.component.css']
})
export class PersonPageComponent implements OnInit {
  isLogoutDisabled: boolean = false

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogout(): void {
    this.isLogoutDisabled = true
    this.authService.logout().subscribe({
      next: (response: HttpResponse<any>) => {
        localStorage.clear()
        this.isLogoutDisabled = false
        this.router.navigate(['/'])
      },
      error: error => {
        this.isLogoutDisabled = false
        alert('Error')
      }
    })
  }

  ngOnInit(): void {
  }
}
