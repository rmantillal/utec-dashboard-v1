import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

let api = environment.api;
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  buscar(data: any): any {
    return this.http.get(api + '?start_date=%27' + data.start_date + '%27&end_date=%27' + data.end_date + '%27&circuit_id=' + data.circuit_id);
  }
}
