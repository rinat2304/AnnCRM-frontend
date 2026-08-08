import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        username: email,
        password,
      });

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/clients");

    } catch {
      setError("Неверный email или пароль");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">

          <h1 className="text-2xl font-semibold text-gray-900">
            CRM System
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Войдите в свой аккаунт
          </p>

        </div>


        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />

          </div>


          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>

            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>

        </form>


        <p className="mt-6 text-center text-sm text-gray-500">

          Нет аккаунта?{" "}

          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Зарегистрироваться
          </a>

        </p>

      </div>

    </div>
  );
}


export default Login;