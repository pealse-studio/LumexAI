"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        consoleLog("LumexAI", error);
        initEmptyDatabase();
    }
}
else {
    initEmptyDatabase();
}
function consoleLog(title, text) {
    const options = {
        timeZone: "Europe/Kiev",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const now = new Date().toLocaleString('uk-UA', options);
    console.log(`- \x1b[38;5;146m[${now}]\x1b[38;5;15m (${title}) \x1b[38;5;187m${text}\x1b[0m`);
}
function initEmptyDatabase() {
    ngramDatabase = { ngrams: {}, wordCount: 0 };
    if (!(0, fs_1.existsSync)(lumexPath))
        (0, fs_1.mkdirSync)(lumexPath);
    (0, fs_1.writeFileSync)(dataPath, JSON.stringify(ngramDatabase, null, 2));
}
function generateResponse(message, length) {
    if (message.trim().length === 0)
        return;
    let currentWord = message.split(' ').pop() ?? '';
    const closestWord = getClosestWord(currentWord);
    if (closestWord)
        currentWord = closestWord;
    const response = [currentWord];
    while (response.length < length) {
        if (!ngramDatabase.ngrams[currentWord])
            break;
        const nextWords = Object.keys(ngramDatabase.ngrams[currentWord]);
        const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        response.push(nextWord);
        currentWord = nextWord;
    }
    response[0] = response[0].charAt(0).toUpperCase() + response[0].slice(1);
    return response.join(' ');
}
function getClosestWord(word) {
    const result = fuzzyWordSet.get(word);
    return result && result.length > 0 ? result[0][1] : null;
}
function teachAI(message) {
    const processed = message.toLowerCase().split(/\s+/);
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
    if (Object.keys(ngramDatabase.ngrams).length === 0) {
        return "The database is empty. Please use teachAI for training.";
    }
    const processed = message.toLowerCase().split(/\s+/);
    return generateResponse(processed.join(' '), length);
}
//# sourceMappingURL=ai.js.map