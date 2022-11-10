import React, { useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./PaletteProvider.css";

function PaletteProvider({ children }) {
	const [mode, setMode] = useState("dark");

	const theme = useMemo(
		() =>
			createTheme({
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							ul: {
								listStyle: "none",
								margin: 0,
								padding: 0
							}
						}
					},
					MuiSvgIcon: {
						styleOverrides: {
							root: { verticalAlign: "middle" }
						}
					}
				},
				palette: {
					mode: mode
				}
			}),
		[mode]
	);

	function handleModeChange(e) {
		setMode(mode === "dark" ? "light" : "dark");
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="modeSwitch">
				<DarkModeIcon color={mode === "dark" ? "warning" : "inherit"} />
				<Switch onChange={handleModeChange} />
			</div>
			{children}
		</ThemeProvider>
	);
}

export default PaletteProvider;
