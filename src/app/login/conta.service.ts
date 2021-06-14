import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../conta/models/usuario';

import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    let response = this.http
      .post(this.UrlServiceV1 + 'Autoriza/register', usuario, this.ObterHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  login(usuario: Usuario): Observable<Usuario> {
    let response = this.http
      .post(this.UrlServiceV1 + 'Autoriza/login', usuario, this.ObterHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  getCategorias(): Observable<Categoria[]> {
    this.ObterAuthHeaderJson();
    return this.http.get<Categoria[]>(this.UrlServiceV1 + 'Categorias/produtos', super.ObterAuthHeaderJson())
      .pipe(
        tap(Categorias => console.log('leu as Categorias')),
        catchError(this.serviceError)
      );
  }

  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.UrlServiceV1}Categorias/${id}`;
    return this.http
      .get<Categoria>(url, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  addCategoria(cat: Categoria): Observable<Categoria> {
    return this.http
      .post(this.UrlServiceV1 + "Categorias", cat, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  updateCategoria(id: number, cat: Categoria): Observable<any> {
    const url = `${this.UrlServiceV1}Categorias/${id}`;
    return this.http
      .put(url, cat, super.ObterAuthHeaderJson())
      .pipe(
        map(Categorias => console.log('Alterou as categorias')),
        catchError(super.serviceError));
  }
  deleteCategoria(id: number): Observable<Categoria> {
    const url = `${this.UrlServiceV1}Categorias/${id}`;
    return this.http.delete<Categoria>(url, super.ObterAuthHeaderJson())
      .pipe(
        tap(_ => console.log(`remove o Categoria com id=${id}`)),
        catchError(super.serviceError)
      );
  }
}
