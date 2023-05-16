require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-HR47OWqEFCJ8evREQ4lP5ZVh",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: "Say this is a test",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
    });
    console.log(response.data.choices[0].text)
    res.json({
        data: response.data
    })
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});