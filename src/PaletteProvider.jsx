import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
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
		mode: "dark"
	}
});

const colors = {
	text: darkTheme.palette.text.primary,
	bg: darkTheme.palette.background.default,
	selected: darkTheme.palette.primary.main
};

function PaletteProvider({ children }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export { colors };
export default PaletteProvider;
