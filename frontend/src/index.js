import { createRoot } from "react-dom/client";
import { store } from "./store";
import { App } from "./ui/App";

const container = document.getElementById("root");
const rootContainer = createRoot(container);
rootContainer.render(App(store));
