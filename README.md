# SpeakEasy

SpeakEasy is a web application that allows users to record and evaluate their own speech. It uses the Google Cloud Speech-to-Text API to transcribe the speech input and analyze the transcription for various evaluation criteria, including clear and concise speech, effective use of pauses, moderate pace, good volume and projection, and correct grammar and vocabulary.

This project was developed in collaboration with [ChatGPT](https://chat.openai.com/).


## Requirements

- A Google Cloud account with the Speech-to-Text API enabled
- Node.js and npm (included with the [Node.js](https://nodejs.org/) installation)
- A web browser

## Set up

1. Clone the repository:

```
git clone https://github.com/[USERNAME]/speak-easy.git
```


2. Install the dependencies:

```
cd speak-easy
npm install
```


3. Set up the Google Cloud Speech-to-Text API:

- Follow the [Quickstart guide](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries) to set up the API and obtain an API key.

4. Set the API key as an environment variable:

```
export REACT_APP_GOOGLE_CLOUD_SPEECH_TO_TEXT_API_KEY=[API_KEY]
```


## Run the app

1. Start the development server:
```
npm start
```

2. Open the app in a web browser:
```
http://localhost:3000/
```


## Usage

1. Click the "Start Speech" button to begin recording.
2. Speak into the microphone for up to 60 seconds.
3. Click the "Stop Speech" button to stop recording.
4. The transcription of the speech and the evaluation of the speech will be displayed in the "Speech Feedback" container.

## Contributing

This project is open to contributions. If you would like to contribute, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Google Cloud Speech-to-Text API](https://cloud.google.com/speech-to-text)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

