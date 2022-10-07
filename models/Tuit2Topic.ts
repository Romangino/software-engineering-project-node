import Tuit from "./Tuit";

export default class Tuit2Topic {
    private topic: string='';
    private tuit: Tuit | null = null;

    constructor(topic: string, tuit: Tuit | null) {
        this.topic = topic;
        this.tuit = tuit;
    }

    get getTopic(): string {
        return this.topic;
    }

    set setTopic(value: string) {
        this.topic = value;
    }

    get getTuit(): Tuit | null {
        return this.tuit;
    }

    set setTuit(value: Tuit | null) {
        this.tuit = value;
    }
}