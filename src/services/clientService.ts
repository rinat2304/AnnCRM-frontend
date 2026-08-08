import api from "../api/axios";

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

export interface ClientCreate {
  name: string;
  phone: string;
  email?: string | null;
}

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>("/clients");

  return response.data;
};

export const createClient = async (
  data: ClientCreate
): Promise<Client> => {
  const response = await api.post<Client>(
    "/clients",
    data
  );

  return response.data;
};

export const updateClient = async (
  clientId: number,
  data: ClientCreate
): Promise<Client> => {
  const response = await api.put<Client>(
    `/clients/${clientId}`,
    data
  );

  return response.data;
};

export const deleteClient = async (
  clientId: number
): Promise<void> => {
  await api.delete(`/clients/${clientId}`);
};