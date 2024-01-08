import {Component, OnInit} from '@angular/core';
import {AuthService} from "./Service/AuthService/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "ShopOnline"

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    setInterval((): void => {
      this.refresh()
    }, 29000);
  }

  public refresh(): void {
    if (this.auth.isLogged()) {
      this.auth.refreshToken().subscribe({
        next: response => {
          localStorage.setItem('TOKEN', response.access_token);
          localStorage.setItem('RTOKEN', response.refresh_token);
        },
        error: error => {
          alert('Error')
        }
      })
    }
  }
}
