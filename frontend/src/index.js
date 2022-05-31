import {createRoot} from "react-dom/client"
import { App } from './ui/App'

const container = document.getElementById('root')
const rootContainer = createRoot(container)
rootContainer.render(<App />);