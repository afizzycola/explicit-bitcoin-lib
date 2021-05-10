'use strict';
const createHash = require('create-hash');
class TaggedHash {
    constructor(tag) {
        const hash = createHash('sha256');
        const prefixHalf = hash.update(tag).digest();
        this.prefix = new Uint8Array([...prefixHalf, ...prefixHalf]);
        if (hash.copy) {
            this.midState = this.createMidState();
        }
    }
    createMidState() {
        return createHash('sha256').update(this.prefix);
    }
    hash(data) {
        var _a, _b, _c;
        const midState = (_c = (_b = (_a = this.midState) === null || _a === void 0 ? void 0 : _a.copy) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : this.createMidState();
        return midState.update(data).digest();
    }
}
module.exports = TaggedHash;