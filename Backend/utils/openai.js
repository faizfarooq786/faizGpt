import 'dotenv/config';

const getOpenAiApiResponse = async(message) => {
     const options = {
    method: "POST",
    headers: {   // ✅ lowercase
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    console.log("API KEY:", process.env.OPENAI_API_KEY);

  }
}

export default getOpenAiApiResponse;