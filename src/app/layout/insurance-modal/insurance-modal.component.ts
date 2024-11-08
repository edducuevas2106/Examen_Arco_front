import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { PostalCodeService } from '../../services/postal-code.service';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-modal',
  standalone: true,
  templateUrl: './insurance-modal.component.html',
  styleUrls: ['./insurance-modal.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [PostalCodeService ],
})
export class InsuranceModalComponent {
  codigoPostal: string = '';
  estado: string = '';
  municipio: string = '';
  colonia: string = '';
  colonias: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<InsuranceModalComponent>,
    private postalCodeService: PostalCodeService
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  onPostalCodeInput(event: any): void {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      this.codigoPostal = value;
      if (value.length === 5) {
        this.consultarCodigoPostal(value);
      } else {
        this.resetForm();
      }
    } else {
      event.target.value = this.codigoPostal; // Mantiene solo números
    }
  }

  consultarCodigoPostal(codigoPostal: string): void {
    this.postalCodeService.getPostalCodeInfo(codigoPostal).subscribe(response => 
      { 
        if (response.CatalogoJsonString) { 
          const data = JSON.parse(response.CatalogoJsonString)[0]; 
          console.log(data)
          this.estado = data.Municipio.Estado.sEstado || ''; 
          this.municipio = data.Municipio.sMunicipio || ''; 
          this.colonias = data.Ubicacion.map((item: any) => item.sUbicacion); 

          console.log(this.colonias)
        } 
        else { 
          this.resetForm(); } 
        },
         error => { 
          this.resetForm(); 
          console.error('Error al consultar el código postal:', error); 
        });
  }

  resetForm(): void {
    this.estado = '';
    this.municipio = '';
    this.colonias = [];
    this.colonia = '';
  }
}


