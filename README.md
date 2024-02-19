### Describe the bug

Using stylex, the chrome devtool sourcemaps are out of sync and debugger statements show the incorrect line. 

Linebreaks in the original source and the destructure statement both contribute to the issue: 

```
import {create, props} from "@stylexjs/stylex" <========  if this line is commented Chrome debugger works fine

const Container = (props) => {
    const {style, children, other, stuff, that, is, not, here} = props; <==== this line also has an effect
    debugger <=====================  Chrome debugger doesn't show this as the active line
    return <div>{children}</div>
}

export default function App() {
    return (   <=====================  Chrome debugger highlights this line
        <Container/>
    );
}
```

If you look at the original source this is all on one line:
`import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/Appx.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=783705ba"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];`

However, if you comment out the stylex import then these are on separate lines and the debugger statements show the correct point in the file as expected.

On further investigation the stylex inject statements also seem to affect the position of the debugger statement.
e.g.:
Adding this to the source:
```
const styles = create({
   ...
})
```
results in this being added:
`_inject2(".x18exv7z{color:var(--xsbezlk)}", 3000);`

which seems to push the debugger down by one additional line.

