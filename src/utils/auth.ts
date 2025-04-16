export const parseAccessToken = (token: string): { id: number } | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: Number(payload.id) };
  } catch (error) {
    console.error('accessToken 파싱 실패', error);
    return null;
  }
};
