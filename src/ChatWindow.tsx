import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { OpenAI } from 'openai';

enum direction {
    "incoming",
    "outgoing"
}

export function emptyMessageList() {
    return (
        <MessageList>
        </MessageList>
    );
}

export class ChatWindow extends React.Component<{}, { messageList: JSX.Element[] }> {

    openai: OpenAI;

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
        this.openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });
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
    callGPT = async () => {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].message);
    }

    sentMessage = (message: string) => {
        const messages = [...this.state.messageList];
        messages.push(this.newMessage(message, direction.outgoing))
        this.setState({ messageList: messages });
        //contact the llm
        this.callGPT();
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