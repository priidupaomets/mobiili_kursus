export class Todo {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    hasDeadline: boolean;
    deadline: Date;

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.isDone = false;
        this.hasDeadline = false;
        this.deadline = new Date(); // TODO: Assign meaningful value
    }
}
