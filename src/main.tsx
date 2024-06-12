import "the-new-css-reset/css/reset.css"
import "./index.css"

import { render } from "preact"

import { App } from "./app.tsx"

const renderer = document.getElementById("app")

if (!renderer) {
  throw new Error("No renderer found")
}

render(<App />, renderer)
