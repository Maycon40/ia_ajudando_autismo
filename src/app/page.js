import Content from "@/components/Content";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Autismo</h1>
        <Menu />
      </div>
      <Content />
    </main>
  );
}
