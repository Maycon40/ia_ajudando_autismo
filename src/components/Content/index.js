"use client";

import { useAuthContext } from "@/providers";
import Chat from "../Chat";
import CharacteristicsForm from "../Characteristics";

export default function Content({ apiKey }) {
    const { activeTab } = useAuthContext()

    return (
        <>
            {activeTab === 'oque-e' && (
                <Chat apiKey={apiKey} />
            )}

            {activeTab === 'caracteristicas' && (
                <CharacteristicsForm apiKey={apiKey}/>
            )}
        </>
    )
}
