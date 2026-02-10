import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { CandidatesService } from '../../services/candidates.service';
import { SingleCandidate } from "../single-candidate/single-candidate";

@Component({
  selector: 'app-candidate-list',
  imports: [SingleCandidate],
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
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }

}
