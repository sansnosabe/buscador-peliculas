import { useState, useEffect } from "react";

import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

export function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(true);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [darkMode]);

	return (
		<figure>
			<img 
				onClick={toggleDarkMode} 
				className="theme-container" 
				src={darkMode ? sun : moon} 
				alt={darkMode ? "Modo Claro" : "Modo Oscuro"} 
			/>
		</figure>
	);
}
