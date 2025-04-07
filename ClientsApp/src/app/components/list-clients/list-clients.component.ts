import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';

import { ClientsFormsComponent } from '../modals/clients-forms/clients-forms.component';
import { ClientsServiceService } from '../clients-service.service';
import { CommonModule } from '@angular/common';
import { IClients } from '../interfaces/clients.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ModalDeleteComponent } from '../modals/modal-delete/modal-delete.component';
import { ModalServiceService } from '../modals/clients-forms/modal-service.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list-clients',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListClientsComponent implements OnInit, OnDestroy {


  private readonly _route = inject(Router)
  private readonly _listClients = inject(ClientsServiceService)
  private readonly _cdr = inject(ChangeDetectorRef)
  private readonly _clientService = inject(ClientsServiceService)
  private destroy$ = new Subject<void>();
  private readonly _modalSvc = inject(ModalServiceService)
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['position', 'Name', 'Direction', 'PhoneNumber', 'Latitude', 'Longitude', 'Actions'];
  listDataClients!: IClients[]
  loadingExcel = false




  ngOnInit(): void {
    this.loadTodos()
    this._clientService.refreshTasks$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadTodos() // reload the list when detect a change
    })
  }

  private loadTodos() {
    this._listClients.getAllClients().subscribe(resp => {
      this.listDataClients = resp
      this._cdr.detectChanges();
    })
  }

  editTask(data: IClients): void {
    this._modalSvc.openModal<ClientsFormsComponent, IClients>(ClientsFormsComponent, data)
  }

  openDialog(id: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._modalSvc.openModal<ModalDeleteComponent, string>(ModalDeleteComponent, id)
  }


  openDialogAddClient(): void {
    // modal to create a client
    this._modalSvc.openModal<ClientsFormsComponent>(ClientsFormsComponent)
  }


  viewDetailClients(id: string) {
    this._route.navigate(['details', id])
  }

  downloadExcel() {
    this.loadingExcel = true;
    this._clientService.getExcel().pipe(
      finalize(() => {
        this.loadingExcel = false
        this._cdr.detectChanges();
      })
    ).subscribe({
      next: (blob) => {
        const file = new Blob([blob], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(file, 'RegisterClients.xlsx');
      },
      error: (err) => {
        console.error('Download error', err);
        // Optionally show a toast or alert here
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
