import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceModalComponent } from '../insurance-modal/insurance-modal.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  imports: [HttpClientModule]
})
export class ContactCardComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(InsuranceModalComponent);
  }
}
