export default function Hero() {
  return (
    <div className="flex flex-col gap-8 p-12 max-w-[900px] justify-center max-[800px]:p-8 max-[800px]:gap-6">
      <h1 className="font-raleway text-5xl md:text-[3.5rem] font-bold text-transparent bg-[linear-gradient(135deg,#ffffff_0%,#a0a0ff_50%,#ffffff_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] max-[800px]:text-[2.25rem]">
        Hello, my name is Kevin.
      </h1>
      
      <p className="font-raleway text-lg font-light text-white/85 m-0 leading-[1.8] tracking-[0.01em] max-[800px]:text-base max-[800px]:leading-[1.7]">
        I know three things: FDE, Enterprise, and International. I am a William Jefferson Clinton Presidential Scholar and have studied at the University of California Berkeley, Oxford University, and the American University in Dubai.
      </p>

      <div className="flex gap-3 items-start">
        <span className="text-2xl leading-none shrink-0">🚀</span>
        <p className="font-raleway text-lg font-light text-white/85 m-0 leading-[1.8] tracking-[0.01em] max-[800px]:text-base max-[800px]:leading-[1.7]">
          My main focus is leveraging technology to solve enterprise problems at the local, regional, and global level. Technology is the means, not the goal.
        </p>
      </div>

      <div className="flex gap-3 items-start">
        <span className="text-2xl leading-none shrink-0">🧠</span>
        <p className="font-raleway text-lg font-light text-white/85 m-0 leading-[1.8] tracking-[0.01em] max-[800px]:text-base max-[800px]:leading-[1.7]">
          My background spans diplomacy, sales, business development, product management, customer success, software engineering, and forward deployed engineering—which brings them all together. I build full-stack applications with JavaScript, TypeScript, React, and Python, love new opportunities, and learn quickly.
        </p>
      </div>

      <div className="flex gap-3 items-start">
        <span className="text-2xl leading-none shrink-0">🌎</span>
        <p className="font-raleway text-lg font-light text-white/85 m-0 leading-[1.8] tracking-[0.01em] max-[800px]:text-base max-[800px]:leading-[1.7]">
          I've lived and worked across North America, Europe, the Middle East, East Asia, Southeast Asia, and South America, and speak the six official languages of the United Nations.
        </p>
      </div>

      <div>
        <p className="font-raleway text-lg font-light text-white/85 m-0 leading-[1.8] tracking-[0.01em] max-[800px]:text-base max-[800px]:leading-[1.7]">
          You're very welcome to reach out.
        </p>
        <div className="flex gap-4 flex-wrap mt-2">
          <a
            href="https://www.linkedin.com/in/zkevinbai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/15 rounded-md text-white/90 font-raleway text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(48,127,246,0.25)] hover:border-[rgba(48,127,246,0.5)] hover:text-white hover:-translate-y-[1px] max-[800px]:text-sm max-[800px]:px-4 max-[800px]:py-2"
          >
            <i className="fab fa-linkedin text-base" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:hello@zkevinbai.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/15 rounded-md text-white/90 font-raleway text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(48,127,246,0.25)] hover:border-[rgba(48,127,246,0.5)] hover:text-white hover:-translate-y-[1px] max-[800px]:text-sm max-[800px]:px-4 max-[800px]:py-2"
          >
            <i className="fas fa-paper-plane text-base" />
            <span>Email</span>
          </a>
          <a
            href="https://twitter.com/zkevinbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/15 rounded-md text-white/90 font-raleway text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-[rgba(48,127,246,0.25)] hover:border-[rgba(48,127,246,0.5)] hover:text-white hover:-translate-y-[1px] max-[800px]:text-sm max-[800px]:px-4 max-[800px]:py-2"
          >
            <i className="fab fa-twitter text-base" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  )
}