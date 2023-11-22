import {User} from "./user.model";
import {Course} from "./course.model";
import {Evaluation} from "./evaluation.model";

export class EmployeeCourse {
  id: number;
  user: User;
  course: Course;
  evaluation: Evaluation;
  completionDate: Date;
}
