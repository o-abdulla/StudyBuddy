import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { QuestionsAndAnswers } from 'src/app/Models/questions-and-answers';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {

  FavoritesListResult: Favorite[] = [];
  user: SocialUser = {} as SocialUser;
  favoriteQuestions: Favorite[] = {} as Favorite[];
  QuestionsAnswersList: QuestionsAndAnswers[] = [];
  loggedIn: boolean = false;

  constructor(private _questionsAnswersService: QuestionsAnswersService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.ShowQuestions();
      this.ShowFavorites(this.user.id);
    });
  }

  ShowQuestions():QuestionsAndAnswers[]{
    this._questionsAnswersService.GetQuestions().subscribe((response:QuestionsAndAnswers[]) => {
      console.log(response)
      this.QuestionsAnswersList = response;
    });
    return this.QuestionsAnswersList;
  }

  ShowFavorites(googleId:string): void {
    this._questionsAnswersService.GetFavorites(googleId).subscribe((response: Favorite[]) => {
      console.log(response);
      this.FavoritesListResult = response;
    });
    // return this.FavoritesListResult;
  }

  deleteFavorite(googleId: string) {
    let target: number = this.FavoritesListResult.findIndex((question) => question.userId == googleId);
    this.FavoritesListResult.splice(target, 1);

    this._questionsAnswersService.DeleteFavoriteById(googleId).subscribe(response => {
      console.log(response);
    });
  }
}
