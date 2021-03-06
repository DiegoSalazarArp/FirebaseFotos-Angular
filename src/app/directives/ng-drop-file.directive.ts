import { FileItem } from '../models/file-item';
import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFile]',
})
export class NgDropFileDirective {



  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);



    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);

    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista)

    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemp = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemp)) {
        const nuevoArchivo = new FileItem(archivoTemp);

        this.archivos.push(nuevoArchivo)
      }
    }

    console.log(this.archivos)
  }



  
  // validaciones

  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (
      !this._archivoFueDropeado(archivo.name) &&
      this._imagenes(archivo.type)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoFueDropeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + 'ya est?? agregado');
        return true;
      }
    }

    return false;
  }

  private _imagenes(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined)
      ? false
      : tipoArchivo.startsWith('image');
  }
}
