import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowList = ({ shows, onShowSelect }) => {
  return (
    <div className="show-grid">
     
      
      {shows.map((show) => (
        <div key={show.show.id} className="show-card">
        <h3>{show.show.name}</h3>
        <p>{show.show.language}</p>
        <button onClick={() => onShowSelect(show.show)}>View Details</button>
      </div>
      ))}
      </div>
    
  );
};

const ShowDetails = ({ show }) => {
  return (
    <div>
      <h2>Show Details<br/></h2>
      <h3>{show.name}</h3>
      <div className="summary_bg">
      <p>{show.summary}</p>
      </div>
      {/* Add ticket booking button and form */}
    </div>
  );
};

// Rest of the code remains the same

const Page = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setSearchVisible] = useState(true);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSearchVisible(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSearchVisible(true);
  };

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  const searchLetter = searchQuery.toUpperCase();

  return (
    <div className="page-container">
      <div className="overlay"></div>
      <h1 className="quad">QuadBTech</h1>
      {isSearchVisible && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search shows..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
      )}
      {selectedShow ? (
        <ShowDetails show={selectedShow} />
      ) : (
        <div className="search-list-container">
          <h2>Movies starting with {searchLetter}</h2>
          <ShowList shows={shows} onShowSelect={handleShowSelect} />
        </div>
        
      )}
    </div>
  );
};

export default Page;
