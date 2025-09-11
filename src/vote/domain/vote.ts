import { VoteStatus } from './vote.status';

export class Vote {
  constructor(
    private _id: null | number,
    private _title: string,
    private _status: VoteStatus,
    private _startedAt: Date,
    private _endedAt: Date,
  ) {}

  static create(
    id: null | number,
    title: string,
    startedAt: Date,
    endedAt: Date,
    status: VoteStatus,
  ): Vote {
    return new Vote(id, title, status, startedAt, endedAt);
  }

  get id(): number | null {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get startedAt(): Date {
    return this._startedAt;
  }

  get endedAt(): Date {
    return this._endedAt;
  }

  get status(): VoteStatus {
    return this._status;
  }
}
