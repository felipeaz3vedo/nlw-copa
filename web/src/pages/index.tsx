import Image from "next/image";
import HeroImage from "../assets/app-hero.png";
import LogoImage from "../assets/logo.svg";
import UsersAvatarsExampleImage from "../assets/avatars.png";
import CheckIconImage from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  pollCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ pollCount, guessCount, userCount }: HomeProps) {
  const [pollTitle, setPollTitle] = useState("");

  const createPoll = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post("/polls", {
        title: pollTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso, o código do bolão foi copiado para a área de transferência!"
      );

      setPollTitle("");
    } catch (err) {
      alert("Falha ao criar o bolão, tente novamente!");
    }
  };

  return (
    <div className="mx-auto grid h-screen max-w-[1124px] grid-cols-2 items-center gap-28">
      <main>
        <Image src={LogoImage} alt="Logomarca NLW Copa" />

        <h1 className="mt-14 text-5xl font-bold leading-tight text-white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={UsersAvatarsExampleImage} alt="" />
          <strong className="text-xl text-primaryGrayVeryLight">
            <span className="text-primaryGreen">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2">
          <input
            className="flex-1 rounded border border-secondaryGrayNormal bg-secondaryGrayDark px-6 py-4 text-sm text-primaryGrayVeryLight"
            type="text"
            required
            placeholder="Qual o nome do seu bolão"
            onChange={event => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button
            className="rounded bg-primaryYellow px-6 py-4 text-sm font-bold uppercase text-primaryGrayDark hover:bg-primaryYellowDark"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-sm leading-relaxed text-primaryGrayNormal">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 flex items-center justify-between border-t border-secondaryGrayNormal pt-10 text-primaryGrayVeryLight">
          <div className="flex items-center gap-6">
            <Image src={CheckIconImage} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="h-14 w-px bg-secondaryGrayNormal" />

          <div className="flex items-center gap-6">
            <Image src={CheckIconImage} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={HeroImage}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW copa"
        quality={100}
        priority
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("polls/count"),
      api.get("guesses/count"),
      api.get("users/count")
    ]);

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  };
};
