import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupProvider } from '@shared/models/lookup-provider.model';
import { User } from '@shared/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService implements LookupProvider {

    // Can also inject this via a provider to allow different services with different base urls
    private readonly apiUrl = 'http://localhost:5157/api/v1';

    constructor(private http: HttpClient) {}

    /**
     * Save a user
     * @param user
     */
    saveUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, user);
    }

    /**
     * Fetch users matching the searchTerm from the API
     * This could also be placed in its own UserLookupService
     */
    search(searchTerm: string): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users/search`, {params: {name: searchTerm}});
    }
}
