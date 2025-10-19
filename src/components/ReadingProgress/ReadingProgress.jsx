// components/ReadingProgress/ReadingProgress.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, X } from "lucide-react";

const ReadingProgress = ({ blogId, content, userEmail }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate reading time
  const calculateReadingTime = () => {
    if (!content) return 1;
    const cleanContent = content.replace(/<[^>]*>/g, " ");
    const wordCount = cleanContent.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const readingTime = calculateReadingTime();

  // Dynamic time remaining calculation in seconds
  const calculateTimeRemaining = () => {
    if (readingProgress >= 100) return 0;
    if (readingProgress === 0 || timeSpent === 0) return readingTime * 60;

    const secondsPerPercent = timeSpent / readingProgress;
    const remainingPercent = 100 - readingProgress;
    const remainingSeconds = secondsPerPercent * remainingPercent;

    return Math.max(1, Math.ceil(remainingSeconds));
  };

  const secondsRemaining = calculateTimeRemaining();

  // Format seconds to minutes and seconds
  const formatTime = (totalSeconds) => {
    if (totalSeconds === 0) return "Done!";

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  useEffect(() => {
    if (!blogId || !userEmail || !content) return;

    let startTime = Date.now();
    let timer;

    const updateProgress = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      let progress;
      if (docHeight <= windowHeight) {
        progress = 100;
      } else {
        progress = (scrolled / (docHeight - windowHeight)) * 100;
        progress = Math.min(100, Math.max(0, progress));
      }

      // Round progress to whole number
      setReadingProgress(Math.round(progress));
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));

      // Auto-show when user starts reading
      if (!isVisible && progress > 5) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", updateProgress);

    timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      clearInterval(timer);
    };
  }, [blogId, userEmail, content, isVisible]);

  if (!isVisible || !content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed top-24 right-4 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Compact Progress Widget */}
        <div
          className={`
          backdrop-blur-md bg-white/80 border border-orange-200/50 
          rounded-2xl shadow-lg transition-all duration-300
          ${isHovered ? "p-3 w-48" : "p-2 w-12"}
          hover:bg-white/90 hover:border-orange-300 hover:shadow-xl
        `}
        >
          {/* Close Button - Only show on hover */}
          {isHovered && (
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-orange-600 transition-colors"
            >
              <X size={10} />
            </button>
          )}

          {/* Progress Circle */}
          <div className="flex items-center gap-3">
            {/* Circular Progress */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-orange-200 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-transparent"
                  style={{
                    background: `conic-gradient(
                      #f97316 0% ${readingProgress}%, 
                      #fed7aa ${readingProgress}% 100%
                    )`,
                  }}
                />
                <span className="text-xs font-bold text-orange-600 relative z-10">
                  {readingProgress}%
                </span>
              </div>
            </div>

            {/* Expanded Info - Only show on hover */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="overflow-hidden"
              >
                <div className="space-y-1 min-w-32">
                  {/* Progress Text */}
                  <div className="flex items-center gap-2">
                    <BookOpen size={12} className="text-orange-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {readingProgress}% read
                    </span>
                  </div>

                  {/* Time Info */}
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-orange-500" />
                    <span className="text-xs text-gray-600">
                      {formatTime(secondsRemaining)}
                    </span>
                  </div>

                  {/* Progress Bar - Only show on hover */}
                  <div className="w-full bg-orange-200 rounded-full h-1">
                    <div
                      className="bg-orange-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${readingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Minimal view when not hovered - just show time */}
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <span className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-1 rounded">
                {formatTime(secondsRemaining)}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReadingProgress;
