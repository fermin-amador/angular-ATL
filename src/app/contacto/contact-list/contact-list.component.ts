import { Icontacto } from './../icontacto';
import { ContactoService } from './../contacto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Icontacto[];
  contact: Icontacto;
  constructor(private ContactService: ContactoService) {}

  ngOnInit() {
    this.ContactService.updateContacts.subscribe(() => this.contacts = this.ContactService.getContacts());
    this.ContactService.UploadContactJson();
  }
  edit(contact: Icontacto) {
    this.ContactService.editContact(contact);
  }

}
