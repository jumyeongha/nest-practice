export class Candidate {
  constructor(
    private readonly _id: number,
    private _starId: number,
    private _name: string,
    private _voteCount: number,
  ) {}

  static create(
    id: number,
    starId: number,
    name: string,
    voteCount: number,
  ): Candidate {
    return new Candidate(id, starId, name, voteCount);
  }

  get id(): number {
    return this._id;
  }

  get starId(): number {
    return this._starId;
  }

  get name(): string {
    return this._name;
  }

  get voteCount(): number {
    return this._voteCount;
  }

  increaseVoteCount(): void {
    this._voteCount++;
  }
}
