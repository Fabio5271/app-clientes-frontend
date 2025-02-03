import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { TelefoneService } from '../../services/telefone.service';
import { Email } from '../../models/email';
import { Telefone } from '../../models/telefone';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  constructor(private clientesService: ClientesService, private emailService: EmailService, private telefoneService: TelefoneService, private route: ActivatedRoute, private router: Router) {
    this.getCliente();
    this.getEmails();
    this.getTelefones();
  }
  cliente: Cliente = new Cliente;
  newCliente: Cliente = new Cliente;
  createMode = true;
  cid = this.route.snapshot.paramMap.get('id');
  emailList: Email[] = [];
  telefoneList: Telefone[] = [];
  userLogged: Usuario = JSON.parse(localStorage.getItem('userCreds')!);

  getCliente() {
    this.clientesService.get(this.cid).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
    });
  }

  updateCliente() {
    this.clientesService.update(this.newCliente);
    // .subscribe({
    //   next: () => {
    //     alert("Cliente atualizado!");
    //     window.location.reload;
    //   },
    //   error: () => {
    //     alert("Erro ao atualizar cliente");
    //   }
    // })
    for (let email of this.emailList) {
      this.emailService.update(email);
    }
    for (let telefone of this.telefoneList) {
      this.telefoneService.update(telefone);
    }
  }

  deleteCliente() {
    if (confirm("Tem certeza de que quer deletar esse cliente?")) {
      this.clientesService.delete(this.cid).subscribe({
        next: () => {
          alert("Cliente deletado!");
          window.location.reload;
        },
        error: () => {
          alert("Erro ao deletar cliente");
        }
      })
    }
  }

  getEmails() {
    this.emailService.getAll().subscribe((emailList: Email[]) => {
      if (this.cid != null) {
        let emcid = parseInt(this.cid);
        for (let email of emailList) {
          if (email.idCliente == emcid) {
            this.emailList.push(email);
          }
        }
      }
    });
  }

  getTelefones() {
    this.telefoneService.getAll().subscribe((telefoneList: Telefone[]) => {
      if (this.cid != null) {
        let telcid = parseInt(this.cid);
        for (let tel of telefoneList) {
          if (tel.idCliente == telcid && tel.tipo == "Celular") {
            this.telefoneList.push(tel);
          }
        }
        for (let tel of telefoneList) {
          if (tel.idCliente == telcid && tel.tipo == "Comercial") {
            this.telefoneList.push(tel);
          }
        }
        for (let tel of telefoneList) {
          if (tel.idCliente == telcid && tel.tipo == "Residencial") {
            this.telefoneList.push(tel);
          }
        }
      }
    });
  }

  editCliente() {
    this.router.navigate(['edit/', this.cid]);
    
  }
}
