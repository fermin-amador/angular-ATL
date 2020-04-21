
export interface Icontacto {
  id: string;
  contact: string;
  address: string;
  phones: string[];
  contacts?: Icontacto[];
}

export class Contacto implements Icontacto {
  constructor(public id = '', public contact = '', public address = '', public phones = []) { }
}
