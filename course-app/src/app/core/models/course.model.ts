export interface CourseShape {
  id: number;
  name: string;
  description?: string;
  rate: boolean;
  startDate: string;
  endDate?: string;
  duration?: number;
}

export class Course implements CourseShape {
  constructor(
    public id: number,
    public name: string,
    public rate: boolean,
    public startDate: string,
    public endDate?: string,
    public description?: string,
    public duration?: number
  ) {}

  // get id() { return this.id++; }
}
