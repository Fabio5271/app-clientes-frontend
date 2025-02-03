import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { Email } from '../../models/email';
import { Telefone } from '../../models/telefone';
import { Usuario } from '../../models/usuario';
import { ClientesService } from '../../services/clientes.service';
import { EmailService } from '../../services/email.service';
import { TelefoneService } from '../../services/telefone.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxMaskDirective, NgIf],
  providers: [provideNgxMask()],
  templateUrl: './cliente-editor.component.html',
  styleUrl: './cliente-editor.component.css'
})
export class ClienteEditorComponent {
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
  cform = new FormGroup({
    nome: new FormControl(this.cliente.nome, Validators.required),
    cpf: new FormControl(this.cliente.cpf, Validators.required),
    cep: new FormControl(this.cliente.cep, Validators.required),
    lograd: new FormControl(this.cliente.logradouro, Validators.required),
    bairro: new FormControl(this.cliente.bairro, Validators.required),
    cidade: new FormControl(this.cliente.cidade, Validators.required),
    uf: new FormControl(this.cliente.uf, Validators.required),
    compl: new FormControl(this.cliente.complEndrc),
  });

  // ngOnInit(): void {
  //   this.getCliente();
  //   this.cform = new FormGroup({
  //     nome: new FormControl(this.cliente.nome, Validators.required),
  //     cpf: new FormControl(this.cliente.cpf, Validators.required),
  //     cep: new FormControl(this.cliente.cep, Validators.required),
  //     lograd: new FormControl(this.cliente.logradouro, Validators.required),
  //     bairro: new FormControl(this.cliente.bairro, Validators.required),
  //     cidade: new FormControl(this.cliente.cidade, Validators.required),
  //     uf: new FormControl(this.cliente.uf, Validators.required),
  //     compl: new FormControl(this.cliente.complEndrc),
  //   })
  // }


  get nome() {
    return this.cform.get('nome');
  }

  get cpf() {
    return this.cform.get('cpf');
  }

  get cep() {
    return this.cform.get('cep');
  }

  get lograd() {
    return this.cform.get('lograd');
  }

  get bairro() {
    return this.cform.get('bairro');
  }

  get cidade() {
    return this.cform.get('cidade');
  }

  get uf() {
    return this.cform.get('uf');
  }

  get compl() {
    return this.cform.get('compl');
  }


  getCliente() {
    this.clientesService.get(this.cid).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
      this.nome?.setValue(cliente.nome);
      this.cpf?.setValue(cliente.cpf);
      this.cep?.setValue(cliente.cep);
      this.lograd?.setValue(cliente.logradouro);
      this.bairro?.setValue(cliente.bairro);
      this.cidade?.setValue(cliente.cidade);
      this.uf?.setValue(cliente.uf);
      this.compl?.setValue(cliente.complEndrc);
    });
  }

  updateCliente() {
    this.newCliente = this.cliente;
    this.clientesService.update(this.newCliente).subscribe({
      error: (error) => {
        alert("Erro ao atualizar cliente");
        console.log(error);
      },
    });
    for (let email of this.emailList) {
      this.emailService.update(email).subscribe({
        error: (error) => {
          alert("Erro ao atualizar cliente");
          console.log(error);
        },
      });
    }
    for (let telefone of this.telefoneList) {
      this.telefoneService.update(telefone).subscribe({
        error: (error) => {
          alert("Erro ao atualizar cliente");
          console.log(error);
        },
      });
    }
    this.router.navigate(['cliente/', this.cid]);

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

  openModel(cliente: Cliente = new Cliente) {
    if (cliente.id == null) {
      this.createMode = true;
      this.newCliente = new Cliente();
    } else {
      this.createMode = false;
      this.newCliente = cliente;
    }
  }
}
