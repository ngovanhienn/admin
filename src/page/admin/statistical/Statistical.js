// const totalAmount = products.reduce(
//     (total, product) => total + product.price * product.quantity,
//     0,
//   );
//   let formattedTotalAmount = totalAmount.toLocaleString();

//thu vien
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
//Cac component khac
import { db } from '../.././../firebase';
import Home from '../../Home/Home';
import TopContainer from '../../../component/TopContainer';
import { Table } from 'react-bootstrap';

const Statistical = () => {
    const [data, setData] = useState([]);
    const [sp, setSp] = useState([]);
    const [cate, setCate] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        delivered: 0,
        inProgress: 0,
        canceled: 0,
    });
    // const [dagiao, setDagiao] = useState([]);
    // const [danggiao, setDanggiao] = useState([]);
    // const [huy, setHuy] = useState([]);
    // const [totalAmount, setTotalAmount] = useState(0);
    const dataOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setData(newData);
        });
    };

    const dataSp = async () => {
        await getDocs(collection(db, 'Product')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setSp(newData);
        });
    };

    const dataCate = async () => {
        await getDocs(collection(db, 'Category')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setCate(newData);
        });
    };
    //tong tien
    // const totalAmount = data.reduce((total, product) => total + parseInt(product.tongtien), 0);
    // let formattedTotalAmount = totalAmount.toLocaleString();
    const totalAmount = data.reduce((total, product) => total + product.tongtien, 0);
    let formattedTotalAmount = totalAmount.toLocaleString();
    //tong trang thai

    useEffect(() => {
        const counts = data.reduce(
            (count, product) => {
                const status = product.state;
                if (status === 'Đang giao hàng') {
                    count.delivered++;
                } else if (status === 'Đã giao') {
                    count.inProgress++;
                } else if (status === 'Đã hủy') {
                    count.canceled++;
                }
                return count;
            },
            { delivered: 0, inProgress: 0, canceled: 0 },
        );
        setStatusCounts(counts);
        dataOrder();
        dataSp();
        dataCate();
        console.log('data order: ', data);
        // console.log('tong tien: ', formattedTotalAmount);
    }, [data]);

    return (
        <Home>
            <TopContainer
                // value={searchKeyword}
                // onChange={handleSearchKeyword}
                // onClick={handleSearch}
                title="Thống kê"
            />
            <div>
                <h2>Tổng số tiền</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Số tiền (VND)</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>{formattedTotalAmount} </th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div>
                <h2>Đơn hàng</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Trạng thái</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Đơn hàng đang giao</td>
                            <td>{statusCounts.delivered}</td>
                        </tr>
                        <tr>
                            <td>Đơn hàng đã giao</td>
                            <td>{statusCounts.inProgress}</td>
                        </tr>
                        <tr>
                            <td>Đơn hàng đã hủy</td>
                            <td>{statusCounts.canceled}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <h2>Số loại sản phẩm</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Số loại sản phẩm đã có</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>{cate.length} </th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <h2>Số sản phẩm</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Số sản phẩm đã có</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>{sp.length} </th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Home>
    );
};

export default Statistical;