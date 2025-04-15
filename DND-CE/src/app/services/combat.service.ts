import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombatService {
  private apiUrl = 'http://localhost:5000/api/CombatTracker';
  
  constructor(private http: HttpClient) {}

  //Fetch all combat encounters
  getCombatEncounters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Add a new combat encounter
  addCombatEncounter(encounter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, encounter);
  }

  //Update an existing combat encounter
  getCombatEncounterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  updateCombatEncounter(id: string, encounter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, encounter);
  }

  //Delete a combat encounter
  deleteCombatEncounter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
