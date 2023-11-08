
import React, { useState, useEffect } from 'react';
import './App.css';
import {FaSquareXTwitter} from 'react-icons/fa6'
import {GrChapterNext} from 'react-icons/gr'
import {BiSearchAlt2} from "react-icons/bi"

const App = () => {
  const [author, setAuthor] = useState('');
  const [quotes, setQuotes] = useState([]);
  
  const handleSearch = async () => {
    try {
      let apiUrl = 'https://type.fit/api/quotes';

      if (author.trim() === '') {
        apiUrl = `https://type.fit/api/quotes?author=${encodeURIComponent(author)}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();  

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
    
      setQuotes(randomQuote);

    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleNextQuote = () => {
    handleSearch();
  };

  const handleClick = () => {
    window.open('https://twitter.com', '_blank');
  };

  // Fetch random quote on component mount
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="App">

      <h1>QUOTE GENERATOR</h1>

      <div className='search'>

        <input
          type="text"
          placeholder="Enter author's name"
          className="search-1" 
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <BiSearchAlt2 onClick={handleSearch} className='icons-1'/>          
      </div>

      <blockquote className='quotes'>{quotes.text}</blockquote>

      {quotes && (

          <div className='footer'>

            <div className="line"></div>

              <div className='bottom'>
                  <p className='author'>{quotes.author || 'Unknown'}</p>

                  <div className="icons">
                    <GrChapterNext onClick={handleNextQuote}/>
                    <FaSquareXTwitter onClick={handleClick}/>
                  </div>
              </div>
          </div>
        )}
          
      

    </div>
  );
};

export default App;


