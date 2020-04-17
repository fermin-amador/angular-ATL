import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {path:'contactos', component:ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
