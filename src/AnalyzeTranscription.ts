// Analyze the transcription and return an evaluation of the speech
export function analyzeTranscription(words: any[]): string {
    // Initialize the evaluation variables
    let clearAndConcise = 0;
    let effectivePauses = 0;
    let moderatePace = 0;
    let goodVolume = 0;
    let correctGrammar = 0;
    let totalDuration = 0;

    // Analyze the transcription for each evaluation criteria
    for (const wordObj of words) {
        const word = wordObj.word;
        // Calculate the duration of the word
        const duration = wordObj.endTime - wordObj.startTime;
        totalDuration += duration;

        if (word.length < 5) {
            clearAndConcise++;
        }
        if (word === "," || word === ".") {
            effectivePauses++;
        }
        if (duration > 5 && duration < 8) {
            moderatePace++;
        }
        if (word === word.toUpperCase()) {
            goodVolume++;
        }
        if (word.match(/^[a-zA-Z]+$/)) {
            correctGrammar++;
        }
    }

    // Calculate the overall evaluation score
    const score =
        (clearAndConcise / words.length) * 25 +
        (effectivePauses / words.length) * 25 +
        (moderatePace / words.length) * 25 +
        (goodVolume / words.length) * 25 +
        (correctGrammar / words.length) * 25;

    // Return the evaluation message based on the score
    if (score > 90) {
        return "Excellent speech!";
    } else if (score > 75) {
        return "Good speech.";
    } else if (score > 50) {
        return "Average speech.";
    } else {
        return "Poor speech.";
    }
}
