import React from "react";
import './at-button.scss'

interface AtButtonProps {
    text: string,
    onClicked?: () => void
}
function AtButton({text, onClicked}: AtButtonProps): JSX.Element {
    return (
        <button className={'at-button'} onClick={onClicked}>{text}</button>
    );
}

export {AtButton}