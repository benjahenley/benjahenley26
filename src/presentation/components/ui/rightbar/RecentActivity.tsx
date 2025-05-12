import { Locales } from "@/infraestructure/interfaces";
import { MdVerified } from "react-icons/md";

export default function RecentActivity({
  title,
  locale,
}: {
  title: string;
  locale: Locales;
}) {
  const userActivity = [
    {
      name: "Lucas Romero",
      username: "@lucasromero",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      action:
        locale === "en"
          ? "liked your MERN Stack project"
          : "le gustó tu proyecto MERN Stack",
      time: "2m",
    },
    {
      name: "Sofía Torres",
      username: "@sofiatorres",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      action:
        locale === "en" ? "joined the platform" : "se unió a la plataforma",
      time: "5m",
    },
    {
      name: "Mateo Fernández",
      username: "@mateofdz",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      action:
        locale === "en"
          ? "commented on your React Native app"
          : "comentó en tu aplicación React Native",
      time: "15m",
    },
    {
      name: "Valentina Ruiz",
      username: "@valenruiz",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      action:
        locale === "en"
          ? "starred your portfolio repository"
          : "destacó tu repositorio de portafolio",
      time: "27m",
    },
    {
      name: "Joaquín Herrera",
      username: "@joaquinhr",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      action:
        locale === "en"
          ? "shared your TypeScript tutorial"
          : "compartió tu tutorial de TypeScript",
      time: "1h",
    },
    {
      name: "Camila Gómez",
      username: "@camilagomez",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/16.jpg",
      action:
        locale === "en" ? "followed your projects" : "siguió tus proyectos",
      time: "2h",
    },
    {
      name: "Tomás Silva",
      username: "@tomassilva",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
      action:
        locale === "en"
          ? "liked your game development post"
          : "le gustó tu publicación sobre desarrollo de juegos",
      time: "3h",
    },
  ];

  return (
    <div className="border border-gray-300 dark:border-slate-600 rounded-xl flex flex-col overflow-hidden">
      <div className="dark:text-white font-bold w-full text-xl px-3 md:px-4 border-b border-gray-300 dark:border-slate-600 pb-3 pt-4 sticky top-0   z-10">
        {title}
      </div>
      <ul className="flex flex-col w-full overflow-y-auto max-h-[250px] activity-scrollbar">
        {userActivity.map((activity, index) => (
          <li
            key={index}
            className="grid grid-cols-[auto_1fr] grid-rows-2 px-3 md:px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-700 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
            <div className="w-fit mr-3 row-span-1 self-center">
              <img
                src={activity.avatar}
                alt={activity.name}
                className="rounded-full w-8 h-8 object-cover"
              />
            </div>
            <div className="flex-1 flex-grow min-w-0">
              <div className="flex flex-row items-center justify-between gap-1">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-medium truncate max-w-[150px]">
                    {activity.name}
                  </span>
                  {activity.verified && (
                    <MdVerified className="text-blue-500 text-sm flex-shrink-0" />
                  )}
                </div>
                <div className="text-gray-500 text-xs flex-shrink-0">
                  {activity.time}
                </div>
              </div>
              <div className="text-gray-500 text-xs">{activity.username}</div>
            </div>
            <div className="col-start-2 text-sm flex-shrink">
              {activity.action}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
