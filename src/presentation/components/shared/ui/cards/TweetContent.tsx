import React from "react";

/**
 * Renders stored tweet text (plain string from the DB) with light formatting:
 * - line breaks are preserved
 * - #hashtags are styled like tags
 * - lines made up entirely of hashtags are emphasised (bold), matching the
 *   look the feed had when these posts were hardcoded JSX.
 *
 * No HTML is injected, so there is no XSS surface.
 */
const isHashtag = (word: string) => /^#\w+$/.test(word);

function renderWithHashtags(line: string) {
  // split() with a capturing group keeps the hashtags as their own chunks
  return line.split(/(#\w+)/g).map((chunk, i) =>
    isHashtag(chunk) ? (
      <span key={i} className="text-blue-500 dark:text-[#1d9bf0]">
        {chunk}
      </span>
    ) : (
      <React.Fragment key={i}>{chunk}</React.Fragment>
    )
  );
}

type Props = {
  content: string;
  className?: string;
};

export default function TweetContent({ content, className }: Props) {
  const lines = content.split("\n");

  return (
    <div className={className}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed === "") return <br key={idx} />;

        const hashtagOnly = trimmed
          .split(/\s+/)
          .every((word) => isHashtag(word));

        return (
          <p key={idx} className={hashtagOnly ? "font-bold" : undefined}>
            {renderWithHashtags(line)}
          </p>
        );
      })}
    </div>
  );
}
