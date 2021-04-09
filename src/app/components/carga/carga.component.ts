import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [],
})
export class CargaComponent implements OnInit {
  estaSobreDrop = false;
  archivos: FileItem[] = [];

  constructor(public cargaImagenes: CargaImagenesService) {}

  ngOnInit(): void {}

  cargarImagenes() {
    this.cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos(){
    this.archivos = []; 
  }
}
