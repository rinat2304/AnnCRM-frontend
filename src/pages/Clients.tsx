function Clients() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">
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

      <main className="mx-auto max-w-6xl px-6 py-8">
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
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Добавить клиента
          </button>
        </div>

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
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">
                  Иван Иванов
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  +7 999 123-45-67
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  ivan@example.com
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Изменить
                    </button>

                    <button
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Петр Петров
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  +7 999 987-65-43
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  petr@example.com
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Изменить
                    </button>

                    <button
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Clients