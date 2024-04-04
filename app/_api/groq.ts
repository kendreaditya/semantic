const Groq = require("groq-sdk");
const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function get_autocomplete(query: string) {
  return await groq.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content:
            "Generate a JSON object with 10 predicted search queries. The JSON object should consist solely of a list of these queries and the key should be search_queries. Be sure there are no duplicates.",
        },
        {
          role: "user",
          content: `The query is "${query}"`,
        },
      ],
      model: "gemma-7b-it",
    })
    .then((chatCompletion: any) => {
      return chatCompletion.choices[0]?.message?.content || "";
    }).then((raw_response: any) => {
      // pares the response for the first { and last }
      const json = raw_response.match(/\{.*\}/s);
      const data = JSON.parse(json);
      let suggestions = data.search_queries || [];
      // remove duplicates
      suggestions = suggestions.filter((value, index) => suggestions.indexOf(value) === index);
      return suggestions
    });
}

export { get_autocomplete };