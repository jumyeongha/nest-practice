import { CandidateEntity, StarEntity } from '@prisma/client';

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

  static listFrom(
    candidateEntity: CandidateEntity[],
    starEntities: StarEntity[],
  ) {
    const starMap = new Map<number, StarEntity>(
      starEntities.map((s) => [s.id, s] as [number, StarEntity]),
    );

    return candidateEntity
      .map((e) => {
        const starEntity = starMap.get(e.starId);
        if (starEntity) {
          return Candidate.create(
            e.id,
            starEntity.id,
            starEntity.name,
            e.voteCount,
          );
        }
      })
      .filter((v): v is Candidate => v !== undefined);
  }

  increaseVoteCount(): void {
    this.voteCount++;
  }
}
