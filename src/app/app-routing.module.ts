import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FilmesComponent } from './filmes/filmes.component';
import { GeneroComponent } from './genero/genero.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'filmes', component: FilmesComponent},
  {path: 'genero', component: GeneroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
