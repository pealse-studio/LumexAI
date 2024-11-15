"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ai_1 = require("../ai");
exports.default = new forgescript_1.NativeFunction({
    name: "$teachAI",
    version: "1.0.0",
    description: "...",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "message",
            description: "...",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [message]) {
        (0, ai_1.teachAI)(message);
        return this.success();
    },
});
//# sourceMappingURL=teachAI.js.map