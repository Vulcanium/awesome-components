import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './candidate-list.html',
  styleUrl: './candidate-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateList implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  constructor(private candidatesService: CandidatesService) { }

  ngOnInit(): void {
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }

  private initObservables(): void {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }

}
