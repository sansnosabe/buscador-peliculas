import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies.js";

export function useMovies({ search, sort }) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [, setError] = useState(null);
	const previousSearch = useRef(search);

	const getMovies = useCallback(async ({ search }) => {
		if (search === previousSearch.current) return;

		try {
			setLoading(true);
			setError(null);
			previousSearch.current = search;
			const newMovies = await searchMovies({ search });
			setMovies(Array.isArray(newMovies) ? newMovies : []);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const sortedMovies = useMemo(() => {
		if (!sort) return movies;
		return [...movies].sort((a, b) => {
			let comparison;
			if (sort === "ascTitle" || sort === "descTitle") {
				comparison = a.title.localeCompare(b.title);
			} else {
				comparison = a.year - b.year;
			}
			return sort.includes("desc") ? -comparison : comparison;
		});
	}, [sort, movies]);

	return { movies: sortedMovies, getMovies, loading };
}
