import * as coursesReducer from './courses.reducer';
import * as authReducer from './auth.reducer';

export const reducers = {
  auth: authReducer.reducer,
  courses: coursesReducer.reducer
};
