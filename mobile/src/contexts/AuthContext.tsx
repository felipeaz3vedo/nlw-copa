import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextProps {
  user: UserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "769863940767-u965j96mt6u2icj634vj3435k30nqvfh.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"]
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signInWithGoogle = (acces_token: string) => {
    console.log("TOKEN DE AUTENTICAÇÃO ===>", acces_token);
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isUserLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
