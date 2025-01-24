import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // RouterLink,
    // RouterLinkActive
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private loginService: LoginService){}
  title = 'app-clientes-frontend';
  userLogged: Usuario = JSON.parse(localStorage.getItem('userCreds')!);

  logout(){
    this.loginService.logout();
  }
}
