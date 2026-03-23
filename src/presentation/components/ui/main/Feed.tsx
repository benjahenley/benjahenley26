"use client";

import { useState } from "react";
import { Locales } from "@/infraestructure/interfaces";
import Tweet, { TweetCommentType } from "../../shared/ui/cards/Tweet";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
  const [activeTweetId, setActiveTweetId] = useState<string | null>(null);

  const profilePic =
    "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1739881508/portfolio-24/me/benja_y8dlen.jpg";

  const t = (en: string, es: string) => (locale === "en" ? en : es);

  const tweetReplies: Record<string, TweetCommentType[]> = {
    "14": [
      {
        id: "c14-1",
        content: t(
          "Can't wait to see the final result! Your portfolio keeps getting better.",
          "No puedo esperar a ver el resultado final! Tu portfolio sigue mejorando."
        ),
        createdAt: new Date("2026-03-20T10:00:00Z").toISOString(),
        username: "Emma Wilson",
        userHandle: "@emmaw",
        userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
    "15": [
      {
        id: "c15-1",
        content: t(
          "Zustand is so clean compared to Redux. Great switch!",
          "Zustand es mucho más limpio comparado con Redux. Gran cambio!"
        ),
        createdAt: new Date("2026-02-05T14:00:00Z").toISOString(),
        username: "Kevin Martinez",
        userHandle: "@kevinm",
        userAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
      },
    ],
    "16": [
      {
        id: "c16-1",
        content: t(
          "Turbopack is insanely fast. The future of bundling for sure.",
          "Turbopack es increíblemente rápido. El futuro del bundling sin dudas."
        ),
        createdAt: new Date("2025-12-18T11:00:00Z").toISOString(),
        username: "Alex Johnson",
        userHandle: "@alexdev",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    "17": [
      {
        id: "c17-1",
        content: t(
          "Framer Motion makes everything feel premium. Good choice!",
          "Framer Motion hace que todo se sienta premium. Buena elección!"
        ),
        createdAt: new Date("2025-10-22T09:00:00Z").toISOString(),
        username: "Sarah Miller",
        userHandle: "@sarahcodes",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ],
    "18": [
      {
        id: "c18-1",
        content: t(
          "Prisma + PostgreSQL is a killer combo. What ORM were you using before?",
          "Prisma + PostgreSQL es un combo letal. Qué ORM usabas antes?"
        ),
        createdAt: new Date("2025-08-10T16:00:00Z").toISOString(),
        username: "Marcus Chen",
        userHandle: "@marcusdesign",
        userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
    ],
    "19": [
      {
        id: "c19-1",
        content: t(
          "Claude Code is next level. I use it daily now.",
          "Claude Code es de otro nivel. Lo uso todos los días ahora."
        ),
        createdAt: new Date("2025-06-14T13:00:00Z").toISOString(),
        username: "Lisa Wong",
        userHandle: "@lisawong",
        userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
    ],
    "20": [
      {
        id: "c20-1",
        content: t(
          "ADN Producciones site looks incredible. Clean work!",
          "El sitio de ADN Producciones se ve increíble. Laburo limpio!"
        ),
        createdAt: new Date("2025-05-03T10:00:00Z").toISOString(),
        username: "Ryan Thompson",
        userHandle: "@ryandev",
        userAvatar: "https://randomuser.me/api/portraits/men/85.jpg",
      },
    ],
    "1": [
      {
        id: "c1-1",
        content: t(
          "Love the mobile improvements! What responsive framework did you use?",
          "Me encantan las mejoras mobile! Qué framework responsive usaste?"
        ),
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        username: "Alex Johnson",
        userHandle: "@alexdev",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "c1-2",
        content: t(
          "This looks fantastic! Would love to know more about your design process.",
          "Se ve genial! Me encantaría saber más sobre tu proceso de diseño."
        ),
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        username: "Sarah Miller",
        userHandle: "@sarahcodes",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "c1-3",
        content: t(
          "Great work! How long did it take you to implement these features?",
          "Gran trabajo! Cuánto te llevó implementar estas funcionalidades?"
        ),
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        username: "Ryan Thompson",
        userHandle: "@ryandev",
        userAvatar: "https://randomuser.me/api/portraits/men/85.jpg",
      },
    ],
    "2": [
      {
        id: "c2-1",
        content: t(
          "The animation is so smooth! Have you tried using GSAP as well?",
          "Las animaciones son super fluidas! Probaste usar GSAP también?"
        ),
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        username: "Emma Wilson",
        userHandle: "@emmaw",
        userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: "c2-2",
        content: t(
          "Love the parallax effect! How does it perform on mobile?",
          "Me encanta el efecto parallax! Cómo rinde en mobile?"
        ),
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        username: "Marcus Chen",
        userHandle: "@marcusdesign",
        userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
    ],
    "3": [
      {
        id: "c3-1",
        content: t(
          "AI integration will definitely be huge. Learning LLM prompting now!",
          "La integración con IA va a ser enorme. Estoy aprendiendo prompting de LLMs!"
        ),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Jennifer Lee",
        userHandle: "@jenniferlee",
        userAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        id: "c3-2",
        content: t(
          "WebAssembly and edge computing seem promising for high-performance web apps.",
          "WebAssembly y edge computing parecen prometedores para apps web de alto rendimiento."
        ),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        username: "David Kumar",
        userHandle: "@davidkumar",
        userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
    ],
    "4": [
      {
        id: "c4-1",
        content: t(
          "Pragmatic Programmer changed my approach to software development completely.",
          "The Pragmatic Programmer cambió mi enfoque del desarrollo de software por completo."
        ),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Michael Scott",
        userHandle: "@michaelscott",
        userAvatar: "https://randomuser.me/api/portraits/men/40.jpg",
      },
      {
        id: "c4-2",
        content: t(
          "Design Patterns by GoF is a classic! Still relevant after all these years.",
          "Design Patterns de GoF es un clásico! Sigue siendo relevante después de tantos años."
        ),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Lisa Wong",
        userHandle: "@lisawong",
        userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
    ],
    "5": [
      {
        id: "c5-1",
        content: t(
          "Tailwind + Next.js is the best combo right now, no doubt.",
          "Tailwind + Next.js es el mejor combo ahora mismo, sin dudas."
        ),
        createdAt: new Date("2024-12-20T10:00:00Z").toISOString(),
        username: "Kevin Martinez",
        userHandle: "@kevinm",
        userAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
      },
    ],
    "6": [
      {
        id: "c6-1",
        content: t(
          "Firebase is so underrated for quick MVPs. Great choice!",
          "Firebase está muy subestimado para MVPs rápidos. Gran elección!"
        ),
        createdAt: new Date("2024-11-02T14:30:00Z").toISOString(),
        username: "Olivia Parker",
        userHandle: "@oliviatech",
        userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      },
    ],
    "7": [
      {
        id: "c7-1",
        content: t(
          "Docker changed my life too. No more 'it works on my machine' excuses!",
          "Docker me cambió la vida también. No más excusas de 'en mi máquina funciona'!"
        ),
        createdAt: new Date("2024-09-18T12:00:00Z").toISOString(),
        username: "Nathan Ford",
        userHandle: "@nathanf",
        userAvatar: "https://randomuser.me/api/portraits/men/59.jpg",
      },
    ],
    "8": [
      {
        id: "c8-1",
        content: t(
          "Server components are a game changer for performance!",
          "Los server components son un game changer para el rendimiento!"
        ),
        createdAt: new Date("2024-07-22T09:15:00Z").toISOString(),
        username: "Samantha Jones",
        userHandle: "@samjones",
        userAvatar: "https://randomuser.me/api/portraits/women/89.jpg",
      },
    ],
    "9": [
      {
        id: "c9-1",
        content: t(
          "Just tried out GeminiAI too, it's insane how fast it is!",
          "Acabo de probar GeminiAI también, es increíble lo rápido que es!"
        ),
        createdAt: new Date("2024-05-12T14:30:00Z").toISOString(),
        username: "Emma Wilson",
        userHandle: "@emmaw",
        userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
    "10": [
      {
        id: "c10-1",
        content: t(
          "TypeScript + strict mode is the way to go. Never going back!",
          "TypeScript + strict mode es el camino. No vuelvo más atrás!"
        ),
        createdAt: new Date("2024-04-29T09:15:00Z").toISOString(),
        username: "Marcus Chen",
        userHandle: "@marcusdesign",
        userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
    ],
    "11": [
      {
        id: "c11-1",
        content: t(
          "React 19 is out! The new features make building UIs even smoother.",
          "React 19 salió! Las nuevas features hacen que construir UIs sea aún más fluido."
        ),
        createdAt: new Date("2024-03-16T18:45:00Z").toISOString(),
        username: "Alex Johnson",
        userHandle: "@alexdev",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    "12": [
      {
        id: "c12-1",
        content: t(
          "Next.js API routes are amazing for small backends!",
          "Las API routes de Next.js son increíbles para backends chicos!"
        ),
        createdAt: new Date("2024-02-21T11:00:00Z").toISOString(),
        username: "Lisa Wong",
        userHandle: "@lisawong",
        userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
    ],
    "13": [
      {
        id: "c13-1",
        content: t(
          "Claude is my go-to AI tool for coding. Highly recommend!",
          "Claude es mi herramienta de IA favorita para programar. Lo recomiendo!"
        ),
        createdAt: new Date("2024-01-13T16:20:00Z").toISOString(),
        username: "David Kumar",
        userHandle: "@davidkumar",
        userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
    ],
  };

  const tweets = [
    // Mar 2026
    {
      id: "14",
      content: t(
        "Redesigning my portfolio from scratch again. Every year I look back and think 'I can do better'. That's the best sign of growth as a developer. Stay hungry. #webdev #portfolio #growth",
        "Rediseñando mi portfolio desde cero otra vez. Cada año miro para atrás y pienso 'puedo hacerlo mejor'. Esa es la mejor señal de crecimiento como desarrollador. Mantenete hambriento. #webdev #portfolio #growth"
      ),
      createdAt: new Date("2026-03-18T11:00:00Z").toISOString(),
      likes: 118,
      comments: tweetReplies["14"].length,
      reposts: 31,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["14"],
    },

    // Feb 2026
    {
      id: "15",
      content: (
        <div>
          <p>
            {t(
              "Hot take: Zustand > Redux for 90% of React projects. Less boilerplate, simpler mental model, and the devtools are great now. Fight me.",
              "Hot take: Zustand > Redux para el 90% de los proyectos React. Menos boilerplate, modelo mental más simple, y las devtools están geniales ahora. Vengan de a uno."
            )}
          </p>
          <br />
          <p className="font-bold">#React #Zustand #stateManagement</p>
        </div>
      ),
      createdAt: new Date("2026-02-03T15:30:00Z").toISOString(),
      likes: 156,
      comments: tweetReplies["15"].length,
      reposts: 42,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["15"],
    },

    // Dec 2025
    {
      id: "16",
      content: t(
        "Just migrated a project from Webpack to Turbopack and the build times went from 45s to 3s. Not exaggerating. The tooling ecosystem in 2025 is unreal. #nextjs #turbopack #dx",
        "Acabo de migrar un proyecto de Webpack a Turbopack y los tiempos de build pasaron de 45s a 3s. No exagero. El ecosistema de herramientas en 2025 es irreal. #nextjs #turbopack #dx"
      ),
      createdAt: new Date("2025-12-15T12:00:00Z").toISOString(),
      likes: 203,
      comments: tweetReplies["16"].length,
      reposts: 58,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      isLiked: true,
      locale,
      tweetComments: tweetReplies["16"],
    },

    // Oct 2025
    {
      id: "17",
      content: (
        <div>
          <p>
            {t(
              "Spent the weekend adding Framer Motion animations to everything. My girlfriend says the site looks the same. Developers will understand the pain.",
              "Pasé el finde agregando animaciones con Framer Motion a todo. Mi novia dice que el sitio se ve igual. Los desarrolladores van a entender el dolor."
            )}
          </p>
          <br />
          <p className="font-bold">#framerMotion #animations #devLife</p>
        </div>
      ),
      createdAt: new Date("2025-10-20T18:00:00Z").toISOString(),
      likes: 247,
      comments: tweetReplies["17"].length,
      reposts: 73,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["17"],
    },

    // Aug 2025
    {
      id: "18",
      content: t(
        "Switched from MongoDB to PostgreSQL + Prisma for my latest backend and I'm never going back. Relational data with type-safe queries is just *chef's kiss*. #prisma #postgresql #backend",
        "Cambié de MongoDB a PostgreSQL + Prisma para mi último backend y no vuelvo más. Datos relacionales con queries type-safe es simplemente *chef's kiss*. #prisma #postgresql #backend"
      ),
      createdAt: new Date("2025-08-08T14:00:00Z").toISOString(),
      likes: 89,
      comments: tweetReplies["18"].length,
      reposts: 15,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["18"],
    },

    // Jun 2025
    {
      id: "19",
      content: (
        <div>
          <p>
            {t(
              "Been using Claude Code for the past month and my productivity has doubled. AI-assisted development is not replacing us — it's making us 10x. The key is knowing what to ask and when to take control.",
              "Estuve usando Claude Code el último mes y mi productividad se duplicó. El desarrollo asistido por IA no nos reemplaza — nos hace 10x. La clave es saber qué preguntar y cuándo tomar el control."
            )}
          </p>
          <br />
          <p className="font-bold">#AI #claudeCode #productivity</p>
        </div>
      ),
      createdAt: new Date("2025-06-12T10:00:00Z").toISOString(),
      likes: 134,
      comments: tweetReplies["19"].length,
      reposts: 28,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      isLiked: true,
      locale,
      tweetComments: tweetReplies["19"],
    },

    // May 2025
    {
      id: "20",
      content: t(
        "Just shipped the ADN Producciones website! An audiovisual production company with a sleek dark design. The client loved the final result — there's no better feeling than delivering something you're proud of. #freelance #webdev #nextjs",
        "Acabo de lanzar el sitio de ADN Producciones! Una productora audiovisual con un diseño oscuro elegante. Al cliente le encantó el resultado final — no hay mejor sensación que entregar algo de lo que estás orgulloso. #freelance #webdev #nextjs"
      ),
      createdAt: new Date("2025-05-02T12:00:00Z").toISOString(),
      likes: 96,
      comments: tweetReplies["20"].length,
      reposts: 22,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["20"],
    },

    // Mar 2025
    {
      id: "1",
      content: t(
        "Just deployed a new feature in my latest project! The responsive design adapts beautifully from mobile to desktop. Proud of the CSS Grid implementation! #webdev #react #responsive",
        "Acabo de deployar una nueva feature en mi último proyecto! El diseño responsive se adapta perfecto de mobile a desktop. Orgulloso de la implementación con CSS Grid! #webdev #react #responsive"
      ),
      createdAt: new Date("2025-03-10T14:00:00Z").toISOString(),
      likes: 42,
      comments: tweetReplies["1"].length,
      reposts: 5,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      isLiked: true,
      locale,
      tweetComments: tweetReplies["1"],
    },

    // Jan 2025
    {
      id: "2",
      content: t(
        "We're on the third sprint of the Kia website! The current progress is fantastic, hoping for a great final project.",
        "Estamos en el tercer sprint del sitio web de Kia! El progreso actual es fantástico, esperando un gran proyecto final."
      ),
      createdAt: new Date("2025-01-22T10:00:00Z").toISOString(),
      likes: 78,
      comments: tweetReplies["2"].length,
      reposts: 24,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["2"],
    },

    // Nov 2024
    {
      id: "3",
      content: (
        <div>
          <p>
            {t(
              "What developer skills will be most valuable in the next 5 years? I'm betting on:",
              "Qué habilidades de desarrollo van a ser las más valiosas en los próximos 5 años? Yo apuesto a:"
            )}
          </p>
          <br />
          <ul>
            <li>1. {t("AI integration", "Integración con IA")}</li>
            <li>2. Edge computing</li>
            <li>3. {t("Web performance optimization", "Optimización de rendimiento web")}</li>
          </ul>
          <br />
          <p>{t("What's your top 3?", "Cuál es tu top 3?")}</p>
          <p className="font-bold">#webdev #futuretech #careerAdvice</p>
        </div>
      ),
      createdAt: new Date("2024-11-18T16:00:00Z").toISOString(),
      likes: 65,
      comments: tweetReplies["3"].length,
      reposts: 14,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["3"],
    },

    // Oct 2024
    {
      id: "4",
      content: (
        <div>
          <p>
            {t(
              "Just finished 'Clean Code' by Robert C. Martin for the third time. Each read reveals new insights! Other favorites: 'The Pragmatic Programmer' and 'Refactoring' by Martin Fowler. What programming books changed how you write code?",
              "Acabo de terminar 'Clean Code' de Robert C. Martin por tercera vez. Cada lectura revela nuevas ideas! Otros favoritos: 'The Pragmatic Programmer' y 'Refactoring' de Martin Fowler. Qué libros de programación cambiaron tu forma de escribir código?"
            )}
          </p>
          <br />
          <p className="font-bold">#programming #books #cleancode</p>
        </div>
      ),
      createdAt: new Date("2024-10-05T12:00:00Z").toISOString(),
      likes: 94,
      comments: tweetReplies["4"].length,
      reposts: 18,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["4"],
    },

    // Aug 2024
    {
      id: "5",
      content: t(
        "Wrapping up a big project using Next.js 14 + Tailwind. The DX keeps getting better every release. Server actions are a game changer for form handling! #nextjs #tailwind #webdev",
        "Cerrando un proyecto grande usando Next.js 14 + Tailwind. La DX sigue mejorando en cada release. Los server actions son un game changer para manejar formularios! #nextjs #tailwind #webdev"
      ),
      createdAt: new Date("2024-08-12T15:00:00Z").toISOString(),
      likes: 63,
      comments: tweetReplies["5"].length,
      reposts: 11,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["5"],
    },

    // Jun 2024
    {
      id: "6",
      content: t(
        "Just shipped Post Cosecha's website! Built it solo with Next.js, Strapi and Firebase. When the client gives you creative freedom, the results hit different. Really happy with how it turned out. #freelance #webdev",
        "Acabo de lanzar el sitio de Post Cosecha! Lo hice solo con Next.js, Strapi y Firebase. Cuando el cliente te da libertad creativa, los resultados son otra cosa. Muy contento con cómo quedó. #freelance #webdev"
      ),
      createdAt: new Date("2024-06-20T12:00:00Z").toISOString(),
      likes: 87,
      comments: tweetReplies["6"].length,
      reposts: 19,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["6"],
    },

    // Apr 2024
    {
      id: "7",
      content: (
        <div>
          <p>
            {t(
              "Finally got comfortable with Docker and I can't believe I waited this long. Setting up dev environments in minutes instead of hours. Containerizing everything from now on.",
              "Por fin me puse cómodo con Docker y no puedo creer que haya esperado tanto. Levantar entornos de desarrollo en minutos en vez de horas. De ahora en más, containerizo todo."
            )}
          </p>
          <br />
          <p className="font-bold">#Docker #DevOps #productivity</p>
        </div>
      ),
      createdAt: new Date("2024-04-08T10:30:00Z").toISOString(),
      likes: 54,
      comments: tweetReplies["7"].length,
      reposts: 10,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["7"],
    },

    // Feb 2024
    {
      id: "8",
      content: t(
        "Launched the Ibijet Rent platform for jetski rentals in Ibiza! Built a custom availability algorithm that checks guides + jetskis in real time. Firebase backend + PayPal integration. The most complex booking logic I've built so far. #react #firebase #startup",
        "Lancé la plataforma Ibijet Rent para alquiler de motos de agua en Ibiza! Armé un algoritmo de disponibilidad que chequea guías + motos en tiempo real. Backend con Firebase + integración con PayPal. La lógica de reservas más compleja que armé hasta ahora. #react #firebase #startup"
      ),
      createdAt: new Date("2024-02-14T14:00:00Z").toISOString(),
      likes: 102,
      comments: tweetReplies["8"].length,
      reposts: 23,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["8"],
    },

    // Dec 2023
    {
      id: "9",
      content: (
        <div>
          <p>
            {t(
              "Just tried out #GeminiAI and I'm amazed at how natural the conversations feel! The future of #AI is looking bright. 🤖✨",
              "Acabo de probar #GeminiAI y me sorprende lo natural que se sienten las conversaciones! El futuro de la #IA se ve brillante. 🤖✨"
            )}
          </p>
          <br />
          <p className="font-bold">#AI #GeminiAI #future</p>
        </div>
      ),
      createdAt: new Date("2023-12-08T14:30:00Z").toISOString(),
      likes: 87,
      comments: tweetReplies["9"].length,
      reposts: 19,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["9"],
    },

    // Sep 2023
    {
      id: "10",
      content: (
        <div>
          <p>
            {t(
              "Been exploring TypeScript lately and loving the extra confidence it gives my JavaScript code. Type safety for the win! 💪",
              "Estuve explorando TypeScript últimamente y me encanta la confianza extra que le da a mi código JavaScript. Type safety FTW! 💪"
            )}
          </p>
          <br />
          <p className="font-bold">#TypeScript #JavaScript #webdev</p>
        </div>
      ),
      createdAt: new Date("2023-09-15T09:15:00Z").toISOString(),
      likes: 54,
      comments: tweetReplies["10"].length,
      reposts: 10,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["10"],
    },

    // Jun 2023
    {
      id: "11",
      content: (
        <div>
          <p>
            {t(
              "React 19 is out! The new features make building UIs even smoother. Hooks, suspense, and server components are game changers. 🚀",
              "Salió React 19! Las nuevas features hacen que construir UIs sea aún más fluido. Hooks, suspense y server components son un game changer. 🚀"
            )}
          </p>
          <br />
          <p className="font-bold">#React19 #WebDev</p>
        </div>
      ),
      createdAt: new Date("2023-06-22T18:45:00Z").toISOString(),
      likes: 102,
      comments: tweetReplies["11"].length,
      reposts: 23,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["11"],
    },

    // Mar 2023
    {
      id: "12",
      content: (
        <div>
          <p>
            {t(
              "Experimenting with #NextJS for my latest project. Loving the built-in routing and API routes. Makes full-stack development so much easier! 🌐",
              "Experimentando con #NextJS en mi último proyecto. Me encanta el routing integrado y las API routes. Hace el desarrollo full-stack mucho más fácil! 🌐"
            )}
          </p>
          <br />
          <p className="font-bold">#NextJS #FullStack #webdev</p>
        </div>
      ),
      createdAt: new Date("2023-03-10T11:00:00Z").toISOString(),
      likes: 76,
      comments: tweetReplies["12"].length,
      reposts: 14,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["12"],
    },

    // Nov 2022
    {
      id: "13",
      content: (
        <div>
          <p>
            {t(
              "AI tools are making coding more fun and productive. From code suggestions to bug fixes, it feels like having a coding buddy 24/7! What's your favorite AI tool?",
              "Las herramientas de IA hacen que programar sea más divertido y productivo. Desde sugerencias de código hasta arreglar bugs, se siente como tener un compañero de código 24/7! Cuál es tu herramienta de IA favorita?"
            )}
          </p>
          <br />
          <p className="font-bold">#AI #productivity #coding</p>
        </div>
      ),
      createdAt: new Date("2022-11-28T16:20:00Z").toISOString(),
      likes: 91,
      comments: tweetReplies["13"].length,
      reposts: 17,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["13"],
    },
  ];

  const handleCommentsToggle = (isShowing: boolean, tweetId: string) => {
    setActiveTweetId(isShowing ? tweetId : null);
  };

  return (
    <div
      className={`${className} divide-y divide-gray-200 dark:divide-gray-700`}>
      {tweets.map((tweet) => {
        const shouldShowTweet = !activeTweetId || activeTweetId === tweet.id;

        return shouldShowTweet ? (
          <Tweet
            key={tweet.id}
            {...tweet}
            onCommentsToggle={handleCommentsToggle}
          />
        ) : null;
      })}
    </div>
  );
}
