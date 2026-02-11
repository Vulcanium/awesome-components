import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Candidate } from "../models/candidate";

@Injectable()
export class CandidatesService {

    private readonly _loadingSubject$ = new BehaviorSubject<boolean>(false);
    readonly loading$ = this._loadingSubject$.asObservable(); // Equivalent to "get loading$()", but much safer

    private readonly _candidatesSubject$ = new BehaviorSubject<Candidate[]>([]);
    readonly candidates$ = this._candidatesSubject$.asObservable(); // Equivalent to "get candidates$()", but much safer

    private areCandidatesLoaded: boolean = false;

    constructor(private http: HttpClient) { }

    getCandidatesFromServer(): void {
        this.setLoadingStatus(true);

        this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
            delay(1000),
            tap(candidates => {
                this.setCandidatesStatus(candidates);
                this.setLoadingStatus(false);
                this.areCandidatesLoaded = true;
            })
        ).subscribe();
    }

    getCandidateById(id: number): Observable<Candidate> {

        if (!this.areCandidatesLoaded) {
            this.getCandidatesFromServer();
        }

        return this.candidates$.pipe(
            map(candidates => candidates.filter(candidate => candidate.id === id)[0])
        );
    }

    // Optimistic approach: Update observables before receiving the server response
    hireCandidate(id: number): void {
        this.candidates$.pipe(
            take(1),
            map(candidates => candidates.map(candidate => candidate.id === id ? { ...candidate, company: 'Snapface ltd' } : candidate)),
            tap(candidatesUpdated => this.setCandidatesStatus(candidatesUpdated)),
            switchMap(candidatesUpdated =>
                this.http.patch(`${environment.apiUrl}/candidates/${id}`, candidatesUpdated.find(candidate => candidate.id === id))
            )
        ).subscribe();
    }

    // Pessimistic approach: Wait for the server response before updating observables
    rejectCandidate(id: number): void {
        this.setLoadingStatus(true);

        this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
            delay(1000),
            switchMap(() => this.candidates$),
            take(1),
            map(candidates => candidates.filter(candidate => candidate.id !== id)),
            tap(candidatesFiltered => {
                this.setCandidatesStatus(candidatesFiltered);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    private setLoadingStatus(loading: boolean) {
        this._loadingSubject$.next(loading);
    }

    private setCandidatesStatus(candidates: Candidate[]) {
        this._candidatesSubject$.next(candidates);
    }
}