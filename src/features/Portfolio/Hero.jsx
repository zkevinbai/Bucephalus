export default function Hero() {
  return (
    <div className="flex flex-col gap-6 p-6 max-[950px]:gap-4 max-[950px]:p-4">
      <h1 className="font-raleway text-[2.25rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#307ff6_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
        Hello, my name is Kevin.
      </h1>
      
      <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
        I know three things: <strong>Forward Deployed Engineering</strong>, <strong>Solving Enterprise Business Problems</strong>, and <strong>International Relations</strong>.
      </p>
      
      <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
        I am a <strong>William Jefferson Clinton Presidential Scholar</strong> who has studied at <strong>University of California Berkeley</strong>, <strong>Oxford University</strong>, and <strong>American University in Dubai</strong>.
      </p>

      <div className="flex gap-3 items-start max-[950px]:gap-2">
        <span className="text-2xl leading-none shrink-0 max-[950px]:text-xl">🚀</span>
        <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em]">
          My main focus is leveraging technology to solve <strong>enterprise problems</strong> at the <strong>local, regional, and global level</strong>. <strong>Technology is the means, not the goal</strong>.
        </p>
      </div>

      <div className="flex gap-3 items-start max-[950px]:gap-2">
        <span className="text-2xl leading-none shrink-0 max-[950px]:text-xl">🧠</span>
        <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em]">
          My background spans <strong>diplomacy</strong>, <strong>sales</strong>, <strong>business development</strong>, <strong>product management</strong>, <strong>customer success</strong>, <strong>software engineering</strong>, and <strong>forward deployed engineering</strong>—which brings them all together. I build <strong>full-stack applications</strong> with <strong>JavaScript</strong>, <strong>TypeScript</strong>, <strong>React</strong>, and <strong>Python</strong>, love new opportunities, and learn quickly.
        </p>
      </div>

      <div className="flex gap-3 items-start max-[950px]:gap-2">
        <span className="text-2xl leading-none shrink-0 max-[950px]:text-xl">🌎</span>
        <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em]">
          I've lived and worked across <strong>North America</strong>, <strong>Europe</strong>, <strong>the Middle East</strong>, <strong>East Asia</strong>, <strong>Southeast Asia</strong>, and <strong>South America</strong>, and speak the <strong>six official languages of the United Nations</strong>.
        </p>
      </div>

      <div>
        <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
          You're very welcome to reach out.
        </p>
        <div className="flex gap-3 flex-wrap mt-2 justify-center">
          <a
            href="https://www.linkedin.com/in/zkevinbai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-200 hover:bg-blue-500 hover:border-blue-600 hover:text-white hover:-translate-y-[1px] shadow-md hover:shadow-lg"
          >
            <i className="fab fa-linkedin text-base" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:hello@zkevinbai.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-200 hover:bg-pink-500 hover:border-pink-600 hover:text-white hover:-translate-y-[1px] shadow-md hover:shadow-lg"
          >
            <i className="fas fa-paper-plane text-base" />
            <span>Email</span>
          </a>
          <a
            href="https://twitter.com/zkevinbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-200 hover:bg-blue-400 hover:border-blue-500 hover:text-white hover:-translate-y-[1px] shadow-md hover:shadow-lg"
          >
            <i className="fab fa-twitter text-base" />
            <span>Twitter</span>
          </a>
          <a
            href="https://github.com/zkevinbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-200 hover:bg-gray-800 hover:border-gray-900 hover:text-white hover:-translate-y-[1px] shadow-md hover:shadow-lg"
          >
            <i className="fab fa-github text-base" />
            <span>GitHub</span>
          </a>
          <a
            href="https://web.archive.org/web/20240622002720/https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-200 hover:bg-purple-500 hover:border-purple-600 hover:text-white hover:-translate-y-[1px] shadow-md hover:shadow-lg"
          >
            <i className="fas fa-address-card text-base" />
            <span>About</span>
          </a>
        </div>
      </div>
    </div>
  )
}