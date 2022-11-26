import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarUsuarios } from '../models/salvar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarUsuarioService {

private listaUsuarios! : CriarUsuarios[]
private url='http://localhost:3000/usuarios'

  constructor(private httpClient: HttpClient) {
    this.listaUsuarios=[]
   }
  get usuarios(){
    return this.listaUsuarios
  }
  lerUsuarios():Observable<CriarUsuarios[]>{
    return this.httpClient.get<CriarUsuarios[]>(this.url)
  }
  cadastrarUsuario(usuario: CriarUsuarios): Observable<CriarUsuarios[]> {
    return this.httpClient.post<CriarUsuarios[]>(this.url, usuario)
  }
  deleteUsuario(idUsuario: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${idUsuario}`);
  }
  editarUsuario(usuario: CriarUsuarios): Observable<CriarUsuarios> {
    return this.httpClient.put<CriarUsuarios>(`${this.url}/${usuario.id}`,usuario)
  }
  





}
