import Chat from '../components/Chat';
import dotenv from 'dotenv';

dotenv.config()

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="text-center mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Autismo</h1>
                <h2 className="text-xl font-semibold text-gray-600 mb-10">Entenda mais sobre o autismo fazendo uma pergunta no campo abaixo</h2>
            </div>
            <Chat apiKey={process.env.GEMINI_API_KEY} />
        </main>
    );
}
