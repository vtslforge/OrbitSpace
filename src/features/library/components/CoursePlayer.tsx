import ReactPlayer from "react-player";
import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import type { LearningProgressOutletContext } from "../hooks/useLibrary";
import {
  readLocalStorageItem,
  writeLocalStorageItem,
} from "../../../shared/hooks/useLocalStorage.ts";
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

const CoursePlayer = () => {
  const { url } = useParams();
  const { currentWatch } = useOutletContext<LearningProgressOutletContext>();
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
    writeLocalStorageItem(progressKey, time.toString());
  };

  // Get video duration
  const handleDurationChange = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
  };

  // Restore previous playback position
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const savedTime = readLocalStorageItem(progressKey);
    if (savedTime) {
      const resumeAt = Number(savedTime);
      if (Number.isFinite(resumeAt) && resumeAt > 0) {
        e.currentTarget.currentTime = resumeAt;
        setCurrentTime(resumeAt);
      }
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1500px] px-[clamp(24px,4vw,58px)] pt-[34px] pb-[60px] max-[760px]:px-[18px] max-[760px]:pt-[23px] max-[760px]:pb-[34px]">
      <Link className="mb-6 inline-flex items-center gap-[9px] text-[13px] font-semibold text-[#65736c] no-underline hover:text-[#20533f]" to="/library">
        <ArrowLeft size={16} aria-hidden="true" /> Learning library
      </Link>

      <header className="mb-[22px] flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="mb-[7px] text-[10px] font-bold tracking-[1px] text-[#32745c] uppercase">{course?.category || "COURSE PLAYER"}</p>
          <h1 className="m-0 font-[Manrope,sans-serif] text-[27px] font-bold tracking-[-.8px] text-[#18251f]">{course?.title || "Now playing"}</h1>
          {course?.description && <p className="mt-2 mb-0 text-[13px] leading-relaxed text-[#78857d]">{course.description}</p>}
        </div>
        {course?.difficulty && <span className="rounded-full bg-[#e3f0e8] px-[9px] py-1.5 text-[11px] font-bold text-[#20533f]">{course.difficulty}</span>}
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_290px] items-start gap-[18px] max-[1100px]:grid-cols-[minmax(0,1fr)_260px] max-[760px]:grid-cols-1">
        <section className="min-w-0" aria-label="Course video">
          {url ? (
            <MediaController className="block aspect-video w-full overflow-hidden rounded-[10px] border border-[#202522] bg-[#101412] shadow-[0_16px_36px_rgb(18_30_24_/_12%)] [--media-control-background:transparent] [--media-control-hover-background:rgb(255_255_255_/_12%)] [--media-control-icon-color:#f7faf7] [--media-control-icon-width:18px] [--media-control-icon-height:18px] [--media-range-track-background:rgb(255_255_255_/_28%)] [--media-range-bar-color:#a9d282] [--media-time-range-buffered-color:rgb(255_255_255_/_42%)]">
              <ReactPlayer
                slot="media"
                src={url}
                width="100%"
                height="100%"
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onLoadedMetadata={handleLoadedMetadata}
                onError={() => setPlaybackError(true)}
                className="h-full w-full [--controls:none]"
              />

              <MediaControlBar className="min-h-[52px] gap-1 bg-[#171d19] px-[10px]">
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
            <div className="grid aspect-video place-items-center rounded-[10px] bg-[#171d19] p-6 text-center text-[#e7ece8]">This course does not have a video URL.</div>
          )}
          {playbackError && (
            <p className="mt-2.5 rounded-lg border border-[#efcec2] bg-[#fff8f5] px-[13px] py-[11px] text-xs text-[#9a4d35]" role="alert">This video could not be loaded. Check the course URL and try again.</p>
          )}
        </section>

        <aside className="rounded-[10px] border border-[#e4e9e2] bg-white p-[18px]">
          <div className="mb-[22px] flex items-center gap-[11px]">
            <span className="grid size-9 flex-none place-items-center rounded-[9px] bg-[#e8f1e8] text-[#32745c]" aria-hidden="true"><Play size={15} fill="currentColor" /></span>
            <div>
              <h2 className="m-0 font-[Manrope,sans-serif] text-sm font-bold text-[#18251f]">Lesson progress</h2>
              <p className="mt-1 mb-0 text-[11px] leading-[1.4] text-[#78857d]">Your position is saved as you watch.</p>
            </div>
          </div>

          <div className="flex justify-between gap-2 text-[11px] text-[#6d7972]">
            <span>Watched</span>
            <strong className="text-[11px] tabular-nums text-[#18251f]">{formatTime(currentTime)} <span className="font-medium text-[#8d9892]">/ {formatTime(duration)}</span></strong>
          </div>
          <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-[#edf1ed]" role="progressbar" aria-label="Video progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <span className="block h-full rounded-full bg-[#76a96c] transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>

          {course && (
            <dl className="mt-[22px] grid gap-[13px] border-t border-[#edf1ed] pt-[17px]">
              <div className="flex items-center justify-between gap-3"><dt className="text-[11px] text-[#7b8780]">Category</dt><dd className="m-0 text-right text-[11px] font-semibold text-[#33423a]">{course.category}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-[11px] text-[#7b8780]">Level</dt><dd className="m-0 text-right text-[11px] font-semibold text-[#33423a]">{course.difficulty}</dd></div>
            </dl>
          )}
        </aside>
      </div>
    </main>
  );
};

export default CoursePlayer;
