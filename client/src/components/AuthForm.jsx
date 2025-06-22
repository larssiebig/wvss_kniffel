// client/src/components/AuthForm.jsx

// Reusable authentication form component for login and registration.
// Accepts controlled inputs for username and password, calls onSubmit on form submission.

export default function AuthForm({
  title,
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  buttonText,
}) {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 text-black">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>

        <label htmlFor="username" className="block mb-1 font-semibold">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          autoComplete="username"
          required
        />

        <label htmlFor="password" className="block mb-1 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}