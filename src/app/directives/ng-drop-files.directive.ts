// EventEmitter esta al pendiente de que algo sucedió, donde se lo está manejando
// ElementRef sirve para tener una relacion directa con el html que contiene la directiva
// HostListener sirve para poder crear eventos o callbacks cuando algo suceda, click, cuando el mouse este arriba entre otras cosas
// Input para recibir información del padre / Output relacionado con elo eventEmitter para poder decirle al padre que se tiene una respuesta
import { Directive, EventEmitter, ElementRef, Input, Output, HostListener } from '@angular/core';
import { FileItemModule } from '../models/file-item/file-item.module';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItemModule[] = [];

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }


  // Cuando el drag está sobre el cuadro
  @HostListener( 'dragover', ['$event'] )
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  // Cuando el drag esta fuera del cuadro
  @HostListener( 'dragleave', ['$event'] )
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  // Para cuando se solto la imagen
  @HostListener( 'drop', ['$event'] )
  public onDrop( event: any ) {
    

    const transferencia = this._getTransferencia( event );

    if ( !transferencia ) {
      return;
    }

    this._extraerArchivos( transferencia.files );
    
    this._prevenirDetener( event );

    this.mouseSobre.emit( false );
  }

  // Esto es para extender la compatibilidad, ya que algunos navegadores lo utilizan directo y otros no
  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }


  private _extraerArchivos( archivosLista: FileList ) {
    console.log( archivosLista );

    // Aquí se barra cada una de las propiedades del objeto
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado( archivoTemporal ) ) {
        const nuevoArchivo = new FileItemModule( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }

    console.log( this.archivos );

  }


  // Validaciones


  // Para cuando se haga el drop, no se abra la imagen
  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Validación para aegurarse que el archivo no haya sido dropeado ahi, que no exista en el arreglo de imagenes
  private _archivoYaFueDropeado( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log(' El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return false;
  }


  // Verificar que sean imagenes
  private _esImagen( tipoArchivo: string ): boolean {
    return( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith( 'image' );
  }

  // Validacion tanto si el archivo ya fue dropeado y si es una imagen
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoYaFueDropeado(archivo.name) && this._esImagen( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }


}
