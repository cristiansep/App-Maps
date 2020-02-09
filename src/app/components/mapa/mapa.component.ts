import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador,class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = -40.5736747;
  lng = -73.1516403;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { 
     if (localStorage.getItem('marcadores')) {
       this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
     }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {

    const coords = evento.coords;

    const newMarker = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(newMarker);

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 3000});
  }


  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', {duration: 3000});
  }


  editarMarcador(marker: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marker.titulo, desc: marker.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (! result) {
        return;
      }
      marker.titulo = result.titulo;
      marker.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', {duration: 3000});
    });
  }


  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  

}
