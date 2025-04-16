import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Open5eService {
  private endpoints = {
    spells: 'https://api.open5e.com/v2/spells/',
    spelllist: 'https://api.open5e.com/v1/spelllist/',
    monsters: 'https://api.open5e.com/v1/monsters/',
    documents: 'https://api.open5e.com/v2/documents/',
    backgrounds: 'https://api.open5e.com/v2/backgrounds/',
    planes: 'https://api.open5e.com/v1/planes/',
    sections: 'https://api.open5e.com/v1/sections/',
    feats: 'https://api.open5e.com/v2/feats/',
    conditions: 'https://api.open5e.com/v2/conditions/',
    races: 'https://api.open5e.com/v2/races/',
    classes: 'https://api.open5e.com/v1/classes/',
    magicitems: 'https://api.open5e.com/v1/magicitems/',
    weapons: 'https://api.open5e.com/v2/weapons/',
    armor: 'https://api.open5e.com/v2/armor/',
  };

  constructor(private http: HttpClient) {}

  search(category: keyof typeof this.endpoints, query: string): Observable<any> {
    const url = `${this.endpoints[category]}?search=${query}`;
    //console.log(`${this.endpoints[category]}?search=${query}`);
    return this.http.get<any>(url);
  }

}
