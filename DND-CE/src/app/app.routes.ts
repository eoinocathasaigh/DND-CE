import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';
import { CombatComponent } from './components/combat/combat.component';
import { DiceComponent } from './components/dice/dice.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateCombatComponent } from './components/create-combat/create-combat.component';
import { PlayCombatComponent } from './components/play-combat/play-combat.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "character", component: CharacterComponent},
    {path: "combat", component: CombatComponent},
    {path: "createCombat", component: CreateCombatComponent},
    {path: "playCombat", component: PlayCombatComponent},
    {path: "dice", component: DiceComponent},
    {path: "settings", component: SettingsComponent}
];
