export default function Hero() {
  return (
    <div className="flex flex-col gap-6 p-6 max-[950px]:gap-4 max-[950px]:p-4">
      <h1 className="font-raleway text-[2.25rem] md:text-[3rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#ef4444_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
        Hello, my name is Kevin.
      </h1>
      
      <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
        I know three things: <strong className="font-semibold">Forward Deployed Engineering</strong>, <strong className="font-semibold">Solving Enterprise Business Problems</strong>, and <strong className="font-semibold">International Relations</strong>.
      </p>
      
      <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
        My main goal is to leverage technology to help customers solve real problems. <strong className="font-semibold">Technology is the means, not the goal</strong>.
      </p>

      <div>
        <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
          You're very welcome to reach out.
        </p>
        <div className="flex gap-3 flex-wrap mt-2 justify-center">
          <a
            href="https://www.linkedin.com/in/zkevinbai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-300 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <i className="fab fa-linkedin text-base" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:hello@zkevinbai.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-300 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <i className="fas fa-paper-plane text-base" />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/zkevinbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-300 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <i className="fab fa-github text-base" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  )
}