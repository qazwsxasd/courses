import { Action } from '@ngrx/store';
import { Course } from '../../core/models/course.model';

export const COURSES_LIST = '[Course] get course list';
export const COURSES_FILTER = '[Course] filter course list';
export const COURSES_DELETE = '[Course] delete';

export interface CoursesActions extends Action {
  payload: Course[];
}

export function reducer(state = [], action: CoursesActions) {
  switch (action.type) {
    case COURSES_LIST:
      return [ ...state, ...action.payload ];
    case COURSES_FILTER:
      return [ ...action.payload ];
    case COURSES_DELETE:
      return [ ...action.payload ];
    default:
      return state;
  }
}
