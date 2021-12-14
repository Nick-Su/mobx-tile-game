import { ReactElement } from "react";
import { observer } from "mobx-react-lite";
import timerStore from "../../services/stores/timerStore";
import { convertToHHMMSS } from "../../services/helpers/timerUtils";
import './style.scss';

const ObservedTimer: React.FC = (): ReactElement => {
    return  (
        <div className="timer-container">
            <span>{ convertToHHMMSS(timerStore.secondsPassed) }</span>
        </div>
    )
}

const Counter = observer(ObservedTimer);

const TimerCounter: React.FC = (): ReactElement => {
    return <Counter />
}

export default TimerCounter;
