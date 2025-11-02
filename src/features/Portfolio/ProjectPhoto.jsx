import AurelianImg from '../../assets/projects/Aurelian.png'
import AlexandriaImg from '../../assets/projects/Alexandria.png'
import AugustusImg from '../../assets/projects/Augustus.png'

const images = {
  Aurelian: AurelianImg,
  Alexandria: AlexandriaImg,
  Augustus: AugustusImg,
}

export default function ProjectPhoto({ title }) {
  return (
    <div className="flex items-center justify-center p-4 w-full h-full group max-[800px]:p-3">
      <img
        src={images[title]}
        alt={`${title} screenshot`}
        className="w-full max-h-80 h-auto rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-300 object-cover group-hover:scale-[1.02] group-hover:shadow-[0_12px_32px_rgba(48,127,246,0.3)] group-hover:border-[rgba(48,127,246,0.3)] max-[800px]:max-h-48"
      />
    </div>
  )
}