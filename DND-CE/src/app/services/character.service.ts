import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:5000/api/character';
  
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  createCharacter(character: any) {
    // Logic to create a character
    console.log('Character created:', character);

    // Trigger notification
    this.notificationService.sendNotification(
        'New Character Created',
        `Character ${character.name} has been added!`
    );
}

  //Fetch all Character 
  getCharacters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCharacterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //Add a new Character 
  addCharacter(newCharacter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newCharacter).pipe(
      tap((response) => {
        console.log('API Response:', response); // Debugging

        // Trigger notification
        this.notificationService.sendNotification(
          'New Character Created',
          `Character ${newCharacter.name} (Level ${newCharacter.level} ${newCharacter.class}) has been successfully created!`
        );
      })
    );
  }

  //Update an existing Character 
  updateCharacter(id: string, updatedCharacter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedCharacter).pipe(
      tap((response) => {
        // Trigger notification
        this.notificationService.sendNotification(
          'Character Updated',
          `Character ${updatedCharacter.name} has been successfully updated!`
        );
      })
    );
  }

  //Delete a Character 
  deleteCharacter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
          // Trigger notification
          this.notificationService.sendNotification(
            'Character Deleted',
            `The character has been successfully deleted!`
          );
      })
    );
  }
}
