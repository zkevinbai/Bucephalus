const links = [
  {
    icon: 'fas fa-address-card',
    label: 'About',
    href: 'https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai',
  },
  {
    icon: 'fas fa-paper-plane',
    label: 'Email',
    href: 'mailto:hello@zkevinbai.com',
  },
  {
    icon: 'fab fa-github',
    label: 'Github',
    href: 'https://github.com/zkevinbai',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zkevinbai/',
  },
]

export default function LinksContainer() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] justify-items-start items-center gap-6 p-8 max-[950px]:justify-items-center max-[950px]:p-6 max-[950px]:gap-4">
      <div className="text-2xl font-semibold text-gray-800 font-raleway max-[950px]:text-center">
        Full Stack Software Engineer
      </div>
      <div className="flex flex-wrap gap-4 w-full max-[950px]:justify-center max-[950px]:gap-3">
        {links.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 font-raleway text-base font-normal no-underline transition-all duration-300 hover:bg-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.6)] hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)] max-[950px]:text-sm max-[950px]:px-4 max-[950px]:py-2.5"
          >
            <i className={`${icon} text-lg`} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}