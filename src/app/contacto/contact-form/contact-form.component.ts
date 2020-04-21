import { ContactoService } from './../contacto.service';
import { Icontacto } from './../icontacto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  contacto: Icontacto;
  edit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ContactService: ContactoService) { }

  ngOnInit() {
    this.edit = false;
    this.contactForm = this.fb.group({
      id: [''],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      phones: this.fb.array([this.BuilderPhone()])
    });
    this.ContactService.edit.subscribe(contact => {
      this.phones.clear();
      contact.phones.forEach(() => {
        this.addPhone();
      });
      this.contactForm.patchValue(contact);
      this.edit = true;
    });
  }
  cancel() {
    this.contactForm.reset();
    this.phones.clear();
    this.phones.push(this.BuilderPhone());
    this.edit = false;
  }
  saveContact() {
    this.contacto = this.contactForm.value;
    this.ContactService.addContact(this.contacto);
    this.cancel();
  }
  updateContact() {
    this.contacto = this.contactForm.value;
    this.ContactService.updateContact(this.contacto);
    this.cancel();
  }
  BuilderPhone(): FormControl {
    return this.fb.control('', Validators.required);
  }
  addPhone() {
    this.phones.push(this.BuilderPhone());
  }
  get contactInput() { return this.contactForm.get('contact'); }
  get addressInput() { return this.contactForm.get('address'); }
  get phoneInput() { return this.contactForm.get('phones'); }
  get phones(): FormArray { return <FormArray>this.contactForm.get('phones'); }
  removePhone(index: number) {
    this.phones.removeAt(index);
  }

}
