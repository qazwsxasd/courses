export interface ICourse {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  duration?: string;
}

export class Course implements ICourse {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  duration?: string;
}
