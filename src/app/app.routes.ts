import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteEditorComponent } from './components/cliente-editor/cliente-editor.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'cliente/:id', component: ClienteComponent},
    {path: 'edit/:id', component: ClienteEditorComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];
