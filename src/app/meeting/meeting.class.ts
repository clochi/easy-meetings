class User {
  email: string;
  name: string;
}

class Track {
  date: Date;
  id: number;
  info: string;
  taskId: number;
}

export class Task {
  assigned: User;
  date: Date;
  dueDate?: Date;
  id?: number;
  status: number;
  task: string;
  topicId: number;
  track?: Track[];
}

export class Topic {
  id?: number;
  meetingId: number; 
  tasks?: Task[];
  topic: string;
}

export class Meeting {
  id: number;
  date: Date;
  time: Date;
  topics: Topic[];
  place: string;
  status: boolean;
  users: string; //This is going to be User type
}