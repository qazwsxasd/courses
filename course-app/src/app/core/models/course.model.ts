export interface ICourse {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  duration?: number;
}

export class Course implements ICourse {
  constructor(
    public id: number,
    public name: string,
    public startDate: string,    
    public endDate?: string,
    public description?: string,    
    public duration?: number
  ) { 
    this.id = 0;
    this.name = '';
    this.startDate = '';
    this.endDate = '';
    this.description = '';
    this.duration = -1;
   }
}
