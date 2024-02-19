import {create, props} from "@stylexjs/stylex";

const Container = (props) => {
    const {style, children, other, stuff, that, is, not, here} = props;
    debugger
    return <div>{props.children}</div>
}

export default function App() {
    return (
        <Container/>
    );
}