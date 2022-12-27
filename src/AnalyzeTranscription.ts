export function analyzeTranscription(words: any[]): string {
    // Initialize the evaluation variables
    let clearAndConcise = 0;
    let effectivePauses = 0;
    let moderatePace = 0;
    let goodVolume = 0;
    let correctGrammar = 0;

    console.log(words);

    
    // Analyze the transcription for each evaluation criteria
    for (const wordObj of words) {
        const word = wordObj.word;
        
        // Calculate the duration of the word
        const duration = (parseFloat(wordObj.endTime.slice(0, -1)) - parseFloat(wordObj.startTime.slice(0, -1)));
        console.log(duration);

        if (word.length < 7) {
            clearAndConcise++;
        }
        // if (word === "," || word === "." || word === "...") {
        //     effectivePauses++;
        // }
        if (duration > 0.3 && duration < 0.8) {
            moderatePace++;
        }
        // if (word === word.toUpperCase()) {
        //     goodVolume++;
        // }
        if (word.match(/^[a-zA-Z]+$/)) {
            correctGrammar++;
        }
    }

    // Calculate the overall evaluation score
    const score =
        (clearAndConcise / words.length) * 25 +
        // (effectivePauses / words.length) * 25 +
        (moderatePace / words.length) * 25 +
        // (goodVolume / words.length) * 25 +
        (correctGrammar / words.length) * 25;

    console.log(clearAndConcise, moderatePace, correctGrammar, score);

    // Return the evaluation message based on the score
    if (score > 90) {
        return "Excellent speech! Your delivery was clear, concise, and had good pacing, volume, and grammar. Keep up the great work!";
    } else if (score > 51) {
        return "Good speech. Your delivery was mostly clear and concise, and had good pacing and volume. Keep practicing and you'll do even better next time!";
    } else if (score > 50) {
        return "Average speech. Your delivery was somewhat clear and concise, and had decent pacing and volume. There may be some room for improvement in all areas. Keep working on your delivery skills and you'll see improvement over time.";
    } else {
        return "Poor speech. Your delivery was not very clear or concise, and had poor pacing, volume, and grammar. It's important to practice your delivery skills in order to improve. Keep working at it and you'll see progress over time.";
    }
}
