import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-subscriber',
  imports: [MatIconModule],
  templateUrl: './add-subscriber.html',
  styleUrl: './add-subscriber.scss',
})
export class AddSubscriber {
  subsc = output();
  addNewSubscription() {
    this.subsc.emit();
  }
}
