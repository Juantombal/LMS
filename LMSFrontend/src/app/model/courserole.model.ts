
import {Course} from "./course.model";
import {Role} from "./role.model";

export class Courserole {
  id: number;
  role: Role;
  course: Course
  prio: string;
}
