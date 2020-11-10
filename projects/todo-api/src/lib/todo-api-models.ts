export interface Todo {
    id?: string;
    title: string;
    description: string;
    done: boolean;
}

export class TodoApiServiceConfiguration {
    host: string;
    port: string;

    constructor(host: string, port: string) {
      this.host = host;
      this.port = port;
    }
}
