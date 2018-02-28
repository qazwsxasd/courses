import { Action } from '@ngrx/store';
import { Course } from '../../core/models/course.model';

export const COURSES_GET = '[Course] get course list';

export interface CoursesActions extends Action {
  payload: Course[];
}

export function reducer(state = [], action: CoursesActions) {
  switch (action.type) {
    case COURSES_GET:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
