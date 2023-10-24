import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from '@chatscope/chat-ui-kit-react';

enum direction{
    "incoming",
    "outgoing"
}
const apiKey = "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"

export function emptyMessageList() {
    return (
        <MessageList>
        </MessageList>
    );
}

export class ChatWindow extends React.Component<{}, {messageList: JSX.Element[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            messageList: [<Message model={{
                message: "through heaven and earth i alone am the honored one", sender: "gojo",
                direction: "incoming", position: "normal"
            }} ></Message>, <Message
                model={{
                    message: "are you the strongest bc ur gojo or are u gojo bc ur the strongest", sender: "geto",
                    direction: "outgoing", position: "normal"
                }} ></Message>]

        }
    }


    newMessage(message: string, direction: direction) {
        return (
            <Message
                model={{
                    message: message,
                    direction: direction,
                    position: "normal"
                }}></Message>
        );
    }


    sentMessage = (message: string) => {
        const messages = [...this.state.messageList];
        messages.push(this.newMessage(message, direction.outgoing))
        this.setState({ messageList: messages });
        //contact the llm
    }

    receivedMessage = (message: string) => {
        const messages = [...this.state.messageList];
        messages.push(this.newMessage(message, direction.incoming))
        this.setState({ messageList: messages });

    }

    render() {
        return (
            <ChatContainer>
                <MessageList>
                    {this.state.messageList}
                </MessageList>
                <MessageInput
                    placeholder='what do you want to know'
                    onSend={this.sentMessage} />
            </ChatContainer>
        );
    }
}