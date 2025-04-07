import { BehaviorSubject, Observable, map } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IClients } from './interfaces/clients.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientsServiceService {

  private refreshTasks = new BehaviorSubject<void>(undefined);
  refreshTasks$ = this.refreshTasks.asObservable();
  private readonly _http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}`
  private baseUrlMaps = `${environment.BASE_URL_MAPS}`;

  notifyClientsCreated() {
    this.refreshTasks.next(); // 🚀 Notify changes in create and update
  }

  //create service to list clients
  getAllClients(): Observable<IClients[]> {
    return this._http.get<IClients[]>(this.apiUrl)
  }

  //get client by id
  getClientById(id: string): Observable<IClients> {
    return this._http.get<IClients>(`${this.apiUrl}/${id}`)
  }

  //create service to create a client
  createCliet(client: IClients): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(this.apiUrl, client)
  }

  updateClient(client: IClients): Observable<{ message: string }> {
    return this._http.put<{ message: string }>(`${this.apiUrl}/${client.id}`, client)
  }

  deleteClient(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this.apiUrl}/${id}`)
  }

  getExcel(): Observable<any> {
    return this._http.get(`${this.apiUrl}/download-excel`, {
      responseType: 'blob' as 'blob'
    })
  }

  //get coordinates of the address
  getCoordinates(address: string): Observable<{ lat: number; lon: number }> {
    const params = {
      q: address,
      format: 'json',
      limit: '1',
    };

    return this._http.get<any[]>(this.baseUrlMaps, { params }).pipe(
      map((results) => {
        if (results.length > 0) {
          return {
            lat: parseFloat(results[0].lat),
            lon: parseFloat(results[0].lon),
          };
        } else {
          throw new Error('No se encontraron resultados');
        }
      })
    );
  }
}
