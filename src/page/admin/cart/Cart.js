import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, or } from 'firebase/firestore';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '../../../firebase';
import TopContainer from '../../../component/TopContainer';
import Home from '../../Home/Home';
const Cart = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [order, setOrder] = useState([]);
    const fetchOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setProduct(newData);
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            // setCategoryData(newData);
            setOrder(newData);
            // console.log('category:', order);
        });
    };
    useEffect(() => {
        fetchOrder();
        console.log('data order: ', order, 'type: ', typeof order);
    }, []);
    const handleSearch = () => {
        const filteredCategory = order.filter((order) =>
            order.username.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        // setSearchResult(filteredProducts);

        setOrder(filteredCategory);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };
    return (
        <Home>
            <TopContainer
                value={searchKeyword}
                onChange={handleSearchKeyword}
                onClick={handleSearch}
                title="Đơn hàng"
                // to
            />
            <div>
                <Table striped bordered hover >
                    <thead >
                        <tr >
                            <th style={{ textAlign: 'center' }}>STT</th>
                            <th style={{ textAlign: 'center' }}>Username</th>
                            <th style={{ textAlign: 'center' }}>Tên người nhận</th>
                            <th style={{ textAlign: 'center' }}>Số điện thoại</th>
                            <th style={{ textAlign: 'center' }}>Địa chỉ</th>
                            <th style={{ textAlign: 'center' }}>Ngày đặt</th>
                            <th style={{ textAlign: 'center' }}>Tổng tiền</th>
                            <th style={{ textAlign: 'center' }}>Trạng thái</th>
                            <th style={{ textAlign: 'center' }}>Chức năng</th>
                        </tr>
                    </thead>

                    {order.map((orders) => (
                        <tbody key={orders.id}>
                            <tr >
                                <td>{orders.stt} </td>
                                <td>{orders.username}</td>
                                <td>{orders.tennguoinhan}</td>
                                <td>{orders.sodienthoai}</td>
                                <td>{orders.diachi}</td>
                                <td>{orders.ngaydat.toDate().toLocaleDateString()}</td>
                                {/* <td>ngay thang</td> */}
                                <td>{orders.tongtien}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div>
                                        {orders.state == 'Đang giao hàng' ? (
                                            <div
                                                style={{
                                                    backgroundColor: '#F2DF35',
                                                    borderRadius: 40,
                                                    
                                                }}
                                            >
                                                <span style={{ color: '#fff',  fontSize: 24 }}>
                                                    {orders.state}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ backgroundColor: '#52de70', borderRadius: 40 }}>
                                                <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
                                                    {orders.state}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            className="btnsearch"
                                            // onClick={() => openModal(users.id)}
                                            // onClick={() => openModal(users.email, users.username, users.password)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </Home>
    );
};
export default Cart;