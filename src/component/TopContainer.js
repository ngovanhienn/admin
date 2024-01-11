import { NavLink } from 'react-router-dom';
import '../page/admin/style/style.css';
const TopContainer = ({ title, value, onChange, onClick, to }) => {
    return (
        <div className="adminhead">
            <h2>{title}</h2>
            <div style={{ display: 'flex' }}>
                <input placeholder="Search" value={value} onChange={onChange} />
                <button className="btnsearch" onClick={onClick}>
                    Search
                </button>
            </div>
            <NavLink to={to}>
                <button className="btnsearch">Thêm</button>
            </NavLink>
        </div>
    );
};
export default TopContainer;