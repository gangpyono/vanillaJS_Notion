export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: { "x-username": "gangpyono", "Content-type": "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }

    throw Error("API호출 에러발생");
  } catch (err) {
    console.log(err);
  }
};
