"use client";

import { Darker_Grotesque, Courgette } from "next/font/google";
import dayjs from "dayjs";
import { useState } from "react";

const verseFont = Courgette({ subsets: ["latin"], weight: "400" });

const referenceFont = Darker_Grotesque({ subsets: ["latin"] });

const verses = [
  {
    text: "Não temas, porque eu sou contigo;\nnão te assombres, porque eu sou o teu Deus;\neu te fortaleço, e te ajudo,\ne te sustento com a minha destra fiel.",
    ref: "Isaías 41:10",
  },
  {
    text: "Deixo-vos a paz, a minha paz vos dou; eu não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    ref: "João 14:27",
  },
  {
    text: "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome. Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    ref: "Salmo 23:1-4",
  },
  {
    text: "Vinde a mim, todos os que estai cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração, e encontrareis descanso para as vossas almas. Porque o meu jugo é suave, e o meu fardo é leve.",
    ref: "Mateus 11:28-30",
  },
  {
    text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia. Portanto, não temeremos, ainda que a terra se mude, e ainda que os montes se transportem para o meio dos mares.",
    ref: "Salmo 46:1-2",
  },
  {
    text: "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, o Pai das misericórdias e o Deus de toda a consolação; Que nos consola em toda a nossa tribulação, para que também possamos consolar os que estiverem em alguma tribulação, com a consolação com que nós mesmos somos consolados por Deus.",
    ref: "2 Coríntios 1:3-4",
  },
  {
    text: "Os justos clamam, e o Senhor os ouve, e os livra de todas as suas angústias. Perto está o Senhor dos que têm o coração quebrantado, e salva os contritos de espírito.",
    ref: "Salmos 34:17-18",
  },
  {
    text: "mas, como está escrito: Nem olhos viram, nem ouvidos ouviram, nem jamais penetrou em coração humano o que Deus tem preparado para aqueles que o amam.",
    ref: "1Coríntios 2:9 ARA"
  }
];

function NavigationButton({
  prev,
  next,
  onClick,
}: { onClick: () => void } & (
  | {
      prev: true;
      next?: undefined;
    }
  | {
      prev?: undefined;
      next: true;
    }
)) {
  const arrow = (
    <span
      className={`inline-block transition-transform group-hover:${
        prev ? "-" : ""
      }translate-x-1 motion-reduce:transform-none`}
    >
      {prev ? "<-" : "->"}
    </span>
  );

  return (
    <a
      href="#"
      className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 text-gray-500 hover:text-black"
      // target="_blank"
      // rel="noopener noreferrer"
      onClick={onClick}
    >
      <h2 className={`text-1xl sm:text-2xl font-light`}>
        {prev && arrow} {prev ? "anterior" : "próximo"} {next && arrow}
      </h2>
    </a>
  );
}

export default function Home() {
  const initialDate = dayjs("2023-07-28");
  const today = dayjs();

  const diffInDays = today.diff(initialDate, "days");

  const current = diffInDays % verses.length;

  const [currentIndex, setCurrentIndex] = useState(current);

  const onPrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(verses.length - 1);
      return;
    }

    setCurrentIndex(currentIndex - 1);
    return;
  };

  const onNext = () => {
    if (currentIndex === verses.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    return;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <div className="text-center container">
        <p
          className={`${verseFont.className} text-3xl/snug md:text-5xl/snug mb-9`}
        >
          &ldquo;
          {true
            ? verses[currentIndex].text
            : verses[currentIndex].text
                .split("\n")
                .map((line, index, lines) => (
                  <>
                    {line}
                    {index !== lines.length - 1 && <br />}
                  </>
                ))}
          &rdquo;
        </p>

        <small
          className={`${referenceFont.className} text-3xl/snug md:text-5xl`}
        >
          {verses[currentIndex].ref}
        </small>

        <div className="flex flex-row justify-between mt-12">
          <NavigationButton prev onClick={onPrevious} />

          <NavigationButton next onClick={onNext} />
        </div>
      </div>
    </main>
  );
}
