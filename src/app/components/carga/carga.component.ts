import { Component, OnInit } from '@angular/core';
import { FileItemModule } from '../../models/file-item/file-item.module';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItemModule[] = [];

  // tslint:disable-next-line: variable-name
  constructor( public _cargaImagenes: CargaImagenesService ) { }

  ngOnInit(): void {
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

}