import { Injectable, inject } from '@angular/core';

import { ComponentType } from '@angular/cdk/portal';
import { IClients } from '../../interfaces/clients.interface';
import {MatDialog} from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  private readonly _mat_dialog = inject(MatDialog)

  constructor() { }

  //funcion para abrir el modal
  openModal<CT,T=IClients>(component: ComponentType<CT>, data?: T, isEditible: boolean = false, ):void {
    const config = {
      isEditible,
      data: data
    }
    this._mat_dialog.open(component, {
      width: '500px',
      data: config
    })
  }

  //funcion para cerra el modal
  closeModal():void {
    this._mat_dialog.closeAll()
  }
}
