import User from "./User";

export default class Tuit {
    private id: string;
    private tuit: string;
    private postedOn: Date;
    private postedBy: User | null;

    constructor(id: string, tuit: string, postedOn: Date, postedBy: any) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }

    public get getTuit(): string {
        return this.tuit;
    }

    public set setTuit(tuit: string) {
        this.tuit = tuit;
    }

    public get getPostedOn(): Date {
        return this.postedOn;
    }

    public set setPostedOn(postedOn: Date) {
        this.postedOn = postedOn;
    }

    public get getAuthor(): User | null {
        return this.postedBy;
    }

    public set setAuthor(user: User | null) {
        this.postedBy = user;
    }

}
