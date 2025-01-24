import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCreds: Usuario = new Usuario;
  loginSuccess = false;

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    const creds = {
      nome: this.userCreds.nome,
      senha: this.userCreds.senha
    }
    this.loginService.login(creds).subscribe({
      next: (data) => {
        this.loginSuccess = true;
        this.userCreds.token = window.btoa(this.userCreds.nome + ':' + this.userCreds.senha);
        localStorage.setItem('userCreds', JSON.stringify(this.userCreds));
        alert(`Usuário \'${this.userCreds.nome}\' logado com sucesso!`);
        this.router.navigate(['clientes']);
      },
      error: (error) => {
          alert("Usuário ou senha inválidos");
          console.log(error);
      },
    })
  }


}
