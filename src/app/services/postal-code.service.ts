import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {
  private baseUrl = 'https://web.aarco.com.mx/api-examen/api/examen/sepomex/';

  constructor(private http: HttpClient) { }

  getPostalCodeInfo(codigoPostal: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${codigoPostal}`);
  }
}
