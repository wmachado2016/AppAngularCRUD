import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../login/conta.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  logoutForm!: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ContaService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.logoutForm = this.formBuilder.group({});
  }

  addLogout() {
    this.api.LocalStorage.limparDadosLocaisUsuario();
    this.router.navigate(['/login']);
  }

}
