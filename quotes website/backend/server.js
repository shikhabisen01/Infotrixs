import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(cors());


app.get('/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://type.fit/api/quotes');
    const quotes = response.data;
    const { author } = req.query;

    if (author) {
      const filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
      return res.json(filteredQuotes);
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json([randomQuote]);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
