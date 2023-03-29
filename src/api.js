import { BASE_URL } from './consts/const';

export async function getPeople(page, count) {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}&count=${count}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return `${error.message}`;
  }
}

export async function getToken() {
  try {
    const response = await fetch(`${BASE_URL}/token`);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return `${error.message}`;
  }
}

export async function signUpUser(formData, token) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Token': `${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
}

export async function getPositions() {
  try {
    const response = await fetch(`${BASE_URL}/positions`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return `${error.message}`;
  }
}
