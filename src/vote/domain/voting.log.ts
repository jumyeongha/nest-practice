export class VotingLog {
  id: number | null;
  voteId: number;
  candidateId: number;
  userId: number;
  votedAt: Date;

  constructor(
    id: number | null,
    voteId: number,
    candidateId: number,
    userId: number,
    votedAt: Date,
  ) {
    this.id = id;
    this.voteId = voteId;
    this.candidateId = candidateId;
    this.userId = userId;
    this.votedAt = votedAt;
  }

  static create(
    id: null | number,
    voteId: number,
    candidateId: number,
    userId: number,
    votedAt: Date,
  ): VotingLog {
    return new VotingLog(id, voteId, candidateId, userId, votedAt);
  }
}
