import {Observable} from 'rxjs';

/**
 * To be overridden, as such no Injectable() decorator needed. To be used within components where we look up data e.g. typeahead
 */
export abstract class LookupProvider {
    abstract search(term?: string): Observable<any[]>;
}
