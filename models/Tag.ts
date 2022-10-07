export default class Tag {
    private tag: string = '';

    constructor(tag: string) {
        this.tag = tag;
    }

    get getTag(): string {
        return this.tag;
    }

    set setTag(value: string) {
        this.tag = value;
    }
}
