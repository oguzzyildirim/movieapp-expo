import axios from "axios";

export async function GetAllUsers(): Promise<types.user.UserData[]> {
    // aslında şöyle olmalı
    // <> -> bunun içi generic olacak
    // request func'ı requestHelpers.ts'den gelecek
    // '/users' -> bu param olarak func'a verilecek
    // optional bir param daha olacak ve adı qApi olacak. aApi bir obje olacak, filtre, sort, pagination için limitOffSet vb field'lar alacak.
    //return resp = await request<types.user.UserData[]>('/users')
  const resp = await axios.get(`/user`);
  if (resp.status !== 200) {
    throw new Error("Failed to fetch users");
  }
  return resp.data;
}