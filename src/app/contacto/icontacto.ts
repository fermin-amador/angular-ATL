
export interface Icontacto {

  id:string;
  contacto:string;
  direccion:string;
  telefonos:string[];


  contactos?:Icontacto[];
}

export class Contacto implements Icontacto {
  constructor(public id = '', public contacto = '', public direccion = '', public telefonos=[]) {}
}
