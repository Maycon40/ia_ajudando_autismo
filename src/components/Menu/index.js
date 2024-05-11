"use client";

import { useAuthContext } from '@/providers';

const descritionsTab = {
    'oque-e': 'Entenda mais sobre o autismo fazendo uma pergunta no campo abaixo',
    'caracteristicas': 'Saiba quais caracteristicas você tem do autismo'
}

export default function Menu() {
    const { activeTab, setActiveTab, description, setDescription } = useAuthContext();

    function changeActiveTab(tab){
        setActiveTab(tab)
        setDescription(descritionsTab[tab])
    }

    return (
        <>
            <ul className="flex space-x-4 items-center justify-center mb-5">
                <li
                    className={`cursor-pointer px-4 py-2 rounded-full ${activeTab === 'oque-e' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => changeActiveTab('oque-e')}
                >
                    O que é
                </li>
                <li
                    className={`cursor-pointer px-4 py-2 rounded-full ${activeTab === 'caracteristicas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => changeActiveTab('caracteristicas')}
                >
                    Características
                </li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-600 mb-10">{description}</h2>
        </>
    )
}
