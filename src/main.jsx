import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./stores/store.jsx";

createRoot(document.getElementById("root")).render(
	<StoreProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</StoreProvider>
);
