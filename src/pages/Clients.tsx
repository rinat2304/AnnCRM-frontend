import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  type Client,
} from "../services/clientService";


function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Создание
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [creating, setCreating] = useState(false);

  // Редактирование
  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [updating, setUpdating] = useState(false);

  // Удаление
  const [deletingId, setDeletingId] =
    useState<number | null>(null);


  // Получение клиентов
  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getClients();

        setClients(data);

      } catch (error) {
        console.error("GET CLIENTS ERROR:", error);

        setError("Не удалось загрузить клиентов");

      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);


  // Создание клиента
  const handleCreateClient = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setCreating(true);
    setError("");

    try {
      const newClient = await createClient({
        name,
        phone,
        email: email || null,
      });

      setClients((currentClients) => [
        ...currentClients,
        newClient,
      ]);

      setName("");
      setPhone("");
      setEmail("");

      setShowForm(false);

    } catch (error) {
      console.error("CREATE CLIENT ERROR:", error);

      setError("Не удалось добавить клиента");

    } finally {
      setCreating(false);
    }
  };


  // Открытие редактирования
  const handleEditClick = (client: Client) => {
    setEditingClient(client);

    setEditName(client.name);
    setEditPhone(client.phone);
    setEditEmail(client.email || "");

    setError("");
  };


  // Обновление клиента
  const handleUpdateClient = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!editingClient) {
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const updatedClient = await updateClient(
        editingClient.id,
        {
          name: editName,
          phone: editPhone,
          email: editEmail || null,
        }
      );

      setClients((currentClients) =>
        currentClients.map((client) =>
          client.id === updatedClient.id
            ? updatedClient
            : client
        )
      );

      setEditingClient(null);

    } catch (error) {
      console.error("UPDATE CLIENT ERROR:", error);

      setError("Не удалось изменить клиента");

    } finally {
      setUpdating(false);
    }
  };


  // Удаление клиента
  const handleDeleteClient = async (
    clientId: number
  ) => {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить этого клиента?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(clientId);
    setError("");

    try {
      await deleteClient(clientId);

      setClients((currentClients) =>
        currentClients.filter(
          (client) => client.id !== clientId
        )
      );

    } catch (error) {
      console.error("DELETE CLIENT ERROR:", error);

      setError("Не удалось удалить клиента");

    } finally {
      setDeletingId(null);
    }
  };


  // Выход
  const handleLogout = () => {
    localStorage.removeItem("access_token");

    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-bold text-blue-600">
            AnnCRM
          </h1>

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Выйти
          </button>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Page heading */}

        <div className="mb-8 flex items-end justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Клиенты
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Управление клиентами
            </p>

          </div>


          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setEditingClient(null);
              setError("");
            }}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            {showForm
              ? "Отмена"
              : "+ Добавить клиента"}
          </button>

        </div>


        {/* Create form */}

        {showForm && (

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5">

              <h3 className="text-lg font-semibold text-gray-900">
                Новый клиент
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Заполните данные клиента
              </p>

            </div>


            <form
              onSubmit={handleCreateClient}
              className="grid gap-4 md:grid-cols-3"
            >

              <div>

                <label
                  htmlFor="client-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Имя
                </label>

                <input
                  id="client-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Иван Иванов"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div>

                <label
                  htmlFor="client-phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Телефон
                </label>

                <input
                  id="client-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+7 999 123-45-67"
                  autoComplete="tel"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div>

                <label
                  htmlFor="client-email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="client-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="ivan@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div className="flex justify-end gap-3 md:col-span-3">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? "Добавление..."
                    : "Добавить клиента"}
                </button>

              </div>

            </form>

          </div>

        )}


        {/* Edit form */}

        {editingClient && (

          <div className="mb-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">

            <div className="mb-5">

              <h3 className="text-lg font-semibold text-gray-900">
                Редактирование клиента
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Измените необходимые данные
              </p>

            </div>


            <form
              onSubmit={handleUpdateClient}
              className="grid gap-4 md:grid-cols-3"
            >

              <div>

                <label
                  htmlFor="edit-client-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Имя
                </label>

                <input
                  id="edit-client-name"
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div>

                <label
                  htmlFor="edit-client-phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Телефон
                </label>

                <input
                  id="edit-client-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(event) =>
                    setEditPhone(event.target.value)
                  }
                  autoComplete="tel"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div>

                <label
                  htmlFor="edit-client-email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="edit-client-email"
                  type="email"
                  value={editEmail}
                  onChange={(event) =>
                    setEditEmail(event.target.value)
                  }
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div className="flex justify-end gap-3 md:col-span-3">

                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating
                    ? "Сохранение..."
                    : "Сохранить"}
                </button>

              </div>

            </form>

          </div>

        )}


        {/* Error */}

        {error && (

          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>

        )}


        {/* Loading */}

        {loading && (

          <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">

            <p className="text-sm text-gray-500">
              Загрузка клиентов...
            </p>

          </div>

        )}


        {/* Clients table */}

        {!loading && (

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 px-6 py-4">

              <p className="text-sm font-medium text-gray-900">
                Список клиентов
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Всего клиентов: {clients.length}
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Имя
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Телефон
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Действия
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {clients.map((client) => (

                    <tr
                      key={client.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {client.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {client.phone}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {client.email || "—"}
                      </td>

                      <td className="px-6 py-4 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEditClick(client)
                            }
                            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Изменить
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteClient(client.id)
                            }
                            disabled={
                              deletingId === client.id
                            }
                            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === client.id
                              ? "Удаление..."
                              : "Удалить"}
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}


                  {clients.length === 0 && (

                    <tr>

                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center"
                      >

                        <p className="text-sm font-medium text-gray-900">
                          Клиентов пока нет
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Добавьте первого клиента, чтобы начать работу
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}


export default Clients;