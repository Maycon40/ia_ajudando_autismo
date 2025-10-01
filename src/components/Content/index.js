"use client";

import { useAuthContext } from "@/providers";
import Chat from "../Chat";
import CharacteristicsForm from "../Characteristics";

export default function Content() {
  const { activeTab } = useAuthContext();

  return (
    <>
      {activeTab === "oque-e" && <Chat />}

      {activeTab === "caracteristicas" && <CharacteristicsForm />}
    </>
  );
}
