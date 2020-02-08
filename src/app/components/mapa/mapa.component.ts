import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat = -40.5736747;
  lng = -73.1516403;

  constructor() { }

  ngOnInit() {
  }

}
