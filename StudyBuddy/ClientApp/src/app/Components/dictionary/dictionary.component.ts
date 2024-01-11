import { Component, Input, Output } from '@angular/core';
import { DictionaryWord } from 'src/app/Models/dictionary-word';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {

  searchWord: string = "";
  @Output() dictionaryWord = new EventEmitter<string>();
  dictionaryWordResult: DictionaryWord = {} as DictionaryWord;
  status: string = "";
  @Input() DisplayWord: DictionaryWord = {} as DictionaryWord;

  constructor(private _questionsAnswersService: QuestionsAnswersService

    ) { }

  ngOnInit(): void {

  }

  getDictionaryWord(): void{
    this.status = "loading";
    this._questionsAnswersService.GetDictionaryWord(this.searchWord).subscribe((response:DictionaryWord) => {
      console.log(response);

      this.dictionaryWordResult = response;
      this.status = "";
    })
  }
}
