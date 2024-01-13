import { Component, Input, Output } from '@angular/core';
import { DictionaryWord } from 'src/app/Models/dictionary-word';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';
import { EventEmitter } from '@angular/core';
import { Word } from 'src/app/Models/word';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {

  searchWord: string = "";
  @Output() dictionaryWord = new EventEmitter<string>();
  dictionaryWordResult: Word = {} as Word;
  status: string = "";
  @Input() DisplayWord: Word = {} as Word;

  constructor(private _questionsAnswersService: QuestionsAnswersService

    ) { }

  ngOnInit(): void {

  }

  getDictionaryWord(): void{
    this.status = "loading";
    this._questionsAnswersService.GetWordResults(this.searchWord).subscribe((response:Word) => {
      console.log(response);

      this.dictionaryWordResult = response;
      this.status = "";
    })
  }
}
