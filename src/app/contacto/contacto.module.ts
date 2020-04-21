import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
  declarations: [ContactFormComponent, ContactListComponent, ContactoComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    ContactoRoutingModule
  ]
  // providers: [Output,Input]
})
export class ContactoModule { }
