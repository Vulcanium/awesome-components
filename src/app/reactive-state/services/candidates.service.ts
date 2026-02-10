import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Candidate } from "../models/candidate";

@Injectable()
export class CandidatesService {

    private readonly _loadingSubject$ = new BehaviorSubject<boolean>(false);
    readonly loading$ = this._loadingSubject$.asObservable(); // Equivalent to "get loading$()", but much safer

    private readonly _candidatesSubject$ = new BehaviorSubject<Candidate[]>([]);
    readonly candidates$ = this._candidatesSubject$.asObservable(); // Equivalent to "get candidates$()", but much safer

    private lastCandidatesLoaded = 0;
    private timeBetweenRequestsMs = 300000;

    constructor(private http: HttpClient) { }

    getCandidatesFromServer(): void {

        // If less than X milliseconds have passed since the last request was sent, do nothing
        if (Date.now() - this.lastCandidatesLoaded <= this.timeBetweenRequestsMs) {
            return;
        }

        this.setLoadingStatus(true);

        this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
            delay(1000),
            tap(candidates => {
                this.setCandidatesStatus(candidates);
                this.setLoadingStatus(false);
                this.lastCandidatesLoaded = Date.now();
            })
        ).subscribe();
    }

    getCandidateById(id: number): Observable<Candidate> {

        if (!this.lastCandidatesLoaded) {
            this.getCandidatesFromServer();
        }

        return this.candidates$.pipe(
            map(candidates => candidates.filter(candidate => candidate.id === id)[0])
        );
    }

    private setLoadingStatus(loading: boolean) {
        this._loadingSubject$.next(loading);
    }

    private setCandidatesStatus(candidates: Candidate[]) {
        this._candidatesSubject$.next(candidates);
    }
}