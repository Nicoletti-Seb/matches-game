import { Player } from '../models/player.model';

/**
 *  Class PlayersService
 *  This component is a service to manage players
 */
export class PlayersService {
    static readonly NUMBER_OF_PLAYERS: number = 2;

    private _players: Player[];

    constructor() {
        this._players = [];
        for (let i = 0; i < PlayersService.NUMBER_OF_PLAYERS; i++) {
            this._players.push(new Player(`Joueur ${i + 1}`, 'black'));
        }
    }

    get players() {
        return this._players;
    }
}
