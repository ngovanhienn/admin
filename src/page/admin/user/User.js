import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import { currentUser } from 'firebase/auth';
import { getAuth, deleteUser } from 'firebase/auth';
import Modal from 'react-modal';
// import 'react-modal/style.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth } from '../../../firebase';
import config from '../../../configRoute';
import Home from '../../Home/Home';
import '../style/style.css';
import EditUser from './UpdateUser/Updateuser';
import AddUser from './AddUser/AddUser';
const User = () => {
    const [user, setUser] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [idchon, setIdchon] = useState();
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernamenhap, setUsername] = useState('');
    const [passwordnhap, setPassword] = useState('');

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };
    const fetchUser = async () => {
        await getDocs(collection(db, 'User')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, usename: doc.username }));
            setUser(newData);
            // console.log('user:', user, 'Newdata: ', newData);
        });
    };

    const deleteUserID = async (userId) => {
       
        try { 
            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user)
                .then(() => {
                    // User deleted.
                    alert('đã xóa');
                })
                .catch((error) => {
                    // An error ocurred
                    console.log('Lỗi: ', error);
                    // ...
                });

            await deleteDoc(doc(db, 'User', userId));
            console.log('Document successfully deleted!');
            // Gọi lại fetchPost để cập nhật danh sách user sau khi xóa
            fetchUser();
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

  
    const openModal = (userID2) => {
        const selectedProduct = user.find((uses) => uses.id === userID2);
        if (selectedProduct) {
            setModalIsOpen(true);
            setIdchon(userID2);
            // console.log('id được chọn: ', userID2);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    useEffect(() => {
        fetchUser();
        console.log('id được chọn: ', idchon);

        // openModal();
    }, [idchon]);

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
                    <h2>Người dùng</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" />
                        <button className="btnsearch">Search</button>
                    </div>
                    
                 
                </div>
               
                <div>
                <Table striped bordered hover >
                    <thead >
                        <tr >
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Username</th>
                            <th style={{ textAlign: 'center' }}>Tùy chọn</th>
                        </tr>
                    </thead>

                    {user.map((users, index) => (
                        <tbody key={users.id}>
                            <tr >
                                <td>{users.email} </td>
                                <td>{users.username}</td>
                                
                               
                                <td >
                                    <div >
                                        <button
                                            className="btnsearch"
                                             onClick={() => deleteUserID(users.id)}
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

            </div>
        </Home>
    );
};

export default User;
