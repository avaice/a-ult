import { render } from "preact"
import { App } from "./app.tsx"
import "the-new-css-reset/css/reset.css"
import "./index.css"

render(<App />, document.getElementById("app")!)
