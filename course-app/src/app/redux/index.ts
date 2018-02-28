import { Course } from './../core/models/course.model';
import { AuthUser, AUTHSTORE } from './../core/auth/auth.service';

export interface AppState {
  auth: AuthUser;
  courses: Course[];
}
