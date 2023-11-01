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
    messages: string[];
    constructor(props: any) {
        super(props);
        this.state = {
            messageList: [<Message model={{
                message: "Hi! I'm GPT-3.5! Ask me questions about Saatva mattresses!", sender: "gojo",
                direction: "incoming", position: "normal"
            }} ></Message>]

        }
        this.openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });
        this.messages = ["Hi! I'm GPT-3.5! Ask me questions about Saatva mattresses!"];
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
    callGPT = async (request: string) => {
        var context = [];
        for( var i = 0; i < this.messages.length; i++) {
            if(i % 2 == 0) {
                context.push({role: "assistant", content: this.messages[i]});
            } else {
                context.push({role: "system", content: this.messages[i]});
            }
        }
        const completion = await this.openai.chat.completions.create({
            messages: context,
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].message);
        this.receivedMessage(completion.choices[0].message.content);
    }

    sentMessage = (message: string) => {
        const messages = [...this.state.messageList];
        messages.push(this.newMessage(message, direction.outgoing));
        this.messages.push(message);
        this.setState({ messageList: messages });
        //contact the llm
        this.callGPT(message);
    }

    receivedMessage = (message: string) => {
        const messages = [...this.state.messageList];
        messages.push(this.newMessage(message, direction.incoming))
        this.messages.push(message);
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