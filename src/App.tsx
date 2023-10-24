import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import {ChatWindow} from './ChatWindow';
import {
    MainContainer
} from '@chatscope/chat-ui-kit-react';

export interface AppProps {
    mattress: string;
}
function App() {
    return (
        <div className="App">
            <div style={{ position: "relative", height: "500px" }}>
                <MainContainer>
                    <ChatWindow/>
                </MainContainer>
            </div>
        </div>
    );
}

export default App;
