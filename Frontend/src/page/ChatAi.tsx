import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserNavigation from '../Navigations/userNav';

const ChatAi: React.FC = () => {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    AOS.init();

    async function generateAnswer() {
        setAnswer("Generating answer");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDnae0dqLKXWImtDSEll_IFgnNDvuVZ_jM",
                method: "POST",
                data: {
                    "contents": [
                        { "parts": [{ "text": question }] }
                    ]
                }
            });

            setAnswer(response.data.candidates[0].content.parts[0].text);
            setQuestion("");
        } catch (error) {
            console.error("Error generating answer:", error);
            setAnswer("Error generating answer. Please try again.");
        }
    }

    return (
        <div>
            <UserNavigation/>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: '#000000', marginBottom: '20px' }}>Ask question about shrimps?</h1>
            <Space direction="vertical" style={{ width: '50%', textAlign: 'center' }}>
                <pre style={{  color: '#000000', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'left', width: '100%' }}>{answer}</pre>
                <Input.TextArea
                    style={{ border: '1px solid #ced4da', marginBottom: '20px', width: 'calc(100% - 42px)' }}
                    placeholder='Ask a question'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={2}
                />
                <Button type="primary" onClick={generateAnswer} style={{ width: '100px' }}>Generate</Button>
            </Space>
        </div>
        </div>
    );
};

export default ChatAi;