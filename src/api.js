import { BASE_URL } from './consts/const';

export async function getPeople(page = 1, count = 6) {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}&count=${count}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return `${error.message}`;
  }
}

