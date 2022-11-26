import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarGenero } from '../models/salvar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarGeneroService {

private listaGeneroCriarGenero! : CriarGenero[]
private url='http://localhost:3000/genero'

  constructor(private httpClient: HttpClient) {
    this.listaGeneroCriarGenero=[]
   }
  get GeneroCriarGenero(){
    return this.listaGeneroCriarGenero
  }
  lerGeneroCriarGenero():Observable<CriarGenero[]>{
    return this.httpClient.get<CriarGenero[]>(this.url)
  }
  cadastrargenero(genero: CriarGenero): Observable<CriarGenero[]> {
    return this.httpClient.post<CriarGenero[]>(this.url, genero)
  }
  deletegenero(idGenero: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${idGenero}`);
  }
  editargenero(genero: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.put<CriarGenero>(`${this.url}/${genero.id}`,genero)
  }
  





}
