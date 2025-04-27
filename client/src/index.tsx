import { createRoot } from "react-dom/client";
import App from "./App";

// Removing StrictMode as it can cause issues with react-beautiful-dnd
createRoot(document.getElementById("app") as HTMLElement).render(
  <App />
);
