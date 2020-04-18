import { Icontacto } from './icontacto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  contactos: Icontacto[];

  editContact = new Subject<Icontacto>();
  updateContacts = new Subject<boolean>();


  constructor(private http: HttpClient) {}


   UploadContactJson():Observable<Icontacto[]>{

     return this.http.get<Icontacto>("http://localhost:4200/assets/contactos.json").pipe(
       map((data:Icontacto) => data.contactos)
     )
  }

  getContactos():Icontacto[]{
    return JSON.parse(localStorage.getItem('contactos'));
  }

  addContacto(contacto:Icontacto){

    this.contactos = JSON.parse(localStorage.getItem('contactos'))
    contacto.id = (this.contactos.length + 1).toString();
    localStorage.clear();
    this.contactos.push(contacto);
    localStorage.setItem('contactos',JSON.stringify(this.contactos))
    this.updateContacts.next(true);
  }

  updateContact(contactoNew:Icontacto){

    this.contactos = JSON.parse(localStorage.getItem('contactos'))
    this.contactos = this.contactos.map((contacto:Icontacto)=>{
      if(contacto.id == contactoNew.id){
        Object.assign(contacto,contactoNew);
      }
      return contacto;
    });
    localStorage.clear();
    localStorage.setItem('contactos',JSON.stringify(this.contactos))
    this.updateContacts.next(true);

  }





}

