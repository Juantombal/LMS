import {Application} from "./application.model";

export class ApplicationLine {
  id: number;
  application: Application;
  status: string;
  comment: string;
  lastModification: Date;
}
