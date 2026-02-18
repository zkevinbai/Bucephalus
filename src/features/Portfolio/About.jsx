export default function About() {
  return (
    <div className="flex flex-col gap-6 p-6 w-full bg-white border-l-4 border-[#ef4444] rounded-xl shadow-sm max-[950px]:p-4 max-[950px]:gap-4">
      <div 
        className="font-raleway text-base font-light text-gray-800 leading-[1.7] tracking-[0.01em]"
        dangerouslySetInnerHTML={{
          __html: `
            <p class="mb-6">
              I know three things: <strong>Forward Deployed Engineering</strong>, <strong>Solving Enterprise Business Problems</strong>, and <strong>International Relations</strong>.
            </p>
            
            <p class="mb-6">
              I am a <strong>William Jefferson Clinton Presidential Scholar</strong> who has studied at <strong>University of California Berkeley</strong>, <strong>Oxford University</strong>, and <strong>American University in Dubai</strong>.
            </p>

            <div class="flex gap-3 items-start mb-6">
              <span class="text-2xl leading-none shrink-0">🚀</span>
              <p class="m-0">
                My main focus is leveraging technology to solve <strong>enterprise problems</strong> at the <strong>local, regional, and global level</strong>. <strong>Technology is the means, not the goal</strong>.
              </p>
            </div>

            <div class="flex gap-3 items-start mb-6">
              <span class="text-2xl leading-none shrink-0">🧠</span>
              <p class="m-0">
                My background spans <strong>diplomacy</strong>, <strong>sales</strong>, <strong>business development</strong>, <strong>product management</strong>, <strong>customer success</strong>, <strong>software engineering</strong>, and <strong>forward deployed engineering</strong>—which brings them all together. I build <strong>full-stack applications</strong> with <strong>JavaScript</strong>, <strong>TypeScript</strong>, <strong>React</strong>, and <strong>Python</strong>. I love new opportunities and I learn quickly.
              </p>
            </div>

            <div class="flex gap-3 items-start mb-6">
              <span class="text-2xl leading-none shrink-0">🌎</span>
              <p class="m-0">
                I've lived and worked across <strong>North America</strong>, <strong>Europe</strong>, <strong>the Middle East</strong>, <strong>East Asia</strong>, <strong>Southeast Asia</strong>, and <strong>South America</strong>, and speak the <strong>six official languages of the United Nations</strong>.
              </p>
            </div>

            <div class="mt-8 pt-6 border-t-2 border-[#ef4444]">
              <p class="mb-4 text-center text-sm text-gray-600">
                Additional links:
              </p>
              <div class="flex gap-3 flex-wrap justify-center">
                <a
                  href="https://twitter.com/zkevinbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-300 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <i class="fab fa-twitter text-base"></i>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://web.archive.org/web/20240622002720/https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-raleway text-sm font-medium no-underline transition-all duration-300 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <i class="fas fa-address-card text-base"></i>
                  <span>UC Berkeley Feature</span>
                </a>
              </div>
            </div>
          `
        }}
      />
    </div>
  )
}
