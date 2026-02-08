import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LookupProvider } from '@shared/models/lookup-provider.model';
import { User } from '@shared/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService implements LookupProvider {

    private readonly apiUrl = 'http://localhost:5157/api/v1/users/search';

    constructor(private http: HttpClient) {}

    /**
     * Fetch users matching the searchTerm from the API
     */
    search(searchTerm: string): Observable<User | any> {
        return this.http.get<User[]>(this.apiUrl, { params: { name: searchTerm } });
    }
}
