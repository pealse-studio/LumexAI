"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ai_1 = require("../ai");
exports.default = new forgescript_1.NativeFunction({
    name: "$wordCountAI",
    version: "1.0.0",
    description: "Returns the number of words stored in the database",
    unwrap: true,
    execute(ctx) {
        return this.success((0, ai_1.wordCountAI)());
    }
});
//# sourceMappingURL=wordCountAI.js.map