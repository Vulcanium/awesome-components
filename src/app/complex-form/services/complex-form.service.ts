import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { ComplexFormValue } from "../models/complex-form-value";

@Injectable()
export class ComplexFormService {

    constructor(private http: HttpClient) { }

    saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/users`, formValue).pipe(
            map(() => true),
            delay(1000),
            catchError(() => of(false).pipe(delay(1000)))
        );
    }
}