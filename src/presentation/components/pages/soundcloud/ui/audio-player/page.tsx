"use client";

import { useAudio } from "@/presentation/components/providers/Audio";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = () => {
  const { currentAudio } = useAudio();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current!;

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audioElement.duration));
      setCurrentTime(formatTime(audioElement.currentTime));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audioElement.currentTime));
      const seekSlider = document.getElementById(
        "seek-slider"
      ) as HTMLInputElement;
      seekSlider.value = (
        (audioElement.currentTime / audioElement.duration) *
        100
      ).toString();
    };

    const handlePlayPause = () => {
      setIsPlaying(!audioElement.paused);
    };

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("play", handlePlayPause);
    audioElement.addEventListener("pause", handlePlayPause);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("play", handlePlayPause);
      audioElement.removeEventListener("pause", handlePlayPause);
    };
  }, [currentAudio]);

  const handlePlayPauseClick = () => {
    const audioElement = audioRef.current!;
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current!;
    const seekTime =
      (parseInt(event.target.value) / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current!;
    audioElement.volume = parseInt(event.target.value) / 100;
  };

  return (
    <div className="audio-player flex flex-col items-center p-4 bg-gray-800 rounded-lg">
      <audio id="audio-element" ref={audioRef}>
        <source src={currentAudio!} type="audio/mpeg" />
      </audio>

      <div className="controls flex flex-col items-center w-full">
        <button
          id="play-pause-btn"
          onClick={handlePlayPauseClick}
          className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-400 mb-4">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <input
          type="range"
          id="seek-slider"
          max="100"
          defaultValue="0"
          onChange={handleSeekChange}
          className="w-full mb-4"
        />
        <div className="flex justify-between w-full mb-4">
          <span id="current-time">{currentTime}</span>
          <span id="duration">{duration}</span>
        </div>
        <input
          type="range"
          id="volume-slider"
          max="100"
          defaultValue="100"
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
