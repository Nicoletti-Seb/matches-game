import { Routes } from '@angular/router';

import { ConfigComponent } from './pages/config/config.component';
import { GameComponent } from './pages/game/game.component';

export const appRoutes: Routes = [
    { path: 'config', component: ConfigComponent },
    { path: 'game', component: GameComponent },
    {
        path: '**',
        redirectTo: 'config',
        pathMatch: 'full'
    }
];
