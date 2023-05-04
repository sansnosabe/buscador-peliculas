import { useState, useCallback } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";

import { Movies } from "./components/Movies.jsx";
import { ThemeToggle } from "./components/ThemeToggle";
import debounce from "just-debounce-it";

import "./App.css";

function App() {
	const [sort, setSort] = useState(false);

	const { search, updateSearch, error } = useSearch();
	const { movies, loading, getMovies } = useMovies({ search, sort });

	const debouncedGetMovies = useCallback(
		debounce((search) => {
			console.log("search", search);
			getMovies({ search });
		}, 300),
		[getMovies]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		getMovies({ search });
	};

	const handleSortChange = (event) => {
		setSort(event.target.value);
	};

	const handleChange = (event) => {
		const newSearch = event.target.value;
		updateSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

	return (
		<div className="page">
			<ThemeToggle />
			<header>
				<h1>Buscador de películas</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div className="search">
						<input
							style={{
								border: "1px solid transparent",
								borderColor: error ? "red" : "transparent",
							}}
							onChange={handleChange}
							value={search}
							name="query"
							placeholder="Harry Potter, Star Wars..."
						/>
						<button type="submit">Buscar</button>
					</div>
					{/* <div> */}
					<select value={sort} onChange={handleSortChange} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ced4da" }}>
						<option value="">Sin ordenar</option>
						<option value="ascTitle">Orden alfabético</option>
						<option value="descTitle">Orden alfabético inverso</option>
						<option value="ascYear">Por fecha (ascendente)</option>
						<option value="descYear">Por fecha (descendente)</option>
					</select>
					{/* </div> */}
				</form>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</header>

			<main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
		</div>
	);
}

export default App;
