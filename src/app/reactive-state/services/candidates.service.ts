import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Candidate } from "../models/candidate";

@Injectable()
export class CandidatesService {

    private readonly _loadingSubject$ = new BehaviorSubject<boolean>(false);
    readonly loading$ = this._loadingSubject$.asObservable(); // Equivalent to "get loading$()", but much safer

    private readonly _candidatesSubject$ = new BehaviorSubject<Candidate[]>([]);
    readonly candidates$ = this._candidatesSubject$.asObservable(); // Equivalent to "get candidates$()", but much safer

    constructor(private http: HttpClient) { }

    private setLoadingStatus(loading: boolean) {
        this._loadingSubject$.next(loading);
    }

    private setCandidatesStatus(candidates: Candidate[]) {
        this._candidatesSubject$.next(candidates);
    }
}