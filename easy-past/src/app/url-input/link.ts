export interface ILink {
    hashid: string;
    url: string;
    created_at: Date;
}

export class Link implements ILink {
    hashid: string;
    url: string;
    created_at: Date;
    constructor(hashid: string = '', url: string = '', created_at: Date = null) {
        this.hashid = hashid;
        this.url = url;
        this.created_at = created_at;
    }
}