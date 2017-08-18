import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Game } from '../game'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  new_question: Game
  constructor(private _service: GameService, private _router: Router) { }

  ngOnInit() {
    this.new_question = new Game
    this._service.current_user()
      .then(data => {
        if(data.status) {
        } else {
          this._router.navigate(['/'])
        }
      })
      .catch(error => { this._router.navigate(['/']) })
  }
  post_data() {
    this._service.create_game(this.new_question)
      .then(data => {
        this.new_question = new Game
          var note = 'Successfully added Question!'
          this._router.navigate([`/home/${note}`])

      })
      .catch(error => {console.log(error)})
  }
  go_home() {
      this._router.navigate(['/home'])
  }

}
