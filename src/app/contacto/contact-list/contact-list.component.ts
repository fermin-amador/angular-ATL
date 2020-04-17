import { Icontacto } from './../icontacto';
import { Observable } from 'rxjs';
import { ContactoService } from './../contacto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

contactos: Observable<Icontacto[]>;
contacto:Icontacto;


@Output() listContact = new EventEmitter<Icontacto[]>();
@Input('actualizar') update: boolean;
  constructor(private ContactoService:ContactoService) {

    console.log(this.update);

   }


   ngOnInit() {

    this.json();
    this.contactos = this.ContactoService.getContactos();

   }


   edit(contacto){




   }


   prueba(){
    console.log('entro');
    console.log('entro');
    console.log('entro');
    // console.log(algo);
   }














   json(){

    if(localStorage.getItem("contactos") === null){
      this.ContactoService.UploadContactJson().subscribe( (contactos)=>{
        localStorage.setItem('contactos', JSON.stringify(contactos));
        this.contactos = contactos;
     });
     }
  }



}
