import { History } from './components/History';
import { Focusing } from './components/Focusing';
import { Distributor } from './components/Distributor';
import './Information.less'

const Information = (): JSX.Element => {
  return <div className='information'>
    <History />
    <Focusing />
    <Distributor />
  </div>
}

export default Information;
