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
    private readonly apiUrl = 'http://localhost:5157/api/v1/users/search';

    constructor(private http: HttpClient) {}

    /**
     * Fetch users matching the searchTerm from the API
     */
    search(searchTerm: string): Observable<User | any> {
        return this.http.get<User[]>(this.apiUrl, { params: { name: searchTerm } });
    }
}
