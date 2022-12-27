import React, { useState, useEffect, useMemo } from "react";
import { analyzeTranscription } from "./AnalyzeTranscription";
import "./App.css";

function App() {
    // State variables to track the audio stream, media recorder, and speech evaluation
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const chunks: Blob[] = useMemo(() => [], []);
    const [speechEvaluation, setSpeechEvaluation] = useState(
        "No speech input detected"
    );

    // Start recording speech input and provide feedback
    function startSpeech() {
        // Check if the getUserMedia() method is supported by the browser
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Request access to the microphone
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    // Save the audio stream to state and start recording
                    setAudioStream(stream);
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.addEventListener(
                        "dataavailable",
                        function (event) {
                            chunks.push(event.data);
                        }
                    );

                    setMediaRecorder(mediaRecorder);
                    mediaRecorder.start();
                })
                .catch((error) => {
                    // If there is an error accessing the microphone, display an error message
                    console.error("Error accessing microphone:", error);
                });
        } else {
            // If the getUserMedia() method is not supported, display an error message
            console.error("getUserMedia() is not supported by this browser");
        }
    }

    // Stop recording and evaluate the speech input
    function stopSpeech() {
        // Stop the media recorder and get the recorded audio
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            mediaRecorder.ondataavailable = (event) => {
              if (event.data && event.data.size > 0) {
                console.log(event.data);
                evaluateSpeech(event.data);
              }
            }
            // evaluateSpeech(new Blob(chunks, { type: "audio/mpeg" }));
        }
    }

    // Evaluate the speech input and provide feedback using the Google Cloud Speech-to-Text API
    async function evaluateSpeech(audioBlob: Blob) {
        // Convert the audio Blob to base64-encoded data
        const reader = new FileReader();
        const base64Data = (await new Promise<string>((resolve) => {
            reader.onload = () =>
                resolve((reader.result as string).split(",")[1]);
            reader.readAsDataURL(audioBlob);
        })) as string;
        console.log(base64Data);

        // Set up the request to the Google Cloud Speech-to-Text API
        const response = await fetch(
            "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDiAdSMh-9fBB0mO9WxXseqTp31P2lP02w",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    audio: {
                        content: base64Data,
                    },
                    config: {
                        enableWordTimeOffsets: true,
                        // encoding: "LINEAR16",
                        // sampleRateHertz: 44100,
                        languageCode: "en-US",
                    },
                }),
            }
        );

        if (response.ok) {
            // If the API call is successful, transcribe the audio and evaluate it
            const { results } = await response.json();
            const transcription = results[0].alternatives[0].transcript;
            const words = results[0].alternatives[0].words;
            const evaluation = analyzeTranscription(words);
            setSpeechEvaluation(evaluation);
        } else {
            // If there is an error with the API call, display an error message
            console.error(
                "Error calling the Google Cloud Speech-to-Text API:",
                response.status,
                response.statusText
            );
            // Stop the media recorder and get the recorded audio
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                // mediaRecorder.getAudioBlob().then(evaluateSpeech);
            }
        }
    }

    // Clean up the audio stream when the component unmounts
    useEffect(() => {
        return () => {
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [audioStream]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Speech Evaluation</h1>
                <div className="controls">
                    <button onClick={startSpeech} className="start">
                        Start Speech
                    </button>
                    <button onClick={stopSpeech} className="stop">
                        Stop Speech
                    </button>
                </div>
                <p className="evaluation">{speechEvaluation}</p>
            </header>
        </div>
    );
}

export default App;
