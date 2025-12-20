export function CelebrityDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`text-sm text-zinc-400 ${className}`}>
      <p>
        Celebrity detection is done via{" "}
        <a
          href="https://aws.amazon.com/rekognition/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-300"
        >
          AWS Rekognition
        </a>
        . It may not be accurate and I have not vetted them.{" "}
        <a
          href="https://github.com/RhysSullivan/epstein-files-browser"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-300"
        >
          Source is available
        </a>{" "}
        for how this works.
      </p>
    </div>
  );
}
