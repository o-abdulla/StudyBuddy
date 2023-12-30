import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent {
  @Input() favoriteCheck:Boolean = {} as boolean;
  @Input() isOnFavs:Boolean = false;
}
