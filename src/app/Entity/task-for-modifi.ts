export class TaskForModifi {

  _year: number;
  _month: number;
  _day: number;
  _taskId: string;
  _startTime: string;
  _newTaskId: string;
  _newStartTime: string;
  _newEndTime: string;
  _newComment: string;


  set year(value: number) {
    this._year = value;
  }

  set month(value: number) {
    this._month = value;
  }

  set day(value: number) {
    this._day = value;
  }

  set taskId(value: string) {
    this._taskId = value;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  set newTaskId(value: string) {
    this._newTaskId = value;
  }

  set newStartTime(value: string) {
    this._newStartTime = value;
  }

  set newEndTime(value: string) {
    this._newEndTime = value;
  }

  set newComment(value: string) {
    this._newComment = value;
  }
}
