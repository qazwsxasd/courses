export interface CourseShape {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  duration?: number;
}

export class Course implements CourseShape {
  constructor(
    public id: number,
    public name: string,
    public startDate: string,
    public endDate?: string,
    public description?: string,
    public duration?: number,
    public rate?: number
  ) {}

  // get id() { return this.id++; }
}
