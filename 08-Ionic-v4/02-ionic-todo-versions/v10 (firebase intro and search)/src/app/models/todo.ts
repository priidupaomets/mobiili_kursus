export class Todo {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    hasDeadline: boolean;
    deadline: Date;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.isDone = false;
        this.hasDeadline = false;
        this.deadline = new Date(); // TODO: Assign meaningful value
    }
}
