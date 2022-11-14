import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const getPhotos = useCallback(async () => {
    setLoading(true);

    let url = "";

    if (searchWord) {
      url = `${searchUrl}?client_id=${process.env.REACT_APP_API_KEY}&page=${pages}&query=${searchWord}`;
    } else {
      url = `${mainUrl}?client_id=${process.env.REACT_APP_API_KEY}&page=${pages}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setPhotos((prevState) => {
      if (searchWord && pages === 1) {
        return data.results;
      } else if (searchWord) {
        return [...prevState, ...data.results];
      } else {
        return [...prevState, ...data];
      }
    });

    setLoading(false);
  }, [pages, searchWord]);

  useEffect(() => {
    getPhotos();
  }, [pages, getPhotos]);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPages((prevState) => prevState + 1);
        setLoading(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPages(1);
    setSearchWord(query);
    getPhotos();
  }

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} photo={photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
