import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export const New = () => {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          fontSize="xl"
          color="white"
          my={8}
          textAlign="center"
        >
          Crie o seu próprio bolão da copa{"\n"} e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder="Qual o nome do seu bolão" />

        <Button title="criar meu bolão" />

        <Text fontSize="sm" color="gray.200" textAlign="center" px={10} mt={4}>
          Após criar o seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
};
