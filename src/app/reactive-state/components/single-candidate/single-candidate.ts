import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-single-candidate',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './single-candidate.html',
  styleUrl: './single-candidate.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidate implements OnInit {

  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidatesService: CandidatesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initObservables();
  }

  onHire() {
    throw new Error('Method not implemented.');
  }

  onReject() {
    throw new Error('Method not implemented.');
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }

  private initObservables(): void {
    this.loading$ = this.candidatesService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }

}
