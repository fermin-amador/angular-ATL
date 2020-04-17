import { ContactoService } from './../contacto.service';
import { Icontacto, Contacto } from './../icontacto';
import { Component, OnInit,EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm:FormGroup;
  contacto:Icontacto;
  contactos:Icontacto[];

  @Output('actualizarContact') updateContact: EventEmitter<any> = new EventEmitter();
  constructor(private fb:FormBuilder,
              private ContactoService:ContactoService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      id:[''],
      contacto:[''],
      direccion:[''],
      telefonos:['']
    });

  }

  saveContact(){

    this.contacto = this.contactForm.value;
    this.ContactoService.addContacto(this.contacto);
    // window.location.reload();

    this.updateContact.emit(true);


    // this.updateContact.emit("holaa");

    // this.contacto = this.contactForm.value;


    // this.updateContact.emit();
    // console.log(this.contacto);
    // this.contactForm.reset();
    // console.log(data);
  }


  data($event){

    console.log("dsfsfsdfsdf");
    console.log($event);
  }

}
