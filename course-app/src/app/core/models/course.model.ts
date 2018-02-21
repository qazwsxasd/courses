export interface CourseShape {
  id: number;
  name: string;
  description?: string;
  rate: boolean;
  startDate: string;
  endDate?: string;
  duration?: number;
}

export interface AuthorShape {
    id: number;
    firstName: string;
    lastName: string;
    checked?: boolean;
}

export interface AuthorConvertedShape {
  id: number;
  name: string;
  checked?: boolean;
}

export class Course implements CourseShape {
  constructor(
    public id: number,
    public name: string,
    public rate: boolean,
    public startDate: string,
    public endDate?: string,
    public description?: string,
    public duration?: number,
    public authors?: Array<AuthorShape>
  ) {}

}

// "id": 1,
//   "name": "nam dui proin leo",
//   "description": "id luctus nec molestie sed justo",
//   "start": "2018-01-26T18:50:34Z",
//   "endDate": "11/17/2018",
//   "duration": 79,
//   "rate": false,
//   "isTopRated": false,
//   "date": "2017-09-28T04:39:24+00:00",
//   "authors": [
//   {
//     "id": 1370,
//     "firstName": "Polly",
//     "lastName": "Sosa"
//   }
// ],
//   "length": 157
