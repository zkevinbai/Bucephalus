export default function ProjectDetail({ title, description, githubLink, liveLink }) {
  return (
    <div className="flex flex-col gap-6 p-8 h-full justify-center font-raleway max-[950px]:p-6 max-[950px]:gap-4 max-[950px]:text-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-[2rem] font-semibold text-gray-800 m-0 tracking-[-0.01em]">
          {title}
        </h2>
        <p className="text-lg font-light text-gray-700 m-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="flex gap-4 flex-wrap max-[950px]:justify-center">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-md text-gray-800 text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(239,68,68,0.25)] hover:border-[rgba(239,68,68,0.6)] hover:text-gray-900 hover:-translate-y-[1px] max-[950px]:text-sm max-[950px]:px-4 max-[950px]:py-2"
        >
          Github
        </a>
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-md text-gray-800 text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(239,68,68,0.25)] hover:border-[rgba(239,68,68,0.6)] hover:text-gray-900 hover:-translate-y-[1px] max-[950px]:text-sm max-[950px]:px-4 max-[950px]:py-2"
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}