// const apiKey = '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';
const express = require('express');
require('dotenv').config();
const cors =  require('cors');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Rahul Ai!'
  })
})

app.post('/convert', async (req, res) => {
    console.log(req.body)
  try {
    const {code,language} = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert this code: ${code} into ${language} language and also give the output, debug the code in case of error , if you find any error in the given code, debug it and suggest the correct code in the previous language, Evaluate the code on each parameter: code consistency,code performance, code documentation, error handling, code testability, code modularity, time complexity(in big O),space complexity(in big O),code duplication,code readability, also give percentage for each parameter`,
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send(
      response.data.choices[0].text.split("\n\n")
    );

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

app.listen(5001, () => console.log('Rahul AI server started on http://localhost:5001'))