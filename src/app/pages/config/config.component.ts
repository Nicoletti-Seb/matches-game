import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlayersService } from '../../services/players.service';
import { Player } from '../../models/player.model';

/**
 *  Class ConfigComponent
 *  This component is an page to config an game
 */
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent {
    players: Player[];

    constructor(playerService: PlayersService, private _router: Router) {
        this.players = playerService.players;
        console.log(this.players);
    }

    onSubmit(e) {
        e.preventDefault();
        this._router.navigate(['/game']);
    }
}
