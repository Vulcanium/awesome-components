import { SearchCandidateType } from "../enums/search-candidate-type.enum";

/** 
* Entity representing the candidate type filter option.
*
* Expressed in a more user-friendly way than the camelCase of the candidate model,
* or the uppercase SearchCandidateType enum.
* 
* Used only within the reactive-state feature component.
*/
export class SearchCandidateTypeOption {
    value!: SearchCandidateType
    label!: string
}