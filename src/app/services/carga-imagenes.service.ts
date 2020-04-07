import { Injectable } from '@angular/core';

// Angular Fire
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { FileItemModule } from '../models/file-item/file-item.module';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  // tslint:disable-next-line: variable-name
  private CARPETA_iMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }


  cargarImagenesFirebase( imagenes: FileItemModule[] ) {
    console.log( imagenes );
  }


  private guardarImagen( imagen: { nombre: string, url: string } ) {
    this.db.collection( `${ this.CARPETA_iMAGENES }` ).add( imagen );

  }

}
