import React, { createContext, useEffect, useState } from 'react'
import { ReactNode } from 'react';

import { api } from '../../services/api'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesProviderProps {
  children: ReactNode
}

interface MoviesProviderData {
  genres: GenreResponseProps[]
  movies: MovieProps[]
  selectedGenre: GenreResponseProps
  selectedGenreId: number
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>
}


export const MoviesContext = createContext({} as MoviesProviderData)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{genres, movies, selectedGenre, selectedGenreId, setSelectedGenreId }}>
      {children}
    </MoviesContext.Provider>
  )
}