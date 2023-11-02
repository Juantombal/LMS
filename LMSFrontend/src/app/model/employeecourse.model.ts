import {User} from "./user.model";
import {Course} from "./course.model";

export class EmployeeCourse {
  id: number;
  user: User;
  course: Course;
  completionDate: Date;
}
