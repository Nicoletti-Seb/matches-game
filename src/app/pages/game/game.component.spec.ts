import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { MatchesGameService } from '../../services/matches-game.service';
import { PlayersService } from '../../services/players.service';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [GameComponent],
                providers: [MatchesGameService, PlayersService]
            }).compileComponents();

            fixture = TestBed.createComponent(GameComponent);
            component = fixture.componentInstance;

            // Binding data
            fixture.detectChanges();
        })
    );
    it(
        'should create the component',
        async(() => {
            expect(component).toBeDefined();
        })
    );
    it(
        'number of matches displayed',
        async(() => {
            const el = fixture.nativeElement;
            const numberOfMatchesDisplayed = el.querySelectorAll('.match')
                .length;
            expect(numberOfMatchesDisplayed).toBe(component.numberOfMatches);
        })
    );
    it(
        'select 3 matches',
        async(() => {
            const el = fixture.nativeElement;

            // Click on the first three matches
            const numberOfMatchesDisplayed = el.querySelectorAll('.match');
            for (let i = 0; i < 3; i++) {
                numberOfMatchesDisplayed[i].click();
            }
            fixture.detectChanges();

            // Tests
            const numberOfMatchesSelected = el.querySelectorAll(
                '.match.selected'
            ).length;

            expect(numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesCanBeSelected).toBe(0);
        })
    );
    it(
        'exceed the limit of number of matches selected (> 3)',
        async(() => {
            const el = fixture.nativeElement;

            // Click on the first four matches
            const numberOfMatchesDisplayed = el.querySelectorAll('.match');
            for (
                let i = 0;
                i < MatchesGameService.MAX_NUMBER_MATCHES_PLAYED;
                i++
            ) {
                numberOfMatchesDisplayed[i].click();
            }
            fixture.detectChanges();

            // Tests
            const numberOfMatchesSelected = el.querySelectorAll(
                '.match.selected'
            ).length;

            expect(numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesCanBeSelected).toBe(0);
        })
    );
    it(
        'deselect matches',
        async(() => {
            const el = fixture.nativeElement;

            // Click on the first three matches
            let numberOfMatchesDisplayed = el.querySelectorAll('.match');
            for (let i = 0; i < 3; i++) {
                numberOfMatchesDisplayed[i].click();
            }
            fixture.detectChanges();

            let numberOfMatchesSelected = el.querySelectorAll('.match.selected')
                .length;

            expect(numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesSelected).toBe(3);
            expect(component.numberOfMatchesCanBeSelected).toBe(0);

            // Deselect the first match
            numberOfMatchesDisplayed = el.querySelectorAll('.match');
            numberOfMatchesDisplayed[0].click();
            fixture.detectChanges();

            numberOfMatchesSelected = el.querySelectorAll('.match.selected')
                .length;

            expect(numberOfMatchesSelected).toBe(2);
            expect(component.numberOfMatchesSelected).toBe(2);
            expect(component.numberOfMatchesCanBeSelected).toBe(1);
        })
    );
    it(
        'play a game turn',
        async(() => {
            const el = fixture.nativeElement;
            const numberOfMatches = component.numberOfMatches;

            // Click on the first three matches
            const numberOfMatchesDisplayed = el.querySelectorAll('.match');
            for (let i = 0; i < 3; i++) {
                numberOfMatchesDisplayed[i].click();
            }

            // Click on button to play
            el.querySelector('.play').click();

            fixture.detectChanges();

            // Test
            expect(component.numberOfMatches).toBe(numberOfMatches - 3);
            expect(component.currentPlayer.username).toBe('Joueur 2');
            expect(component.isFinished).toBe(false);
            expect(component.numberOfMatchesSelected).toBe(0);
        })
    );
    it(
        'try to play a game turn without select a match',
        async(() => {
            const el = fixture.nativeElement;
            const numberOfMatches = component.numberOfMatches;

            // Click on button to play
            el.querySelector('.play').click();
            fixture.detectChanges();

            // Test
            expect(component.numberOfMatches).toBe(numberOfMatches);
            expect(component.currentPlayer.username).toBe('Joueur 1');
            expect(component.isFinished).toBe(false);
            expect(component.numberOfMatchesSelected).toBe(0);
        })
    );
});
