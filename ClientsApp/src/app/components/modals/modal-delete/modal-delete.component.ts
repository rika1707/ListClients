import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ClientsServiceService } from '../../clients-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-delete',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<ModalDeleteComponent>);
  private readonly _clientService = inject(ClientsServiceService)
  private _snackBar = inject(MatSnackBar);
  private readonly _mat_dialog = inject(MAT_DIALOG_DATA)

  deleteClient(): void {
    if (this._mat_dialog.data) {
      this._clientService.deleteClient(this._mat_dialog.data).subscribe({
        next: (resp: { message: string }) => {
          this._snackBar.open(resp.message, '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this._clientService.notifyClientsCreated()
        },
        error: (error) => {
          console.log('Error al eliminar el cliente: ' + error.error.message);
        }
      })
    }
  }

}
