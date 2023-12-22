// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import Modal from 'react-modal';
// import { database, auth } from '../../../../firebase';

// const EditUser = ({ userID1, isOpen, onRequestClose, fetchupdate }) => {
//     const [email, setEmail] = useState('');
//     const [usernamenhap, setUsername] = useState('');
//     const [passwordnhap, setPassword] = useState('');

//     const updatedUser = async (userid) => {
//         const Update = doc(database, 'User', userid);
//         // Set the "capital" field of the city 'DC'
//         await updateDoc(Update, {
//             // capital: true,
//             email: email,
//             username: usernamenhap,
//             password: passwordnhap,
//         });
//         fetchupdate = fetchupdate;
//         alert('thành công');
//     };
//     // useEffect(()=>(

//     // ),[])

//     return (
//         <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//             <button onClick={() => onRequestClose()}>Hủy</button>
//             <h2>Sửa thông tin tài khoản</h2>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Email đăng nhập"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     type="text"
//                     placeholder="Tên đăng nhập"
//                     value={usernamenhap}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     type="text"
//                     placeholder="Mật khẩu"
//                     value={passwordnhap}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <h1> {userID1} </h1>
//             <button onClick={() => updatedUser(userID1)}>Lưu</button>
//             {/* <button>Lưu</button> */}
//         </Modal>
//     );
// };

// export default EditUser;
import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import Modal from 'react-modal';
import { database } from '../../../../firebase';

const EditUser = ({ userID1, isOpen, onRequestClose, fetchupdate }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(database, `user/${userID1}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
    });
  }, [userID1]);

  const updatedUser = async (userid) => {
    const updatePath = `user/${userid}`;
    const updates = {
      email: email,
      username: username,
      password: password,
    };
    await update(ref(database), { [updatePath]: updates });
    fetchupdate = fetchupdate;
    alert('Thành công');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <button onClick={() => onRequestClose()}>Hủy</button>
      <h2>Sửa thông tin tài khoản</h2>
      <div>
        <input
          type="text"
          placeholder="Email đăng nhập"
        //   value={userData?.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Tên đăng nhập"
        //   value={userData?.username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Mật khẩu"
        //   value={userData?.password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <h1>{userID1}</h1>
      <button onClick={() => updatedUser(userID1)}>Lưu</button>
    </Modal>
  );
};

export default EditUser;