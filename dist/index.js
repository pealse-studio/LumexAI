"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LumexAI = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class LumexAI extends forgescript_1.ForgeExtension {
    name = "LumexAI";
    description = require("../package.json").description;
    version = require("../package.json").version;
    init() {
        this.load(__dirname + '/functions');
    }
    ;
}
exports.LumexAI = LumexAI;
;
//# sourceMappingURL=index.js.map