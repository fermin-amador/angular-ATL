import { Icontacto } from './icontacto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  contactos: Icontacto[];
  contactos2: Observable<Icontacto[]>;

  constructor(private http: HttpClient) {

    if(localStorage.getItem("contactos") === null){
      this.UploadContactJson().subscribe( (contactos)=>{
        localStorage.setItem('contactos', JSON.stringify(contactos));
        // this.contactos = contactos;
     });
     }

   }


   UploadContactJson(){
     return this.http.get<Icontacto>("http://localhost:4200/assets/contactos.json").pipe(
       map((data:Icontacto) => data.contactos)
     )
  }

  getContactos(){
    return JSON.parse(localStorage.getItem('contactos'));
  }

  addContacto(contacto:Icontacto){

    this.contactos = JSON.parse(localStorage.getItem('contactos'))
    let id = (this.contactos.length + 1).toString();
    contacto.id = id;
    localStorage.clear();
    this.contactos.push(contacto);
    localStorage.setItem('contactos',JSON.stringify(this.contactos))
    console.log(this.getContactos());

  }





}

