import React, { useState } from "react";
import { useAuthenticatedApi } from "./index";

const LoginExample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login, logout, userData, loading } = useAuthenticatedApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter both email and password");
      return;
    }

    const response = await login({ email, password });

    if (!response.success) {
      setLoginError(response.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {userData ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Welcome, {userData.userFirstName}!
          </h2>
          <div className="mb-4">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Handle:</strong> {userData.handle}
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginExample;
