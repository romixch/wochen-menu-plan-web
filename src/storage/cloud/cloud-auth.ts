import { BASE_URL } from "./cloud-conf";
import { logAction } from "./cloud-log";

interface User {
  mail: string;
  sharingAllowed: boolean;
  isSpecial: boolean;
}

const getId = async (): Promise<string> => {
  const storedId = localStorage.getItem("id");
  if (storedId == null) {
    var newId = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      newId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    localStorage.setItem("id", newId);
    return newId;
  } else {
    return storedId;
  }
};
const getAccountEmail = async () => {
  return localStorage.getItem("accountEmail");
};

const setAccountEmail = async (email: string) => {
  localStorage.setItem("accountEmail", email);
};

const getAccessToken = async () => {
  return localStorage.getItem("accessToken");
};

const setAccessToken = async (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

const registerAccount = async () => {
  const email = await getAccountEmail();
  await fetch(`${BASE_URL}register/${email}`, { method: "POST" });
  const loginState: LoginState = "waiting for onetime token";
  localStorage.setItem(LoginStateKey, loginState);
  console.log("register account finished");
};

const requestAccessToken = async (oneTimeToken: string): Promise<boolean> => {
  const email = await getAccountEmail();
  try {
    const accessTokenResponse = await fetch(
      `${BASE_URL}register/${email}/${oneTimeToken}`,
      { method: "GET" }
    );
    const accessToken = await accessTokenResponse.text();
    if (accessTokenResponse.status === 200) {
      await setAccessToken(accessToken);
      const newLoginState: LoginState = "logged in";
      localStorage.setItem(LoginStateKey, newLoginState);
      return true;
    } else {
      logout();
      return false;
    }
  } catch (e) {
    logout();
    return false;
  }
};

const loginByShareData = async (data: {
  email: string;
  accessToken: string;
}): Promise<boolean> => {
  await fireOnLoginListener(await getAccountEmail(), data.email);
  await setAccountEmail(data.email);
  await setAccessToken(data.accessToken);
  const user = await getUserInfo();
  if (user) {
    const newLoginState: LoginState = "logged in";
    logAction("Login_with_qrcode");
    localStorage.setItem(LoginStateKey, newLoginState);
    return true;
  } else {
    logout();
    return false;
  }
};

const getLoginState = async (): Promise<LoginState> => {
  const loginStateValue = localStorage.getItem(LoginStateKey);
  const loginStateValueMigrated =
    loginStateValue === null ? await migrateLoginState() : loginStateValue;
  const loginState: LoginState = loginStateValueMigrated as LoginState;
  return loginState;
};

const migrateLoginState = async (): Promise<LoginState> => {
  const accessToken = await getAccessToken();
  const newLoginState: LoginState = accessToken ? "logged in" : "not logged in";
  localStorage.setItem(LoginStateKey, newLoginState);
  return newLoginState;
};

export const getShareData = async (): Promise<string> => {
  return JSON.stringify({
    email: await getAccountEmail(),
    accessToken: await getAccessToken(),
  });
};

const logout = async () => {
  localStorage.removeItem("accountEmail");
  localStorage.removeItem("accessToken");
  const newLoginState: LoginState = "not logged in";
  localStorage.setItem(LoginStateKey, newLoginState);
};

const onLoginListeners: ((
  previousLoginEmail: string | null,
  nextLoginEmail: string | null
) => Promise<void>)[] = [];
const addOnLoginListener = (
  handler: (
    previousLoginEmail: string | null,
    nextLoginEmail: string | null
  ) => Promise<void>
) => {
  onLoginListeners.push(handler);
};
const fireOnLoginListener = async (
  previousLoginEmail: string | null,
  nextLoginEmail: string | null
) => {
  const promises = onLoginListeners.map(
    async (listener) => await listener(previousLoginEmail, nextLoginEmail)
  );
  return await Promise.all(promises);
};

const getUserInfo = async (): Promise<User | undefined> => {
  const email = await getAccountEmail();
  const accessToken = await getAccessToken();
  if (email && accessToken) {
    const userResponse = await fetch(`${BASE_URL}user/${email}`, {
      headers: { accessToken: accessToken, "Content-Type": "application/json" },
    });
    if (userResponse.ok) {
      const user: User = await userResponse.json();
      user.isSpecial =
        user.mail === "melissa.schaller@bluewin.ch" ||
        user.mail === "roman.schaller@gmail.com";
      return user;
    }
  }
};

const LoginStateKey = "LoginState";
type LoginState = "logged in" | "not logged in" | "waiting for onetime token";

export {
  getId,
  getAccountEmail,
  setAccountEmail,
  getLoginState,
  getAccessToken,
  registerAccount,
  requestAccessToken,
  loginByShareData,
  addOnLoginListener,
  logout,
  getUserInfo,
};
