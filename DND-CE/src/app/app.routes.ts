import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "character", component: CharacterComponent},
];
