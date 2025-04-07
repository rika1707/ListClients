import * as L from 'leaflet';

import { Component, Input, OnInit } from '@angular/core';

import { IClients } from '../interfaces/clients.interface';

@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {

  @Input() client!: IClients
  ngOnInit(): void {
    if (!this.client?.latitude || !this.client?.longitude) return;

    const lat = this.client.latitude;
    const lon = this.client.longitude;
    const map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup('Ubicación encontrada')
      .openPopup();
  }

}
