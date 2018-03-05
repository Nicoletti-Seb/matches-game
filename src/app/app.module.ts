import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* ROUTES */
import { appRoutes } from './app-routes';

/* PAGES */
import { AppComponent } from './app.component';
import { ConfigComponent } from './pages/config/config.component';
import { GameComponent } from './pages/game/game.component';

/* SERVICES */
import { MatchesGameService } from './services/matches-game.service';
import { PlayersService } from './services/players.service';

@NgModule({
    declarations: [AppComponent, ConfigComponent, GameComponent],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(
            appRoutes
            // { enableTracing: true } // Debugging
        )
    ],
    providers: [PlayersService, MatchesGameService],
    bootstrap: [AppComponent]
})
export class AppModule {}
