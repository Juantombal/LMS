
import {Course} from "./course.model";
import {Role} from "./role.model";

export class EmployeeCourse {
  id: number;
  role: Role;
  course: Course
  prio: string;
}
