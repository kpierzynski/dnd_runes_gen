import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import PaletteProvider from "./PaletteProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<PaletteProvider>
		<App />
	</PaletteProvider>
);
