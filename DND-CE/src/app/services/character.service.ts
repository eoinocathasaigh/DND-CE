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
  getCharacters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCharacterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //Add a new Character 
  addCharacter(NewCharacter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, NewCharacter);
  }

  //Update an existing Character 
  updateCharacter(id: string, UpdateCharacter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, UpdateCharacter);
  }

  //Delete a Character 
  deleteCharacter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
