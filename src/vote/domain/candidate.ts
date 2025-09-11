export class Candidate {
  id: number;
  starId: number;
  name: string;
  voteCount: number;

  constructor(id: number, starId: number, name: string, voteCount: number) {
    this.id = id;
    this.starId = starId;
    this.name = name;
    this.voteCount = voteCount;
  }

  static create(
    id: number,
    starId: number,
    name: string,
    voteCount: number,
  ): Candidate {
    return new Candidate(id, starId, name, voteCount);
  }

  increaseVoteCount(): void {
    this.voteCount++;
  }
}
