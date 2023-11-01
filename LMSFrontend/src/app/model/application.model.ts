import {ApplicationLine} from "./applicationline.model";
import {User} from "./user.model";
import {Course} from "./course.model";

export class Application {
  id: number;
  user: User;
  course: Course;
  applicationLines: ApplicationLine[];
  startDate: Date;
  endDate: Date;
  submissionDate: Date;
}
