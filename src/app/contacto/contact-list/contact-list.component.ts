import { Icontacto } from './../icontacto';
import { ContactoService } from './../contacto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

contactos: Icontacto[];
contacto:Icontacto;



  constructor(private ContactoService:ContactoService) {
    //Esperando cambios
    this.ContactoService.updateContacts.subscribe(()=> this.contactos = this.ContactoService.getContactos())

  }


   ngOnInit() {


    if(localStorage.getItem("contactos") === null){
      this.ContactoService.UploadContactJson().subscribe( (contactos)=>{
        localStorage.setItem('contactos', JSON.stringify(contactos));
        this.ContactoService.updateContacts.next(true);

     });
     }

    this.contactos = this.ContactoService.getContactos();

   }


   edit(contacto:Icontacto){
    this.ContactoService.editContact.next(contacto);
   }


   prueba(){
    console.log('entro');
    console.log('entro');
    console.log('entro');
    // console.log(algo);
   }














   json(){


  }



}
