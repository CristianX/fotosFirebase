import { Injectable } from '@angular/core';

// Angular Fire
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  // tslint:disable-next-line: variable-name
  private CARPETA_iMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }


  private guardarImagen( imagen: { nombre: string, url: string } ) {
    this.db.collection( `${ this.CARPETA_iMAGENES }` ).add( imagen );

  }

}
