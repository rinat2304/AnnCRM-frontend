import api from "../api/axios";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  console.log("1. LOGIN FUNCTION CALLED", data);

  const formData = new URLSearchParams();

  formData.append("username", data.username);
  formData.append("password", data.password);

  console.log("2. FORMDATA CREATED");

  try {
    console.log("3. SENDING REQUEST");

    const response = await api.post<LoginResponse>(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("4. LOGIN RESPONSE", response.data);

    return response.data;

  } catch (error) {
    console.error("5. LOGIN ERROR", error);

    throw error;
  }
};