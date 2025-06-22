// client/src/pages/Home.jsx

// Simple landing page displayed at root URL ("/")
// Shows welcome message and brief app description
// Does not depend on user state or backend

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mx-auto flex justify-center items-center min-h-screen w-screen bg-gray-100 dark:bg-gray-900 text-center text-black dark:text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Kniffel App 🎲</h1>
          <p className="text-gray-600 dark:text-gray-300">Play, track scores, and compete!</p>
        </div>
      </div>
    </>
  );
}