import { Locales } from "@/infraestructure/interfaces";
import Image from "next/image";
import { useMemo } from "react";

const stats = [
  { name: { es: "Energía", en: "Energy" }, score: 5, emoji: "⚡" },
  { name: { es: "Creatividad", en: "Creativity" }, score: 5, emoji: "🎨" },

  { name: { es: "Velocidad", en: "Speed" }, score: 4, emoji: "🚀" },
  { name: { es: "Precisión", en: "Precision" }, score: 5, emoji: "🎯" },
  { name: { es: "Eficiencia", en: "Efficiency" }, score: 4, emoji: "⏳" },
  { name: { es: "Depuración", en: "Debugging" }, score: 3, emoji: "🕵️" },
  { name: { es: "Colaboración", en: "Collaboration" }, score: 4, emoji: "🤝" },
  { name: { es: "Resiliencia", en: "Resilience" }, score: 4, emoji: "🔥" },
  { name: { es: "Innovación", en: "Innovation" }, score: 5, emoji: "💡" },
  { name: { es: "Ejecución", en: "Execution" }, score: 5, emoji: "✅" },
  { name: { es: "Escalabilidad", en: "Scalability" }, score: 2, emoji: "📈" },
];

type Props = {
  aboutSection: any;
  locale: Locales;
};

const StatsCardTwo = ({ aboutSection, locale }: Props) => {
  let { titles, texts } = aboutSection.stats;

  // Generate different animation properties for each stat dot
  const getAnimationProps = (statIndex: number, dotIndex: number) => {
    // Create deterministic but varied animation properties
    const seed = statIndex * 10 + dotIndex;

    // Duration between 1.5s and 2.5s
    const duration = 1.5 + (seed % 11) / 10;

    // Delay between 3s and 15s (long recharge times)
    const delay = 3 + (seed % 13) * 0.9;

    // Different animation names based on position
    const animation =
      seed % 3 === 0
        ? "pulse-expand"
        : seed % 3 === 1
        ? "pulse-contract"
        : "pulse-both";

    return `${animation} ${duration}s ease-in-out ${delay}s infinite`;
  };

  return (
    <div className="mt-10 md:mt-0 flex flex-col items-end md:flex-row-reverse text-gray-800 dark:text-white rounded-xl  overflow-hidden">
      <style jsx global>{`
        @keyframes pulse-expand {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes pulse-contract {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.9);
          }
        }

        @keyframes pulse-both {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.12);
          }
          60% {
            transform: scale(0.94);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      <div
        className="relative w-full md:h-auto mx-auto rounded-xl max-w-md bg:white"
        style={{
          height: "calc(14rem + 30vw)",
          maxHeight: "100%",
        }}>
        <Image
          src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1740863854/Adobe_Express_-_file_hiawno.png"
          alt="Profile Picture"
          layout="fill"
          objectFit="cover"
          className="md:rounded-r-xl md:rounded-none rounded-b-xl md:object-cover object-[center_bottom]"
        />
      </div>
      <div className="flex flex-col justify-between  w-full h-full mx-auto p-6 bg-gray-800 dark:bg-slate-950 text-white rounded-l-lg">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <h2 className="text-3xl font-bold ">DEV STATS</h2>
            <h2 className="text-3xl font-bold ">✷</h2>
          </div>
          <div className="space-y-2 h-full">
            {stats.map((stat, statIndex) => {
              return (
                <div
                  key={statIndex}
                  className="flex justify-between items-center">
                  <div className="flex flex-row items-center gap-2">
                    <p
                      className={`text-lg font-bold ${
                        stat.score <= 2
                          ? "text-red-600"
                          : stat.score === 3
                          ? "text-yellow-300"
                          : stat.score === 4
                          ? "text-green-600"
                          : "text-emerald-400"
                      }`}>
                      {stat.score}/5
                    </p>
                    <span className="text-lg flex items-center">
                      {stat.emoji}
                    </span>
                    <span className="text-md flex items-center font-medium">
                      {stat.name[locale]}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`
                        w-3 h-3 rounded-sm
                        ${
                          dotIndex < stat.score
                            ? "bg-gradient-to-br from-green-300 to-emerald-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                            : "bg-gray-700/50"
                        }
                      `}
                        style={{
                          animation:
                            dotIndex < stat.score
                              ? getAnimationProps(statIndex, dotIndex)
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 mt-6">
          <h2 className="text-3xl font-bold">✷</h2>
          <h2 className="text-3xl font-bold">DEV STATS</h2>
        </div>
        {/* <h2 className="text-2xl font-bold mt-6">✷</h2> */}
      </div>
    </div>
  );
};

export default StatsCardTwo;
