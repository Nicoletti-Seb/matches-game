import { Player } from '../models/player.model';
import { PlayersService } from './players.service';
import { Injectable } from '@angular/core';

/**
 *  Class MatchesGameService
 *  This component is the game engine of Matches Games.
 */
@Injectable()
export class MatchesGameService {
    static readonly MIN_NUMBER_OF_MATCHES: number = 10;
    static readonly MAX_NUMBER_OF_MATCHES: number = 30;
    static readonly MAX_NUMBER_MATCHES_PLAYED: number = 3;

    private _currentTurn: number;
    private _numberOfMatches: number;

    constructor(private _playersService: PlayersService) {}

    // Initialize a new game
    initialize() {
        this.initNumberOfMatches();

        // the turn to the first player
        this._currentTurn = 0;
    }

    play(numberOfMatches) {
        if (!numberOfMatches) {
            throw Error(
                `MinOfMatchesPlayedException: expected > 0 / received ${numberOfMatches}`
            );
        }

        if (numberOfMatches > MatchesGameService.MAX_NUMBER_MATCHES_PLAYED) {
            throw Error(
                `MinOfMatchesPlayedException: expected <= ${
                    MatchesGameService.MAX_NUMBER_MATCHES_PLAYED
                } / received ${numberOfMatches}`
            );
        }

        this._numberOfMatches -= numberOfMatches;

        if (!this.isFinished) {
            this.nextTurn();
        }
    }

    /* PRIVATE METHODS */
    private nextTurn() {
        this._currentTurn =
            (this._currentTurn + 1) % this._playersService.players.length;
    }

    private initNumberOfMatches() {
        // numberOfMatches = min + random[0, max - min]
        const offset =
            MatchesGameService.MAX_NUMBER_OF_MATCHES -
            MatchesGameService.MIN_NUMBER_OF_MATCHES;
        this._numberOfMatches =
            MatchesGameService.MIN_NUMBER_OF_MATCHES +
            Math.floor(Math.random() * offset);
    }

    /* GETTERS */
    get numberOfMatches() {
        return this._numberOfMatches;
    }

    get isFinished() {
        return this._numberOfMatches <= 0;
    }

    get currentPlayer() {
        return this._playersService.players[this._currentTurn];
    }
}
