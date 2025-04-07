import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { ClientsServiceService } from '../../clients-service.service';
import { CommonModule } from '@angular/common';
import { IClients } from '../../interfaces/clients.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { ModalServiceService } from './modal-service.service';

const MATERIAL_MODULES = [MatLabel, MatInputModule, MatFormFieldModule, MatDialogModule, MatButtonModule]

@Component({
  selector: 'app-clients-forms',
  imports: [ReactiveFormsModule, CommonModule, MATERIAL_MODULES],
  templateUrl: './clients-forms.component.html',
  styleUrl: './clients-forms.component.css'
})
export class ClientsFormsComponent {
  private readonly _modalSvc = inject(ModalServiceService)
  private readonly _fb = inject(FormBuilder);
  userForm!: FormGroup;
  private readonly _mat_dialog = inject(MAT_DIALOG_DATA)
  message!: { message: string }
  private _snackBar = inject(MatSnackBar);
  private readonly _clientService = inject(ClientsServiceService)

  //data
  name = this._mat_dialog.data ? this._mat_dialog.data.name : ''
  direction = this._mat_dialog.data ? this._mat_dialog.data.direction : ''
  phoneNumber = this._mat_dialog.data ? this._mat_dialog.data.phoneNumber : ''
  latitude = this._mat_dialog.data ? this._mat_dialog.data.latitude : ''
  longitude = this._mat_dialog.data ? this._mat_dialog.data.longitude : ''


  //creando formulario de usuario
  private _buildForm(): void {
    this.userForm = this._fb.nonNullable.group({
      name: [this.name || '', [Validators.required, Validators.maxLength(100), Validators.minLength(4)]],
      direction: [this.direction || '', [Validators.required, Validators.maxLength(150), Validators.minLength(4)]],
      phoneNumber: [this.phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      latitude: [this.latitude || ''],
      longitude: [this.longitude || ''],
    });
  }


  ngOnInit() {
    this._buildForm();
  }

  async onSubmitUser() {
    //validate if there is data to edit
    if (this._mat_dialog.data) {
      const updateClient: IClients = {
        ...this.userForm.value,
        id: this._mat_dialog.data.id
      }
      this._clientService.getCoordinates(this.userForm.controls['direction'].value).subscribe(res => {
        this.userForm.patchValue({
          latitude: res.lat,
          longitude: res.lon
        })
        updateClient.latitude = this.userForm.controls['latitude'].value
        updateClient.longitude = this.userForm.controls['longitude'].value
        //create clients
        this._clientService.updateClient(updateClient).subscribe({
          next: (response: { message: string }) => {
            this.message = response;
            this._snackBar.open(this.message.message, '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.userForm.reset();
            this._modalSvc.closeModal();
            this._clientService.notifyClientsCreated()
          },
          error: (error) => {
            console.error(error);
          }
        })
      })
    } else {
      this._clientService.getCoordinates(this.userForm.controls['direction'].value).subscribe(res => {
        this.userForm.patchValue({
          latitude: res.lat,
          longitude: res.lon
        })
        //create clients
        this._clientService.createCliet(this.userForm.value).subscribe({
          next: (response: { message: string }) => {
            this.message = response;
            this._snackBar.open(this.message.message, '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.userForm.reset();
            this._modalSvc.closeModal();
            this._clientService.notifyClientsCreated()
          },
          error: (error) => {
            console.error(error);
          }
        })
      })
    }

    this.userForm.markAllAsTouched();
  }

  getTitle(): string {
    return this._mat_dialog.data ? 'Edit' : 'Add'
  }

  onNoClick(): void {
    this._modalSvc.closeModal();
  }

  //capturar todos los campos para validacion de formulario
  get userFormControls(): any {
    return this.userForm.controls;
  }
}
