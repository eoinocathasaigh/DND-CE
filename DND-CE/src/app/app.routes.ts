import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';
import { CombatComponent } from './components/combat/combat.component';
import { DiceComponent } from './components/dice/dice.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateCombatComponent } from './components/create-combat/create-combat.component';
import { PlayCombatComponent } from './components/play-combat/play-combat.component';
import { SearchComponent } from './components/search/search.component';
import { CharacterSheetMakerComponent } from './components/character-sheet-maker/character-sheet-maker.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { CharacterUpdateComponent } from './components/character-update/character-update.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "character", component: CharacterComponent },
    { path: "combat", component: CombatComponent },
    { path: "createCombat", component: CreateCombatComponent },
    { path: "dice", component: DiceComponent },
    { path: "settings", component: SettingsComponent },
    { path: "search", component: SearchComponent },
    { path: 'character-sheet-maker', component: CharacterSheetMakerComponent },
    { path: 'character-sheet/:id', component:  CharacterSheetComponent},
    { path: 'character-update/:id', component:  CharacterUpdateComponent},


    {
        path: 'play-encounter/:id',
        component: PlayCombatComponent
    }
];
