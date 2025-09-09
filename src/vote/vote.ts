import { VoteStatus } from './vote.status';

export class Vote {
  constructor(
    private _id: null | number,
    private _title: string,
    private _status: VoteStatus,
    private _startAt: Date,
    private _endAt: Date,
  ) {}

  static create(
    id: null | number,
    title: string,
    startAt: Date,
    endAt: Date,
    status: VoteStatus,
  ): Vote {
    return new Vote(id, title, status, startAt, endAt);
  }

  get id(): number | null {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get startAt(): Date {
    return this._startAt;
  }

  get endAt(): Date {
    return this._endAt;
  }

  get status(): VoteStatus {
    return this._status;
  }
}
