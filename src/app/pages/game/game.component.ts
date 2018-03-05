import { Component } from '@angular/core';
import { MatchesGameService } from '../../services/matches-game.service';

/**
 *  Class GameComponent
 *  This component is an page to play at Matches Game
 */
@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent {
    matches: boolean[];
    numberOfMatchesSelected: number;

    constructor(private _playerService: MatchesGameService) {
        this._playerService.initialize();
        this.prepareNextTurn();
    }

    onClickMatch(index: number) {
        // Cancel if the user has reached the max number of actions
        if (this.numberOfMatchesCanBeSelected <= 0 && !this.matches[index]) {
            return;
        }

        this.matches[index] = !this.matches[index];
        this.matches[index]
            ? this.numberOfMatchesSelected++
            : this.numberOfMatchesSelected--;
    }

    onValidateTurn() {
        let count = 0;
        this.matches.forEach(val => val && count++);

        // The player did not play
        if (!count) {
            return;
        }

        this._playerService.play(count);

        if (!this.isFinished) {
            this.prepareNextTurn();
        }
    }

    onClickRestart() {
        this._playerService.initialize();
        this.prepareNextTurn();
    }

    private prepareNextTurn() {
        this.matches = Array(this.numberOfMatches);
        this.numberOfMatchesSelected = 0;
    }

    /* GETTERS */
    get currentPlayer() {
        return this._playerService.currentPlayer;
    }

    get numberOfMatches() {
        return this._playerService.numberOfMatches;
    }

    get isFinished() {
        return this._playerService.isFinished;
    }

    get numberOfMatchesCanBeSelected() {
        return (
            MatchesGameService.MAX_NUMBER_MATCHES_PLAYED -
            this.numberOfMatchesSelected
        );
    }
}
