import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';
import { CombatComponent } from './components/combat/combat.component';
import { DiceComponent } from './components/dice/dice.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "character", component: CharacterComponent},
    {path: "combat", component: CombatComponent},
    {path: "dice", component: DiceComponent},
    {path: "settings", component: SettingsComponent}
];
