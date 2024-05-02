export class CreateRaceDto {
  title: string;
  description: string;
  createId: string;
  beginAt: Date;
  endAt: Date;
  vid: number;
  eid: Array<number>; //器材组
  reid?: number;
  umpireId: number;
  status: number;
}
