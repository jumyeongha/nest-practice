export class Candidate {
  id: number;
  starId: number;
  name: string;
  voteCount: number;
}

export class CandidateWithStarName {
  id: number;
  voteId: number;
  starId: number;
  voteCount: number;
  starEntity: {
    name: string;
  };
}
