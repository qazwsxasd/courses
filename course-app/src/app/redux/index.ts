import { Course } from './../core/models/course.model';
import { AuthUser } from './../core/auth/auth.service';

export interface State {
  auth: AuthUser;
  courses: Course[];
}
