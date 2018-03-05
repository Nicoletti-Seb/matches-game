import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { PlayersService } from '../../services/players.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfigComponent', () => {
    let component: ConfigComponent;
    let fixture: ComponentFixture<ConfigComponent>;
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule],
                declarations: [ConfigComponent],
                providers: [PlayersService]
            }).compileComponents();

            fixture = TestBed.createComponent(ConfigComponent);
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
        'check number of players',
        async(() => {
            expect(component.players.length).toBe(
                PlayersService.NUMBER_OF_PLAYERS
            );

            const numberOfPlayers = fixture.nativeElement.querySelectorAll(
                '.players .player'
            ).length;
            expect(numberOfPlayers).toBe(PlayersService.NUMBER_OF_PLAYERS);
        })
    );
    it(
        'check if model is linked with inputs',
        async(() => {
            const el = fixture.nativeElement;

            const username = el.querySelector(
                'input[ng-reflect-name="username0"]'
            );
            username.value = 'name';
            username.dispatchEvent(new Event('input'));

            const color = el.querySelector('input[ng-reflect-name="color0"]');
            color.value = '#ffffff';
            color.dispatchEvent(new Event('input'));

            fixture.detectChanges();
            expect(component.players[0].username).toEqual('name');
            expect(component.players[0].color).toEqual('#ffffff');
        })
    );
});
