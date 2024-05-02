export class CreateUserVenueDto {
  vid: number;
  beginAt: Date;
  endAt: Date;
  type?: number;
  createId: string;
}

export class UserVenueWeekDto {
  startDate: Date;
  endDate: Date;
}
