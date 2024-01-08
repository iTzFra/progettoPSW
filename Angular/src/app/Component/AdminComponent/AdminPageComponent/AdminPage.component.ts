import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "../../../Service/AuthService/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.css']
})
export class AdminPageComponent implements OnInit {
  isLogoutDisabled: boolean = false

  constructor(private authService: AuthService, private router: Router) {
  }

  onClick(): void {
    this.isLogoutDisabled = true
    this.authService.logout().subscribe({
      next: (response: HttpResponse<any>) => {
        localStorage.clear()
        this.isLogoutDisabled = false
        this.router.navigate(['/'])
      },
      error: error => {
        alert('Error')
        this.isLogoutDisabled = false
      }
    })
  }

  ngOnInit(): void {
  }
}
