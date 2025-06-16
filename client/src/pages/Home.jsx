// client/src/pages/Home.jsx

// Simple landing page displayed at root URL ("/")
// Shows welcome message and brief app description
// Does not depend on user state or backend

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 text-center text-black">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Kniffel App 🎲</h1>
          <p className="text-gray-600">Play, track scores, and compete!</p>
        </div>
      </div>
    </>
  );
}