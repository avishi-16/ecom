import Search from '../../components/Search/Search';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';


const Dashboard = () => {
  return (
    <div className="d-container">
      <Sidebar />
      <div className="d-main">
        <Search />
      </div>
    </div>
  );
};

export default Dashboard;