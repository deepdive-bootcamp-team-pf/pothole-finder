import {createRoot} from "react-dom/client"
import { App } from './ui/App'
import {store} from "./store";

const container = document.getElementById('root')
const rootContainer = createRoot(container)
rootContainer.render(App(store));