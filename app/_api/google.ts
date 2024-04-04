
// we want to get the follow value from the page
// body > main > p:nth-child(3) > input[type=url]
// const corsURL = fetch('https://justcors.com/').then(response => response.text()).then(text => {
//     const parser = new DOMParser();
//     const htmlDocument = parser.parseFromString(text, 'text/html');
//     const inputElement = htmlDocument.querySelector('body > main > p:nth-child(3) > input[type=url]') as HTMLInputElement;
//     const value = inputElement?.value;
//     return value;
// });

const corsURL = 'https://justcors.com/tl_3b526a1/'

function get_autocomplete(query: string) {
        return fetch(
            `${corsURL}https://suggestqueries.google.com/complete/search?json&client=firefox&hl=en&lr=en&ds=n&q=${query}`
        )
            .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure data[1] exists before accessing
        const suggestions = data[1] || [];
        return suggestions;
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
}

export { get_autocomplete };