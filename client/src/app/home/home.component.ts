import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object
  new_score = ''
  message = ''
  all_users = []
  search_word = ''
  private sub: any
  private sub2: any
  constructor(private _service: GameService, private _router: Router, private _router2: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      name: ''
    }
    this._service.current_user()
      .then(data => {
        if(data.status) {
          console.log(data.status)
        } else {

          this._router.navigate(['/'])

        }
      })
      .catch( error => {
        var result = prompt('Enter your name to begin')
        if(result) {
          this.user = {
            name: result
          }
          this._service.create_user(this.user)
            .then(data => {
              if(data.status) {
                this._router.navigate(['/home'])
              } else {
                console.log(data.data) //come back here
              }
            })
        } else {
          this._router.navigate(['/log_out'])
        }
        this._router.navigate(['/log_out'])
      })

    this._service.all_users()
        .then(data => {
          for(let user of data) {
            for(let score of user.scores) {
              this.all_users.push({
                name: user.name, score: score, percent: Number(score) / 3
              })
            }
          }
          this.all_users.sort( (a, b) => { return b.percent - a.percent })
        })
        .catch(error => console.log(error, '~~~~~~~~~'))

      this.sub = this._router2.paramMap.subscribe( params => {

          this.new_score = params.get('score')
          this.message = params.get('result')
          console.log(this.new_score, this.message)
        })



  }



}
