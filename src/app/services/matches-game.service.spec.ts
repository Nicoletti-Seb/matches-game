import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatchesGameService } from './matches-game.service';
import { PlayersService } from '../services/players.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MatchesGameService', () => {
    let service: MatchesGameService;
    beforeEach(() => {
        service = new MatchesGameService(new PlayersService());
        service.initialize();
    });

    it('initialize', () => {
        // Test number of matches
        expect(service.numberOfMatches).toBeLessThanOrEqual(
            MatchesGameService.MAX_NUMBER_OF_MATCHES
        );
        expect(service.numberOfMatches).toBeGreaterThanOrEqual(
            MatchesGameService.MIN_NUMBER_OF_MATCHES
        );

        // Current player
        expect(service.currentPlayer.username).toBe('Joueur 1');
    });

    it('play', () => {
        const numberOfMatches = service.numberOfMatches;

        service.play(2);

        // Test number of matches
        expect(service.numberOfMatches).toBeLessThanOrEqual(
            numberOfMatches - 2
        );

        // Current player
        expect(service.currentPlayer.username).toBe('Joueur 2');
    });

    it('play 0 match', () => {
        const numberOfMatches = service.numberOfMatches;

        try {
            service.play(0);
        } catch (e) {
            expect(e.message).toBe(
                'MinOfMatchesPlayedException: expected > 0 / received 0'
            );
        }

        // Test number of matches
        expect(service.numberOfMatches).toBeLessThanOrEqual(numberOfMatches);

        // Current player
        expect(service.currentPlayer.username).toBe('Joueur 1');
    });

    it('play a number of matches > 3', () => {
        const numberOfMatches = service.numberOfMatches;

        try {
            service.play(4);
        } catch (e) {
            expect(e.message).toBe(
                'MinOfMatchesPlayedException: expected <= 3 / received 4'
            );
        }

        // Test number of matches
        expect(service.numberOfMatches).toBeLessThanOrEqual(numberOfMatches);

        // Current player
        expect(service.currentPlayer.username).toBe('Joueur 1');
    });
});
