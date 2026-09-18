"use client";

import { useState } from "react";
import Image from "next/image";

export type VideoMaterial = {
  id: string;
  topic: string;
  title: string;
  channel: string;
  description: string;
};

type VideoMaterialsProps = {
  videos: VideoMaterial[];
};

export default function VideoMaterials({ videos }: VideoMaterialsProps) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="video-grid">
      {videos.map((video) => {
        const isPlaying = playing === video.id;

        return (
          <article className="video-card" key={video.id}>
            <div className="video-frame">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="video-poster"
                  onClick={() => setPlaying(video.id)}
                  aria-label={`Putar video: ${video.title}`}
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  <span className="video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="26">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="video-duration" aria-hidden="true">
                    ▶ Tonton
                  </span>
                </button>
              )}
            </div>
            <div className="video-body">
              <span>{video.topic}</span>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p className="video-source">
                Video:{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {video.channel}
                </a>
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
