import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Observable, of } from 'rxjs';
import { Usuario } from '../conta/models/usuario';
import { ContaService } from './conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario)
        .subscribe(
          sucesso => {
            this.contaService.LocalStorage.salvarDadosLocaisUsuario(sucesso);
            this.router.navigate(['/categorias']);
          },
          falha => { this.handleError<Usuario>('Login') }
        );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }



}
