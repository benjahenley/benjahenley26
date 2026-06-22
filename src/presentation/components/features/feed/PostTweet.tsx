"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { accessTokenAtom } from "@/atoms/auth";
import { userSession } from "@/atoms/session";
import { postTweet } from "@/utils/tweets";
import { Locales } from "@/infraestructure/interfaces";

type Props = {
  locale: Locales;
  onPosted: () => void;
};

type Lang = "en" | "es";

const LANGS: { code: Lang; flag: string }[] = [
  { code: "en", flag: "🇬🇧" },
  { code: "es", flag: "🇦🇷" },
];

const EDITOR_CONFIG = {
  toolbar: [
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "|",
    "undo",
    "redo",
  ],
};

// Treat empty editor output ("", "<p>&nbsp;</p>", "<p></p>") as blank.
const isBlank = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() === "";

export default function PostTweet({ locale, onPosted }: Props) {
  const [accessToken] = useAtom(accessTokenAtom);
  const [session] = useAtom(userSession);
  const [editLang, setEditLang] = useState<Lang>("en");
  const [contentEn, setContentEn] = useState("");
  const [contentEs, setContentEs] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Owner-only. The backend AdminGuard is the real gate; this just hides the UI.
  if (!accessToken || session.role !== "ADMIN") return null;

  const t = (en: string, es: string) => (locale === "en" ? en : es);

  const contentFor = (lng: Lang) => (lng === "en" ? contentEn : contentEs);
  const setContentFor = (lng: Lang, value: string) =>
    (lng === "en" ? setContentEn : setContentEs)(value);

  const enFilled = !isBlank(contentEn);
  const esFilled = !isBlank(contentEs);
  const bothFilled = enFilled && esFilled;

  const fullName =
    `${session.userFirstName} ${session.userLastName}`.trim() ||
    session.handle ||
    "You";
  const handleDisplay = session.handle
    ? session.handle.startsWith("@")
      ? session.handle
      : `@${session.handle}`
    : "";

  const handleSubmit = async () => {
    if (!bothFilled || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await postTweet(
        [
          { language: "en", content: contentEn },
          { language: "es", content: contentEs },
        ],
        accessToken
      );
      setContentEn("");
      setContentEs("");
      setEditLang("en");
      onPosted();
    } catch (e: any) {
      setError(e.message ?? "Could not post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-b border-slate-300 dark:border-gray-600 px-4 py-4 bg-white dark:bg-[#1f2937]">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {session.profileImg ? (
            <Image
              src={session.profileImg}
              alt={session.handle || "You"}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle className="text-gray-400 w-12 h-12" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author */}
          <div className="mb-2 flex flex-col">
            <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
              {fullName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {handleDisplay}
            </p>
          </div>

          <div className="text-gray-900">
            {/* key={editLang} re-mounts the editor on switch so it always shows
                the selected language's content. */}
            <CKEditor
              key={editLang}
              editor={ClassicEditor}
              data={contentFor(editLang)}
              config={EDITOR_CONFIG}
              onChange={(_event: unknown, editor: { getData: () => string }) =>
                setContentFor(editLang, editor.getData())
              }
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <div className="mt-3 flex items-center justify-between gap-3">
            {/* Language toggle — edit each translation separately. A green dot
                marks languages that already have content. */}
            <div className="inline-flex rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden text-sm">
              {LANGS.map(({ code, flag }) => {
                const active = editLang === code;
                const filled = code === "en" ? enFilled : esFilled;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setEditLang(code)}
                    className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
                      active
                        ? "bg-gray-200 dark:bg-slate-600 text-violet-600 dark:text-green-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}>
                    <span>{flag}</span>
                    <span className="uppercase">{code}</span>
                    {filled && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || !bothFilled}
              className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? t("Posting…", "Publicando…") : t("Post", "Publicar")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
