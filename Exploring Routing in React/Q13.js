// MovieContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(collection(db, 'movies'));
      setMovies(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    await addDoc(collection(db, 'movies'), movie);
    setMovies([...movies, movie]); // Optimistic UI update
  };

  const editMovie = async (id, updatedMovie) => {
    const movieRef = doc(db, 'movies', id);
    await updateDoc(movieRef, updatedMovie);
    setMovies(movies.map(movie => (movie.id === id ? { ...movie, ...updatedMovie } : movie)));
  };

  const deleteMovie = async (id) => {
    await deleteDoc(doc(db, 'movies', id));
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, editMovie, deleteMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
