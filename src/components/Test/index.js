import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const Home = () => (
<>
<Header/>
<div className='main-layout'>
    <div className='sidebar-layout'>
    <Sidebar/>
    </div>
    <div className='component-layout'>mmmmm</div>
</div>

</>
)
export default Home