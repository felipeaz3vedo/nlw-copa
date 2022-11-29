import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { Center, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";

export const SignIn = () => {
  const { signIn, user } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        title="entrar com o google"
        leftIcon={<Icon as={AntDesign} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}do seu e-mail para criação
        da sua conta.
      </Text>
    </Center>
  );
};
