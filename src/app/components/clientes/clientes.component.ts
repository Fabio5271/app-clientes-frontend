import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clienteList: Cliente[] = [];
  newCliente: Cliente = new Cliente;
  createMode = true;
  userLogged: Usuario = JSON.parse(localStorage.getItem('userCreds')!);

  constructor(private clientesService: ClientesService, private loginService: LoginService, private router: Router) {
    this.getAllClientes();
  }

  getAllClientes() {
    this.clientesService.getAll().subscribe((cList: Cliente[]) => {
      this.clienteList = cList;
    })
  }

  createCliente() {
    const newC = {
      nome: this.newCliente.nome,
      cpf: this.newCliente.cpf,
      cep: this.newCliente.cep,
      lograd: this.newCliente.logradouro,
      bairro: this.newCliente.bairro,
      cidade: this.newCliente.cidade,
      uf: this.newCliente.uf,
      complEndrc: this.newCliente.complEndrc
    };
    this.clientesService.create(newC).subscribe({
      next: () => {
        alert("Cliente criado!");
        window.location.reload;
      },
      error: () => {
        alert("Erro ao criar cliente");
      }
    });
  }

  // updateCliente() {
  //   this.clientesService.update(this.newCliente).subscribe({
  //     next: () => {
  //       alert("Cliente atualizado!");
  //       window.location.reload;
  //     },
  //     error: () => {
  //       alert("Erro ao atualizar cliente");
  //     }
  //   })
  // }

  // deleteCliente(id: number) {
  //   if (confirm("Tem certeza de que quer deletar esse cliente?")) {
  //     this.clientesService.delete(id).subscribe({
  //       next: () => {
  //         alert("Cliente deletado!");
  //         window.location.reload;
  //       },
  //       error: () => {
  //         alert("Erro ao deletar cliente");
  //       }
  //     })
  //   }
  // }

  openModel(cliente: Cliente = new Cliente) {
    if (cliente.id == null) {
      this.createMode = true;
      this.newCliente = new Cliente();
    } else {
      this.createMode = false;
      this.newCliente = cliente;
    }
  }

  viewCliente(id: number) {
    this.router.navigate(['cliente/', id]);
  }

  logout(){
    this.loginService.logout();
  }
}