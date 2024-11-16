"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordCountAI = wordCountAI;
exports.teachAI = teachAI;
exports.generateTextAI = generateTextAI;
const fs_1 = require("fs");
const path_1 = require("path");
const fuzzyset_1 = __importDefault(require("fuzzyset"));
const lumexPath = (0, path_1.join)("/home/container", "LumexAI");
const dataPath = (0, path_1.join)(lumexPath, "ai.json");
let ngramDatabase;
let fuzzyWordSet;
if ((0, fs_1.existsSync)(dataPath)) {
    try {
        ngramDatabase = JSON.parse((0, fs_1.readFileSync)(dataPath, 'utf8'));
        const words = Object.keys(ngramDatabase.ngrams);
        fuzzyWordSet = (0, fuzzyset_1.default)(words);
    }
    catch (error) {
        initEmptyDatabase();
    }
}
else {
    initEmptyDatabase();
}
function initEmptyDatabase() {
    ngramDatabase = { ngrams: {}, wordCount: 0 };
    if (!(0, fs_1.existsSync)(lumexPath))
        (0, fs_1.mkdirSync)(lumexPath);
    (0, fs_1.writeFileSync)(dataPath, JSON.stringify(ngramDatabase, null, 2));
}
function generateResponse(message, length) {
    let currentWord = message.split(' ').pop() ?? '';
    const closestWord = getClosestWord(currentWord);
    if (closestWord)
        currentWord = closestWord;
    const response = [];
    if (ngramDatabase.ngrams[currentWord]) {
        const nextWords = Object.keys(ngramDatabase.ngrams[currentWord]);
        const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        response.push(nextWord);
        currentWord = nextWord;
    }
    while (response.length < length) {
        if (!ngramDatabase.ngrams[currentWord])
            break;
        const nextWords = Object.keys(ngramDatabase.ngrams[currentWord]);
        const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        response.push(nextWord);
        currentWord = nextWord;
    }
    if (response.length > 0) {
        response[0] = response[0].charAt(0).toUpperCase() + response[0].slice(1);
    }
    return response.join(' ');
}
function getClosestWord(word) {
    const result = fuzzyWordSet.get(word);
    return result && result.length > 0 ? result[0][1] : null;
}
function wordCountAI() {
    return ngramDatabase.wordCount;
}
function teachAI(message) {
    const processed = message.trim().toLowerCase().split(/\s+/);
    ngramDatabase.wordCount += processed.length;
    for (let i = 0; i < processed.length - 1; i++) {
        const currentWord = processed[i];
        const nextWord = processed[i + 1];
        if (!ngramDatabase.ngrams[currentWord]) {
            ngramDatabase.ngrams[currentWord] = {};
        }
        ngramDatabase.ngrams[currentWord][nextWord] = (ngramDatabase.ngrams[currentWord][nextWord] || 0) + 1;
    }
    const newWords = Object.keys(ngramDatabase.ngrams);
    if (newWords.length > 0) {
        fuzzyWordSet = (0, fuzzyset_1.default)(newWords);
    }
    (0, fs_1.writeFileSync)(dataPath, JSON.stringify(ngramDatabase, null, 2));
}
function generateTextAI(message, length) {
    const processed = message.trim().toLowerCase().split(/\s+/);
    if (processed.length === 0)
        return;
    if (Object.keys(ngramDatabase.ngrams).length === 0)
        return "The database is empty. Please use teachAI for training.";
    return generateResponse(processed.join(' '), length);
}
//# sourceMappingURL=ai.js.map