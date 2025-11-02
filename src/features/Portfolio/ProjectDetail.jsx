export default function ProjectDetail({ title, description, githubLink, liveLink }) {
  return (
    <div className="flex flex-col gap-6 p-8 h-full justify-center font-raleway max-[800px]:p-6 max-[800px]:gap-4 max-[800px]:text-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-[2rem] font-semibold text-gray-800 m-0 tracking-[-0.01em] max-[800px]:text-2xl">
          {title}
        </h2>
        <p className="text-lg font-light text-gray-700 m-0 leading-relaxed max-[800px]:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="flex gap-4 flex-wrap max-[800px]:justify-center">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 border border-gray-300/50 rounded-md text-gray-800 text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(48,127,246,0.25)] hover:border-[rgba(48,127,246,0.6)] hover:text-gray-900 hover:-translate-y-[1px] max-[800px]:text-sm max-[800px]:px-4 max-[800px]:py-2"
        >
          Github
        </a>
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 border border-gray-300/50 rounded-md text-gray-800 text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(48,127,246,0.25)] hover:border-[rgba(48,127,246,0.6)] hover:text-gray-900 hover:-translate-y-[1px] max-[800px]:text-sm max-[800px]:px-4 max-[800px]:py-2"
          >
            Live
          </a>
        )}
      </div>
    </div>
  )
}