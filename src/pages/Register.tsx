import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Регистрация пользователя
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      // Автоматический вход после регистрации
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const loginResponse = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Сохраняем JWT
      localStorage.setItem(
        "access_token",
        loginResponse.data.access_token
      );

      // Переходим в CRM
      navigate("/clients");

    } catch (error) {
      console.error("REGISTER/LOGIN ERROR:", error);

      setError(
        "Не удалось завершить регистрацию. Попробуйте еще раз."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">

          <h1 className="text-2xl font-bold text-blue-600">
            AnnCRM
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Создайте новый аккаунт
          </p>

        </div>


        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}


        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>

            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Имя пользователя
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Введите имя"
              autoComplete="username"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


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
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Введите email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Введите пароль"
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Регистрация..."
              : "Зарегистрироваться"}
          </button>

        </form>


        <p className="mt-6 text-center text-sm text-gray-500">

          Уже есть аккаунт?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
          >
            Войти
          </button>

        </p>

      </div>

    </div>
  );
}


export default Register;