export class VotingLog {
  constructor(
    private _id: number | null,
    private _voteId: number,
    private _candidateId: number,
    private _userId: number,
    private _voteAt: Date,
  ) {}

  static create(
    id: null | number,
    voteId: number,
    candidateId: number,
    userId: number,
    voteAt: Date,
  ): VotingLog {
    return new VotingLog(id, voteId, candidateId, userId, voteAt);
  }

  get id(): number | null {
    return this._id;
  }

  get voteId(): number {
    return this._voteId;
  }

  get candidateId(): number {
    return this._candidateId;
  }

  get userId(): number {
    return this._userId;
  }

  get voteAt(): Date {
    return this._voteAt;
  }
}
