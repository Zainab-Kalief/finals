import { Injectable } from '@angular/core';
import 'rxjs'
import { Http } from '@angular/http'
import { Game } from './game'

@Injectable()
export class GameService {

  constructor(private _http: Http) { }

  create_user(user) {
    return this._http.post('/create_user', user)
      .map(data => data.json())
      .toPromise()
  }
  current_user() {
    return this._http.get('/current_user')
    .map(data => data.json())
    .toPromise()
  }
  create_game(game: Game) {
    return this._http.post('/create_game', game)
      .map(data => data.json())
      .toPromise()
  }
  log_out() {
    return this._http.get('/log_out')
    .map(data => data.json())
    .toPromise()
  }
  all_games() {
    return this._http.get('/all_games')
    .map(data => data.json())
    .toPromise()
  }
  user_score(result, game1_id, game2_id, game3_id) {
    return this._http.post(`/user_score/${game1_id}/${game2_id}/${game3_id}`, result)
        .map(data => data.json())
        .toPromise()
  }
  new_score(id) {
    return id
  }
  all_users() {
    return this._http.get('/all_users')
    .map(data => data.json())
    .toPromise()
  }

}
