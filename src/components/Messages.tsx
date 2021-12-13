import React, { ReactElement } from 'react';

interface IMessagesProps {
    playgroundSize: number;
}

const Messages: React.FC<IMessagesProps> = ({ playgroundSize }): ReactElement => {

    const RenderMessage = (): ReactElement => {
        let message = '';

        switch (playgroundSize) {
            case 2:
                message = 'Good choice for 2-years old kid!';
                break;
            case 4:
                message = 'Beginner level'
                break;
            case 6:
                message = 'Feel boring?';
                break;
            case 8:
                message = 'Insane level';
                break;
            case 10:
                message = 'You are either a genius or just a madman. Good luck!'
                break;
            default:
                break;
        }

        return <p>{message}</p>
     
    }
    return (
       <RenderMessage />
    )
}

export default Messages
