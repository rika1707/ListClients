import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ClientsServiceService } from '../clients-service.service';
import { IClients } from '../interfaces/clients.interface';
import { MapsComponent } from '../maps/maps.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details-clients',
  imports: [CommonModule, MapsComponent, MatButtonModule, MatIcon],
  templateUrl: './details-clients.component.html',
  styleUrl: './details-clients.component.css'
})
export class DetailsClientsComponent implements OnInit {

  private _route = inject(Location);
  private readonly _routePathMap = inject(ActivatedRoute)
  private readonly _clientService = inject(ClientsServiceService)
  client!: IClients

  ngOnInit(): void {
    const id = this._routePathMap.snapshot.paramMap.get('id');
    this._clientService.getClientById(id as string).subscribe(res => {
      this.client = res
    })
  }
  goBack(): void {
    this._route.back();
  }

}
