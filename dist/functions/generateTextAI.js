"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ai_1 = require("../ai");
exports.default = new forgescript_1.NativeFunction({
    name: "$generateTextAI",
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
        },
        {
            name: "answer",
            description: "...",
            type: forgescript_1.ArgType.String,
            rest: false
        },
        {
            name: "length",
            description: "...",
            type: forgescript_1.ArgType.Number,
            rest: false
        }
    ],
    execute(ctx, [message, answer, length]) {
        const num = length || 30;
        const generate = (0, ai_1.generateTextAI)(String(message), Number(num));
        const text = answer || "Sorry, I couldn't understand your request.";
        const result = generate || text;
        return this.success(result);
    },
});
//# sourceMappingURL=generateTextAI.js.map