import { observer } from "mobx-react-lite";
import timerStore, { Timer} from "../../services/stores/timerStore";
import { convertToHHMMSS } from "../../services/helpers/timerUtils";
import './style.scss';

const ObservedTimer = () => {
    return  (
        <div className="timer-container">
            <span>{ convertToHHMMSS(timerStore.secondsPassed) }</span>
        </div>
    )
}

const Counter = observer(ObservedTimer);

const TimerCounter = () => {
    return <Counter />
}

export default TimerCounter;
