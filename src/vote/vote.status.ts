export enum VoteStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export const toVoteStatus = (v: string): VoteStatus => {
  return (Object.values(VoteStatus) as string[]).includes(v)
    ? (v as VoteStatus)
    : VoteStatus.EXPIRED;
};
