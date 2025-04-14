import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:5000/api/character';
  
  constructor(private http: HttpClient) {}

  //Fetch all Character 
  getCharacter(characterData: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Add a new Character 
  addCharacter(encounter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, encounter);
  }

  //Update an existing Character 
  updateCharacter(id: string, encounter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, encounter);
  }

  //Delete a Character 
  deleteCharacter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
