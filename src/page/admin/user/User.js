// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// // import { currentUser } from 'firebase/auth';
// import { getAuth, deleteUser } from 'firebase/auth';
// import Modal from 'react-modal';
// // import 'react-modal/style.css';

// import { database, auth } from '../../../firebase';
// import config from '../../../configRoute';
// import Home from '../../Home/Home';
// import '../style/style.css';
// import EditUser from './UpdateUser/Updateuser';
// import AddUser from './AddUser/AddUser';
// const User = () => {
//     const [user, setUser] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [idchon, setIdchon] = useState();
//     const [selectedEmail, setSelectedEmail] = useState('');
//     const [selectedUsername, setSelectedUsername] = useState('');
//     const [selectedPassword, setSelectedPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [usernamenhap, setUsername] = useState('');
//     const [passwordnhap, setPassword] = useState('');

//     // const [isModalOpen, setIsModalOpen] = useState(false);
//     // const [selectedUser, setSelectedUser] = useState(null);
//     // const openModal = () => {
//     //     setIsModalOpen(true);
//     // };

//     // const closeModal = () => {
//     //     setIsModalOpen(false);
//     // };
//     const fetchUser = async () => {
//         await getDocs(collection(db, 'User')).then((querySnapshot) => {
//             const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, usename: doc.username }));
//             setUser(newData);
//             // console.log('user:', user, 'Newdata: ', newData);
//         });
//     };

//     const deleteUserID = async (userId) => {
       
//         try {
           
//             const auth = getAuth();
//             const user = auth.currentUser;
//             deleteUser(user)
//                 .then(() => {
//                     // User deleted.
//                     alert('đã xóa');
//                 })
//                 .catch((error) => {
//                     // An error ocurred
//                     console.log('Lỗi: ', error);
//                     // ...
//                 });

//             await deleteDoc(doc(db, 'User', userId));
//             console.log('Document successfully deleted!');
//             // Gọi lại fetchPost để cập nhật danh sách user sau khi xóa
//             fetchUser();
//         } catch (error) {
//             console.error('Error removing document: ', error);
//         }
//     };

  
//     const openModal = (userID2) => {
//         const selectedProduct = user.find((uses) => uses.id === userID2);
//         if (selectedProduct) {
//             setModalIsOpen(true);
//             setIdchon(userID2);
//             // console.log('id được chọn: ', userID2);
//         }
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//     };


//     useEffect(() => {
//         fetchUser();
//         console.log('id được chọn: ', idchon);

//         // openModal();
//     }, [idchon]);

//     return (
//         <Home>
//             {/* Giao diện màn hình user */}
//             <div>
//                 <div className="adminhead">
//                     <h2>Use</h2>
//                     <div style={{ display: 'flex' }}>
//                         <input placeholder="Search" />
//                         <button className="btnsearch">Search</button>
//                     </div>
//                     <NavLink to={config.routes.adduser}>
//                         <button className="btnsearch">Thêm</button>
//                     </NavLink>
//                     {/* <button className="btnsearch" onClick={() => openModal()}>
//                         Thêm
//                     </button> */}
                 
//                 </div>
//                 <div>
//                     <div
//                         style={{
//                             // display: 'flex',
//                             // justifyContent: 'space-between',
//                             alignItems: 'center',
//                             borderBottom: '1px',
//                         }}
//                     >
//                         {user.map((users, index) => (
//                             <div
//                                 key={index}
//                                 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//                             >
//                                 <div style={{ flex: '3' }}>
//                                     {/* <h3 style={{ marginBottom: 10 }}>Email</h3> */}
//                                     <h3>{users.email}</h3>
//                                 </div>
//                                 <div style={{ flex: '2' }}>
//                                     {/* <h3 style={{ marginBottom: 10 }}>Password</h3> */}
//                                     <h3>{users.password}</h3>
//                                 </div>
//                                 <div style={{ flex: '2' }}>
//                                     {/* <h3 style={{ marginBottom: 10 }}>Password</h3> */}
//                                     <h3>{users.username}</h3>
//                                 </div>
//                                 <div style={{ flex: '1' }}>
//                                     <button onClick={() => deleteUserID(users.id)}>
//                                         <span>delete</span>
//                                     </button>
//                                 </div>
//                                 <div style={{ flex: '1' }}>
//                                     {/* <button
//                                         onClick={() => {
                                            
//                                         }}
//                                     >
//                                         <span>Sửa</span>
//                                     </button> */}
//                                     {/* <NavLink to={config.routes.edituser}>
                                        
//                                     </NavLink> */}
//                                     <div>
//                                         <button
//                                             className="btnsearch"
//                                             onClick={() => openModal(users.id)}
//                                             // onClick={() => openModal(users.email, users.username, users.password)}
//                                         >
//                                             sửa
//                                         </button>
//                                         <EditUser
//                                             isOpen={modalIsOpen}
//                                             onRequestClose={closeModal}
//                                             userID1={idchon}
//                                             fetchupdate={fetchUser()}
//                                             // selectedUser={selectedUsername}
//                                             // selectedPassword={selectedPassword}
//                                         />
                                        
//                                         {/* </Modal> */}
//                                     </div>
//                                 </div>
                               
//                             </div>
//                         ))}

//                         {/* <h3>passwword</h3>
//                         <button>
//                             <span>delete</span>
//                         </button> */}
//                     </div>
//                 </div>
//             </div>
//         </Home>
//     );
// };

// export default User;

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ref, onValue, remove, update } from 'firebase/database';
import { getAuth, deleteUser } from 'firebase/auth';
import Modal from 'react-modal';
import { database, auth } from '../../../firebase';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchUser = () => {
    const databaseRef = ref(database, 'user');
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newData = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
          username: data[key].username,
        }));
        setUser(newData);
      }
    });
  };

  const deleteUserID = async (userId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          alert('Đã xóa');
        })
        .catch((error) => {
          console.log('Lỗi: ', error);
        });

      const databaseRef = ref(database, `user/${userId}`);
      remove(databaseRef);
      console.log('Document successfully deleted!');
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
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Home>
      <div>
        <div className="adminhead">
          <h2>User</h2>
          <div style={{ display: 'flex' }}>
            <input placeholder="Search" />
            <button className="btnsearch">Search</button>
          </div>
          <NavLink to={config.routes.adduser}>
            <button className="btnsearch">Thêm</button>
          </NavLink>
        </div>
        <div>
          <div>
            {user.map((users, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: '3' }}>
                  <h3>{users.email}</h3>
                </div>
                <div style={{ flex: '2' }}>
                  <h3>{users.password}</h3>
                </div>
                <div style={{ flex: '2' }}>
                  <h3>{users.username}</h3>
                </div>
                <div style={{ flex: '1' }}>
                  <button onClick={() => deleteUserID(users.id)}>
                    <span>delete</span>
                  </button>
                </div>
                <div style={{ flex: '1' }}>
                  <div>
                    <button className="btnsearch" onClick={() => openModal(users.id)}>
                      Sửa
                    </button>
                    <EditUser
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      userID1={idchon}
                      fetchupdate={fetchUser}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Home>
  );
};

export default User;