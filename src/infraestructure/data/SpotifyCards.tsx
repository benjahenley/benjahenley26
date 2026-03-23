import { Locales } from "../interfaces";

export default function SpotifyCards(locale: Locales) {
  const cards = [
    {
      description: "Benja Henley",
      title: "Alternative Ending",
      src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1741561626/alternative-ending_phmyq4.jpg",
      ctaText: "Play",
      ctaLink: "https://open.spotify.com/track/5WyztkrPv5Qvlqqqv3PJgi",
      content: () => {
        return (
          <p>
            <strong>Alternative Ending</strong> is a single by Benja Henley,
            released on January 26, 2024, under Synthetic Affect Records. The
            track runs for 5 minutes and showcases Henley$apos;s electronic
            music style. It delivers an immersive soundscape with deep,
            atmospheric elements.
          </p>
        );
      },
    },
    {
      description: "Benja Henley",
      title: "Make You Forget",
      src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1741561627/make-you-forget_lr2zaa.jpg",
      ctaText: "Play",
      ctaLink: "https://open.spotify.com/track/0hU8LbLQxyRTE6X3fGpsez",
      content: () => {
        return (
          <p>
            <strong>Make You Forget</strong> is a track by Benja Henley that
            blends hypnotic melodies with driving basslines. Featured on IAMT
            Label, the song captures a deep and immersive energy, making it a
            standout in Henley$apos;s discography.
          </p>
        );
      },
    },
    {
      description: "Benja Henley",
      title: "High Stakes",
      src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1741561627/high-stakes_unhgj4.jpg",
      ctaText: "Play",
      ctaLink: "https://open.spotify.com/track/78lWp4Ca7QJbACeYqQOThy",
      content: () => {
        return (
          <p>
            <strong>High Stakes</strong> is a dynamic and high-energy track by
            Benja Henley, crafted with pulsating rhythms and sharp synth
            textures. This song reflects Henley$apos;s signature style,
            balancing raw power with an emotive depth that resonates with
            listeners.
          </p>
        );
      },
    },
    {
      description: "Benja Henley",
      title: "Anomaly",
      src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1741561626/anomaly_tzfteu.jpg",
      ctaText: "Play",
      ctaLink: "https://open.spotify.com/track/7MC6fSCNSvQa4m7pQLq7qd",
      content: () => {
        return (
          <p>
            <strong>Anomaly</strong> stands out as one of Benja Henley$apos;s
            most experimental tracks, featuring a mix of deep basslines and
            intricate melodies. The song takes listeners on a sonic journey,
            merging atmospheric elements with a driving rhythm.
          </p>
        );
      },
    },
    {
      description: "Benja Henley",
      title: "Injection",
      src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1741561626/injection_czdxsi.jpg",
      ctaText: "Play",
      ctaLink: "https://open.spotify.com/track/6GnVA5dNhXl4YF3NhRhftr",
      content: () => {
        return (
          <p>
            <strong>Injection</strong> is an electrifying composition by Benja
            Henley, blending dark, industrial tones with an infectious groove.
            The track delivers a powerful energy, perfect for deep immersion
            into the world of electronic music.
          </p>
        );
      },
    },
  ];

  return cards;
}
