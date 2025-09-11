import { VoteStatus } from './vote.status';

export class Vote {
  id: null | number;
  title: string;
  status: VoteStatus;
  startedAt: Date;
  endedAt: Date;

  constructor(
    id: null | number,
    title: string,
    status: VoteStatus,
    startedAt: Date,
    endedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }

  static create(
    id: null | number,
    title: string,
    startedAt: Date,
    endedAt: Date,
    status: VoteStatus,
  ): Vote {
    return new Vote(id, title, status, startedAt, endedAt);
  }
}
