import ReactPlayer from "react-player";
import { useState, type CSSProperties } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import type { UseStatType } from "../hooks/useLibrary";
import {
  readUserStorageItem,
  writeUserStorageItem,
} from "../../../shared/hooks/useUserStorage.ts";
import { useUser } from "@clerk/react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

const VideoPlayer = () => {
  const { url } = useParams();
  const { currentWatch } = useOutletContext<UseStatType>();
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState(false);
  const progressKey = `video-progress-${url}`;
  const course = currentWatch?.find((item) => item.url === url);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) {
      return "--:--";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Save current playback position
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const time = e.currentTarget.currentTime;
    setCurrentTime(time);
    writeUserStorageItem(user?.id, progressKey, time.toString());
  };

  // Get video duration
  const handleDurationChange = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
  };

  // Restore previous playback position
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const savedTime = readUserStorageItem(user?.id, progressKey);
    if (savedTime) {
      const resumeAt = Number(savedTime);
      if (Number.isFinite(resumeAt) && resumeAt > 0) {
        e.currentTarget.currentTime = resumeAt;
        setCurrentTime(resumeAt);
      }
    }
  };

  return (
    <main className="page-content player-page">
      <Link className="player-backlink" to="/library">
        <span aria-hidden="true">←</span> Learning library
      </Link>

      <header className="player-header">
        <div className="min-w-0">
          <p className="player-eyebrow">{course?.category || "COURSE PLAYER"}</p>
          <h1 className="page-title">{course?.title || "Now playing"}</h1>
          {course?.description && <p className="page-subtitle">{course.description}</p>}
        </div>
        {course?.difficulty && <span className="course-level">{course.difficulty}</span>}
      </header>

      <div className="player-layout">
        <section className="player-column" aria-label="Course video">
          {url ? (
            <MediaController className="video-controller">
              <ReactPlayer
                slot="media"
                src={url}
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onLoadedMetadata={handleLoadedMetadata}
                onError={() => setPlaybackError(true)}
                style={
                  {
                    width: "100%",
                    height: "100%",
                    "--controls": "none",
                  } as CSSProperties & { "--controls": string }
                }
              />

              <MediaControlBar className="video-control-bar">
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>
          ) : (
            <div className="player-unavailable">This course does not have a video URL.</div>
          )}
          {playbackError && (
            <p className="player-error" role="alert">This video could not be loaded. Check the course URL and try again.</p>
          )}
        </section>

        <aside className="player-details">
          <div className="player-details-heading">
            <span className="player-detail-mark" aria-hidden="true">▶</span>
            <div>
              <h2>Lesson progress</h2>
              <p>Your position is saved as you watch.</p>
            </div>
          </div>

          <div className="player-progress-copy">
            <span>Watched</span>
            <strong>{formatTime(currentTime)} <span>/ {formatTime(duration)}</span></strong>
          </div>
          <div className="player-progress-track" role="progressbar" aria-label="Video progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <span style={{ width: `${progress}%` }} />
          </div>

          {course && (
            <dl className="player-course-meta">
              <div><dt>Category</dt><dd>{course.category}</dd></div>
              <div><dt>Level</dt><dd>{course.difficulty}</dd></div>
            </dl>
          )}
        </aside>
      </div>
    </main>
  );
};

export default VideoPlayer;
