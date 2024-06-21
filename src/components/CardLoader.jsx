import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardLoader = () => {
  return (
    <div className="shadow-sm">
        <Skeleton height={150} width={400} />
        <Skeleton count={3} />
    </div>
  )
}

export default CardLoader