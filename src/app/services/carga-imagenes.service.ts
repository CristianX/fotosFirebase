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
    // console.log( imagenes );
    const storageRef = firebase.storage().ref();

    for ( const item of imagenes ) {
      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_iMAGENES }/${ item.nombreArchivo }`)
      .put( item.archivo );

      // Subir imagen, barra de progreso
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
      item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
      ( error ) => console.error('Error al subir', error),
      () => {
        console.log('Imagen cargada correctamente');

        // Obteniendo url de imagen
        uploadTask.snapshot.ref.getDownloadURL()
        .then( ( url ) => {
          item.url = url;
          item.estaSubiendo = false;

          // Guardando imagen en la bdd
          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          });
        } );
      }
      );
    }
  }


  private guardarImagen( imagen: { nombre: string, url: string } ) {
    this.db.collection( `${ this.CARPETA_iMAGENES }` ).add( imagen );

  }

}
