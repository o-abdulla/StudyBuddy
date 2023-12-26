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

  constructor(private _questionsAnswersService: QuestionsAnswersService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.ShowFavorites(this.user.id);
    });
  }

  ShowFavorites(googleId:string): Favorite[] {
    this._questionsAnswersService.GetFavorites(googleId).subscribe((response: Favorite[]) => {
      // console.log(response);
      this.FavoritesListResult = response;
    });
    return this.FavoritesListResult;
  }

  deleteFavorite(id: number) {
    let target: number = this.FavoritesListResult.findIndex((question) => question.questionId == id);
    this.FavoritesListResult.splice(target, 1);

    this._questionsAnswersService.DeleteFavoriteById(id).subscribe(response => {
      console.log(response);
    });
  }
}
