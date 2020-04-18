import { ContactoService } from './../contacto.service';
import { Icontacto } from './../icontacto';
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm:FormGroup;
  contacto:Icontacto;
  edit:boolean = false;


  constructor(private fb:FormBuilder,
              private ContactoService:ContactoService) { }

  ngOnInit() {
    this.edit = false;
    this.contactForm = this.fb.group({
      id:[''],
      contacto:['',Validators.required],
      direccion:['',Validators.required],
      telefonos:this.fb.array([ this.BuildTelefono()])
    });

    this.ContactoService.editContact.subscribe(contacto =>{


      this.telefonos.clear();
      contacto.telefonos.forEach(() => {
          this.addTelefono();
        });
      this.contactForm.patchValue(contacto);
      this.edit = true;


    })


  }

  cancel(){
    this.contactForm.reset();
    this.telefonos.clear();
    this.telefonos.push(this.BuildTelefono());
    this.edit = false;
  }

  saveContact(){

    this.contacto = this.contactForm.value;
    this.ContactoService.addContacto(this.contacto);
    this.ContactoService.updateContacts.next(true);
    this.cancel();
  }

  updateContact(){
    this.contacto = this.contactForm.value;
    this.ContactoService.updateContact(this.contacto);
    this.ContactoService.updateContacts.next(true);
    this.cancel();
  }

  BuildTelefono(): FormControl{
    return this.fb.control('',Validators.required);
  }

  addTelefono(){
    this.telefonos.push(this.BuildTelefono());
  }

get contactoInput() { return this.contactForm.get('contacto'); }
get direccionInput() { return this.contactForm.get('direccion'); }
get telefonosInput() { return this.contactForm.get('telefonos'); }

get telefonos():FormArray {
  return <FormArray>this.contactForm.get('telefonos');
}

removeTel(index){

  this.telefonos.removeAt(index)

}

}
