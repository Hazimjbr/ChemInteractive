import Header from '@/components/header';
import MainNav from '@/components/main-nav';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to ChemInteractive
        </h1>
        <p className="text-lg text-muted-foreground">
          Your modern platform for learning chemistry. Explore lessons, experiments, and quizzes to master the Tawjihi curriculum.
        </p>
      </main>
    </div>
  );
}
