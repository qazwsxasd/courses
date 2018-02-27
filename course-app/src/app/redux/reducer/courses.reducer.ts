import { ActionReducer, Action } from '@ngrx/store';
import { Course } from '../../core/models/course.model';

export const GETCOURSELIST = '[Course] UpdateAll';

export class GetCourseListdAction implements Action {
  type = GETCOURSELIST;

  constructor(public payload: Course[]) {}
}


export function reducer(state = [], action: GetCourseListdAction) {
  switch (action.type) {
    case GETCOURSELIST:
      return action.payload;
    default:
      return state;
  }
}
