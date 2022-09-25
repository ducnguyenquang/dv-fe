import { History } from './components/History';
import { Focusing } from './components/Focusing';


import './Information.less'

const Information = (): JSX.Element => {
  return <div className='information'>
    <History />
    <Focusing />
  </div>
}

export default Information;
