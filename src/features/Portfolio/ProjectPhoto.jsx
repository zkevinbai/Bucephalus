import TimeTravelTicTacToeImg from '../../assets/projects/TimeTravelTicTacToe.png'
import AurelianImg from '../../assets/projects/Aurelian.png'
import VerbaImg from '../../assets/projects/Verba.png'
import AlexandriaImg from '../../assets/projects/Alexandria.png'
import AugustusImg from '../../assets/projects/Augustus.png'

const images = {
  'Time Travel Tic Tac Toe': TimeTravelTicTacToeImg,
  Aurelian: AurelianImg,
  Verba: VerbaImg,
  Alexandria: AlexandriaImg,
  Augustus: AugustusImg,
}

export default function ProjectPhoto({ title }) {
  return (
    <div className="flex items-center justify-center p-4 w-full h-full group max-[950px]:p-3">
      <img
        src={images[title]}
        alt={`${title} screenshot`}
        className="w-full max-h-80 h-auto rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-300 object-cover group-hover:scale-[1.02] group-hover:shadow-[0_12px_32px_rgba(239,68,68,0.3)] group-hover:border-[rgba(239,68,68,0.3)] max-[950px]:max-h-48"
      />
    </div>
  )
}