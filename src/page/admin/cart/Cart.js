// import { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc, updateDoc, or } from 'firebase/firestore';
// import { Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { db } from '../../../firebase';
// import TopContainer from '../../../component/TopContainer';
// import Home from '../../Home/Home';
// const Cart = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [order, setOrder] = useState([]);
//     const fetchOrder = async () => {
//         await getDocs(collection(db, 'Order')).then((querySnapshot) => {
//             // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             // setProduct(newData);
//             const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
//             // setCategoryData(newData);
//             setOrder(newData);
//             // console.log('category:', order);
//         });
//     };
//     useEffect(() => {
//         fetchOrder();
//         console.log('data order: ', order, 'type: ', typeof order);
//     }, []);
//     const handleSearch = () => {
//         const filteredCategory = order.filter((order) =>
//             order.username.toLowerCase().includes(searchKeyword.toLowerCase()),
//         );
//         // setSearchResult(filteredProducts);

//         setOrder(filteredCategory);
//     };
//     const handleSearchKeyword = (event) => {
//         setSearchKeyword(event.target.value);
//     };
//     return (
//         <Home>
//             <TopContainer
//                 value={searchKeyword}
//                 onChange={handleSearchKeyword}
//                 onClick={handleSearch}
//                 title="Đơn hàng"
//                 // to
//             />
//             <div>
//                 <Table striped bordered hover >
//                     <thead >
//                         <tr >
//                             <th style={{ textAlign: 'center' }}>STT</th>
//                             <th style={{ textAlign: 'center' }}>Username</th>
//                             <th style={{ textAlign: 'center' }}>Tên người nhận</th>
//                             <th style={{ textAlign: 'center' }}>Số điện thoại</th>
//                             <th style={{ textAlign: 'center' }}>Địa chỉ</th>
//                             <th style={{ textAlign: 'center' }}>Ngày đặt</th>
//                             <th style={{ textAlign: 'center' }}>Tổng tiền</th>
//                             <th style={{ textAlign: 'center' }}>Trạng thái</th>
//                             <th style={{ textAlign: 'center' }}>Chức năng</th>
//                         </tr>
//                     </thead>

//                     {order.map((orders) => (
//                         <tbody key={orders.id}>
//                             <tr >
//                                 <td>{orders.stt} </td>
//                                 <td>{orders.username}</td>
//                                 <td>{orders.tennguoinhan}</td>
//                                 <td>{orders.sodienthoai}</td>
//                                 <td>{orders.diachi}</td>
//                                 <td>{orders.ngaydat.toDate().toLocaleDateString()}</td>
//                                 {/* <td>ngay thang</td> */}
//                                 <td>{orders.tongtien}</td>
//                                 <td style={{ textAlign: 'center' }}>
//                                     <div>
//                                         {orders.state == 'Đang giao hàng' ? (
//                                             <div
//                                                 style={{
//                                                     backgroundColor: '#F2DF35',
//                                                     borderRadius: 40,
                                                    
//                                                 }}
//                                             >
//                                                 <span style={{ color: '#fff',  fontSize: 24 }}>
//                                                     {orders.state}
//                                                 </span>
//                                             </div>
//                                         ) : (
//                                             <div style={{ backgroundColor: '#52de70', borderRadius: 40 }}>
//                                                 <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
//                                                     {orders.state}
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div>
//                                         <button
//                                             className="btnsearch"
//                                             // onClick={() => openModal(users.id)}
//                                             // onClick={() => openModal(users.email, users.username, users.password)}
//                                         >
//                                             Xóa
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     ))}
//                 </Table>
//             </div>
//         </Home>
//     );
// };
// export default Cart;


import React, { useEffect, useState ,styles} from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import { db, storage } from '../../../firebase';
import Home from '../../Home/Home';
import TopContainer2 from '../../../component/TopContainer';
// import '../cart/cart.css';
import { forwardRef } from 'react';

const Cart = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [listOrder, setListOrder] = useState([]);
    const [idChon, setIdCHon] = useState('');

    const FetchOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc, index) => ({
                ...doc.data(),
                id: doc.id,
                stt: index + 1,
            }));
            setListOrder(newData);
            console.log('Order:', listOrder, 'Newdata: ', newData);
        });
        // };
    };
    useEffect(() => {
        FetchOrder();
    }, []);
    const huyDon = async (orderid) => {
        try {
            const id = listOrder.find((item) => item.id === orderid && item.state == 'Đang giao hàng');
            if (id) {
                const Update = doc(db, 'Order', orderid);
                await updateDoc(Update, {
                    state: 'Đã hủy',
                });
                FetchOrder();
                alert('Thành công');
            } else {
                alert('Không thể hủy đơn');
            }
        } catch (err) {
            console.log('Lỗi: ', err);
        }
    };
    const handleSearch = () => {
        const filteredCategory = listOrder.filter((orders) =>
            orders.username.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        setListOrder(filteredCategory);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };
    return (
        <Home>
            {/* Giao diện màn hình home */}
            {/* <h1>ListOrder Screen!</h1> */}
            <div>
                <div>
                    <TopContainer2
                        value={searchKeyword}
                        onChange={handleSearchKeyword}
                        onClick={handleSearch}
                        title="Đơn hàng"
                    />
                </div>

                <Table striped bordered hover>
                    <thead style={{textAlign:'center'}}>
                        <tr>
                            <th>STT</th>
                            {/* <th>Username</th> */}
                            <th>Tên người nhận</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                            <th>Tùy chọn </th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:'center'}}>
                        {listOrder.map((order) => (
                            <tr key={order.id}>
                                <th>{order.stt}</th>
                                {/* <th> {order.username} </th> */}
                                <th>{order.tennguoinhan}</th>
                                <th>{order.sodienthoai}</th>
                                <th>{order.diachi}</th>
                                <th>{order.ngaydat.toDate().toLocaleDateString()}</th>
                                <th>{order.tongtien.toLocaleString()}</th>
                                <td style={{ textAlign: 'center' }}>
    <div>
        {order.state === 'Đang giao hàng' ? (
            <div
                style={{
                    backgroundColor: '#F2DF35',
                    borderRadius: 40,
                }}
            >
                <span style={{ color: '#fff', fontSize: 24 }}>
                    {order.state}
                </span>
            </div>
        ) : order.state === 'Đã hủy' ? (
            <div style={{ backgroundColor: 'red', borderRadius: 40 }}>
                <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
                    {order.state}
                </span>
            </div>
        ) : (
            <div style={{ backgroundColor: '#52de70', borderRadius: 40 }}>
                <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
                    {order.state}
                </span>
            </div>
        )}
    </div>
</td>

                                <td>
                                    <div>
                                        <button onClick={() => huyDon(order.id)}>
                                            <span >Hủy đơn</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Home>
    );
};

export default Cart;