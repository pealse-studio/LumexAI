"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ai_1 = require("../ai");
exports.default = new forgescript_1.NativeFunction({
    name: "$generateTextAI",
    version: "1.0.0",
    description: "Generates text based on incoming message using AI",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "message",
            description: "Input message to generate response",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "answer",
            description: "Default response (if generation fails)",
            type: forgescript_1.ArgType.String,
            rest: false
        },
        {
            name: "length",
            description: "Length of generated text (default: 30)",
            type: forgescript_1.ArgType.Number,
            rest: false
        }
    ],
    execute(ctx, [message, answer, length]) {
        const result = (0, ai_1.generateTextAI)(String(message), Number(length) || 30) || (answer || "Sorry, I couldn't understand your request.");
        return this.success(result);
    }
});
//# sourceMappingURL=generateTextAI.js.map