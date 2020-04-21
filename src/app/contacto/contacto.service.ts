import { Icontacto } from './icontacto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  contacts: Icontacto[];
  edit = new Subject<Icontacto>();
  updateContacts = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  UploadContactJson() {
    if (localStorage.getItem("contacts") === null) {
      this.http.get<Icontacto>("http://localhost:4200/assets/contacts.json").pipe(map((data: Icontacto) => data.contacts))
        .subscribe((contacts) => {
          this.SetContacts(contacts);
          this.updateContacts.next(true);
        });
    } else {
      this.updateContacts.next(true);
    }
  }
  addContact(contacto: Icontacto) {
    this.contacts = this.getContacts();
    contacto.id = (this.contacts.length + 1).toString();
    localStorage.clear();
    this.contacts.push(contacto);
    this.SetContacts(this.contacts);
    this.updateContacts.next(true);
  }
  updateContact(newContact: Icontacto) {
    this.contacts = this.getContacts();
    this.contacts = this.contacts.map((contact: Icontacto) => {
      if (contact.id == newContact.id) {
        Object.assign(contact, newContact);
      }
      return contact;
    });
    localStorage.clear();
    this.SetContacts(this.contacts);
    this.updateContacts.next(true);
  }
  editContact(contact: Icontacto) {
    this.edit.next(contact);
  }
  getContacts(): Icontacto[] {
    return JSON.parse(localStorage.getItem('contacts'));
  }
  SetContacts(contacts: Icontacto[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}

