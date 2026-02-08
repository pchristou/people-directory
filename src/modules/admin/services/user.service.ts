import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LookupProvider } from '@shared/models/lookup-provider.model';
import { User } from '@shared/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService implements LookupProvider {

    private readonly apiUrl = 'http://localhost:5157/api/v1/users';

    constructor(private http: HttpClient) {}

    /**
     * Fetches all users from the API
     */
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    search(term: string): Observable<User | any> {
        return of([]);
    }

    /**
     * Fetches a single person by their ID
     * @param id The unique identifier of the user
     */
    getSingleUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }
}
