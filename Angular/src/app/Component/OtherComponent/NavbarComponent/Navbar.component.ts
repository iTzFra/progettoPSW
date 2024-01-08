import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Service/AuthService/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  isLogged: boolean = this.auth.isLogged()

  isUserLogged = this.auth.isLogged() && this.auth.getRole().includes("user")

  isAdminLogged = this.auth.isLogged() && this.auth.getRole().includes("admin")

  ngOnInit(): void {
  }
}



