import React, { ReactElement, useState } from "react";
import './style.scss';

interface AnimatedIconButtonProps {
    clickHandler: () => void;
    text?: string,
    btnClasses?: string,
    fontAwesomeClasses?: string
}

const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({ clickHandler, text, btnClasses, fontAwesomeClasses}): ReactElement => {
    const [isAnimate, setIsAnimate] = useState<boolean>(false);

    const clickInterceptor = (): void => {
        setIsAnimate(true);
        setTimeout(() => {
            setIsAnimate(false)
        }, 100);
        clickHandler()
    }

    return (
        <button onClick={clickInterceptor} className={`${btnClasses}`}>
            <i className={`${fontAwesomeClasses} ${isAnimate ? "small-icon" : "big-icon"}`}></i>{text}
        </button>
    )
}

export default AnimatedIconButton;