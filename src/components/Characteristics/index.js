"use client";

import { useAuthContext } from '@/providers';
import { getResponseGemini } from '@/utils/Gemini';

export default function CharacteristicsForm({ apiKey }) {
    const { responses, setResponses, questionsFormCharacteristics, setQuestionsFormCharacteristics } = useAuthContext();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponses({ ...responses, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("responses:", responses);

        const questionsWithEvaluation = []

        for (let question of questionsFormCharacteristics) {
            question["printEvaluation"] = true

            if (question["type"] == "textarea") {
                question["responseGemini"] = await getResponseGemini(question, responses[question.question], apiKey)
            }

            questionsWithEvaluation.push(question)
        }

        setQuestionsFormCharacteristics(questionsWithEvaluation)
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <p className="font-bold mb-6">Aviso: Esse questionário não substitui a avaliação de um profissional, mas pode auxiliar na identificação de características do autismo.</p>
            <h2 className="text-xl font-bold mb-4">Questionário sobre Autismo</h2>
            {questionsFormCharacteristics.map((question, index) => (
                <div key={index} className="mb-4">
                    <label htmlFor={question.question} className="block text-gray-700 font-bold mb-2">
                        {question.question}
                    </label>
                    {question.type === "radio" && (
                        <div>
                            {question.options.map((option) => (
                                <label key={option} className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name={question.question}
                                        value={option}
                                        checked={responses[question.question] === option}
                                        onChange={handleChange}
                                        className="form-radio"
                                        required
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {question.printEvaluation && (
                                <span>{question.evaluation[responses[question.question]]}</span>
                            )}
                        </div>
                    )}
                    {question.type === "textarea" && (
                        <textarea
                            id={question.question}
                            name={question.question}
                            value={responses[question.question] || ""}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    )}
                    {question.type === "textarea" && question.printEvaluation && (
                        <span>{question.evaluation[question.responseGemini]}</span>
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Enviar
            </button>
        </form>
    );
}
