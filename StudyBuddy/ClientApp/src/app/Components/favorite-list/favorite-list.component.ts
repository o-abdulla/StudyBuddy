import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {
  person: SocialAuthService = {} as SocialAuthService;
  FavoritesList: FavoriteListComponent[] = [];

  constructor(private _questionsAnswersService: QuestionsAnswersService) { }

  ngOnInit(): void {
    
  }

  
}
