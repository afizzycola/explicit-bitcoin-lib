export abstract class BitcoinRepresentation {

    canonical: any;
    full: object;
    utility?: object

    constructor(canonicalAttribute, fullObject) {
        this.canonical  = canonicalAttribute;
        this.full = fullObject;
    }
}