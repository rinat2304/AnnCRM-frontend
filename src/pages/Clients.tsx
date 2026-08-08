import { useEffect, useState } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  type Client,
} from "../services/clientService";


function Clients() {
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
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [updating, setUpdating] = useState(false);

  // Удаление
  const [deletingId, setDeletingId] = useState<number | null>(null);


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
    event: React.FormEvent<HTMLFormElement>
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
    event: React.FormEvent<HTMLFormElement>
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
  const handleDeleteClient = async (clientId: number) => {
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


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-semibold text-gray-900">
            CRM System
          </h1>

          <button
            type="button"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Выйти
          </button>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* Заголовок */}

        <div className="mb-6 flex items-center justify-between">

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
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {showForm
              ? "Отмена"
              : "+ Добавить клиента"}
          </button>

        </div>


        {/* Форма создания */}

        {showForm && (

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Новый клиент
            </h3>


            <form
              onSubmit={handleCreateClient}
              className="space-y-4"
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
                  placeholder="Введите имя"
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
                  placeholder="client@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? "Добавление..."
                    : "Добавить клиента"}
                </button>

              </div>

            </form>

          </div>

        )}


        {/* Форма редактирования */}

        {editingClient && (

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Редактирование клиента
            </h3>


            <form
              onSubmit={handleUpdateClient}
              className="space-y-4"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
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


        {/* Ошибка */}

        {error && (

          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>

        )}


        {/* Загрузка */}

        {loading && (

          <p className="text-sm text-gray-500">
            Загрузка клиентов...
          </p>

        )}


        {/* Таблица */}

        {!loading && (

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <table className="w-full">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Имя
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Телефон
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">
                    Действия
                  </th>

                </tr>

              </thead>


              <tbody>

                {clients.map((client) => (

                  <tr
                    key={client.id}
                    className="border-b border-gray-100"
                  >

                    <td className="px-6 py-4 text-sm text-gray-900">
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
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
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
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Клиентов пока нет
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>
  );
}


export default Clients;