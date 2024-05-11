"use client";

import { createContext, useCallback, useContext, useState } from "react";
import defaultQuestionsFormCharacteristics from "@/components/Characteristics/questions.json";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('oque-e');
    const [description, setDescription] = useState('Entenda mais sobre o autismo fazendo uma pergunta no campo abaixo');
    const [responses, setResponses] = useState({});
    const [inputs, setInputs] = useState()
    const [questionsFormCharacteristics, setQuestionsFormCharacteristics] = useState(defaultQuestionsFormCharacteristics)

    return (
        <AuthContext.Provider value={{ question, setQuestion, messages, setMessages, isLoading, setIsLoading, activeTab, setActiveTab, description, setDescription, responses, setResponses, questionsFormCharacteristics, setQuestionsFormCharacteristics }}>
            { children }
        </AuthContext.Provider>
    )
}
