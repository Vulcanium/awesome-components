import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { SearchCandidateType } from '../../enums/search-candidate-type.enum';
import { Candidate } from '../../models/candidate';
import { SearchCandidateTypeOption } from '../../models/search-candidate-type-option';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './candidate-list.html',
  styleUrl: './candidate-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateList implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCandidateControl!: FormControl;
  searchCandidateTypeControl!: FormControl;
  searchCandidateTypeOptions!: SearchCandidateTypeOption[];

  constructor(private candidatesService: CandidatesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }

  private initForm() {
    this.searchCandidateControl = this.formBuilder.nonNullable.control('');
    this.searchCandidateTypeControl = this.formBuilder.nonNullable.control(SearchCandidateType.LASTNAME);
    this.searchCandidateTypeOptions = [
      { value: SearchCandidateType.LASTNAME, label: 'Last name' },
      { value: SearchCandidateType.FIRSTNAME, label: 'First name' },
      { value: SearchCandidateType.COMPANY, label: 'Company' }
    ]
  }

  private initObservables(): void {
    this.loading$ = this.candidatesService.loading$;

    const searchCandidate$: Observable<string> = this.searchCandidateControl.valueChanges.pipe(
      startWith(this.searchCandidateControl.value),
      map(searchCandidateValue => searchCandidateValue.toLowerCase())
    );

    const searchCandidateType$: Observable<SearchCandidateType> = this.searchCandidateTypeControl.valueChanges.pipe(
      startWith(this.searchCandidateTypeControl.value)
    );

    this.candidates$ = combineLatest([searchCandidate$, searchCandidateType$, this.candidatesService.candidates$]).pipe(
      map(([searchCandidate, searchCandidateType, candidates]) =>
        candidates.filter(candidate => candidate[searchCandidateType].toLowerCase().includes(searchCandidate))
      )
    );
  }

}
