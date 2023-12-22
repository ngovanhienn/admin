// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import Modal from 'react-modal';

// import styles from './adduser.module.css';
// import { database, auth } from '../../../../firebase';
// const AddUser = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');

//     const [user, setUser] = useState([]);

//     const addUser = async (e) => {
//         e.preventDefault();

//         try {
//             await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 // console.log(user);
//                 // ...
//             });
//             const docRef = await addDoc(collection(database, 'User'), {
//                 email: email,
//                 password: password,
//                 username: name,
//             });
//             console.log('Document written with ID: ', docRef.id);
//             alert('Thêm thành công');
//         } catch (e) {
//             // console.error('Error adding document: ', e);
//             const errorCode = e.code;
//             let errorMessage = '';

//             switch (errorCode) {
//                 case 'auth/email-already-in-use':
//                     errorMessage = 'Email đã được sử dụng';
//                     break;
//                 // Các mã lỗi khác và thông báo tương ứng
//                 default:
//                     errorMessage = 'Đã xảy ra lỗi';
//                     break;
//             }

//             alert(errorMessage);
//             // alert(e);
//         }
//     };

//     const fetchPost = async () => {
//         await getDocs(collection(database, 'User')).then((querySnapshot) => {
//             const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             setUser(newData);
//             console.log('user:', user, 'Newdata: ', newData);
//         });
//     };

//     useEffect(() => {
//         fetchPost();
//     }, []);

//     return (
//         // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//         //     <button onClick={() => onRequestClose()}>Trở lại</button>
//         <section className={styles.todocontainer}>
//             <div className={styles.todo}>
//                 <h1 className={styles.header}>Add User</h1>

//                 <div>
//                     <div>
//                         <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
//                         <input
//                             type="text"
//                             placeholder="Nhập password ..."
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Nhập tên người dùng ..."
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>

//                     <div className={styles.btncontainer}>
//                         <button type="submit" className={styles.todocontainer} onClick={addUser}>
//                             Thêm
//                         </button>
//                     </div>
//                 </div>

//                 <div className={styles.todocontent}>
//                     {user?.map((users, i) => (
//                         <p key={i}>{users.email}</p>
//                     ))}
//                     {/* {todos?.map((todo, i) => (
//                         <p key={i}>{todo.password}</p>
//                     ))} */}
//                 </div>
//             </div>
//         </section>
//         // </Modal>
//     );
// };

// export default AddUser;

// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, push } from 'firebase/database';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// import styles from './adduser.module.css';
// import { database, auth } from '../../../../firebase';

// const AddUser = () => {
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [username, setName] = useState('');
// const [user, setUser] = useState([]);

// const addUser = async (e) => {
// e.preventDefault();
// try {
//     await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//       const user = userCredential.user;
//     });
  
//     const databaseRef = ref(database);
//     const newUserRef = push(databaseRef.child('user'));
//     newUserRef.set({
//       email: email,
//       password: password,
//       username: username,
//     });
  
//     console.log('User added successfully');
//     alert('Thêm thành công');
//   } catch (e) {
//     const errorCode = e.code;
//     let errorMessage = '';
  
//     switch (errorCode) {
//       case 'auth/email-already-in-use':
//         errorMessage = 'Email đã được sử dụng';
//         break;
//       default:
//         errorMessage = 'Đã xảy ra lỗi';
//         break;
//     }
  
//     alert(errorMessage);
//   }
// };

// const fetchUser = async () => {
// const databaseRef = ref(database);
// const userRef = ref(databaseRef.child('user'));
// userRef.on('value', (snapshot) => {
//     const data = snapshot.val();
//     const newData = Object.keys(data).map((key) => ({
//       id: key,
//       ...data[key],
//     }));
//     setUser(newData);
//     console.log('user:', user, 'Newdata: ', newData);
//   });
// };

// useEffect(() => {
// fetchUser();
// }, []);

// return (
// <section className={styles.todocontainer}>
// <div className={styles.todo}>
// <h1 className={styles.header}>Add User</h1>
// <div>
//       <div>
//         <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
//         <input type="text" placeholder="Nhập password ..." onChange={(e) => setPassword(e.target.value)} />
//         <input type="text" placeholder="Nhập tên người dùng ..." onChange={(e) => setName(e.target.value)} />
//       </div>

//       <div className={styles.btncontainer}>
//         <button type="submit" className={styles.todocontainer} onClick={addUser}>
//           Thêm
//         </button>
//       </div>
//     </div>

//     <div className={styles.todocontent}>
//       {user?.map((users, i) => (
//         <p key={i}>{users.email}</p>
//       ))}
//     </div>
//   </div>
// </section>
// );
// };

// export default AddUser;

// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, push, set } from 'firebase/database';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// import styles from './adduser.module.css';
// import { database, auth } from '../../../../firebase';

// const AddUser = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [users, setUsers] = useState([]);

//   const addUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const databaseRef = ref(getDatabase());
//       const newUserRef = push(ref(databaseRef, 'user'));
//       set(newUserRef, {
//         email: email,
//         password: password,
//         username: username,
//       });

//       console.log('User added successfully');
//       alert('Thêm thành công');
//     } catch (e) {
//       const errorCode = e.code;
//       let errorMessage = '';

//       switch (errorCode) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'Email đã được sử dụng';
//           break;
//         default:
//           errorMessage = 'Đã xảy ra lỗi';
//           break;
//       }

//       alert(errorMessage);
//     }
//   };

//   const fetchUser = async () => {
//     const databaseRef = ref(getDatabase());
//     const userRef = ref(databaseRef, 'user');
//     userRef.on('value', (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const newData = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setUsers(newData);
//         console.log('user:', users, 'Newdata: ', newData);
//       }
//     });
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <section className={styles.todocontainer}>
//       <div className={styles.todo}>
//         <h1 className={styles.header}>Add User</h1>
//         <div>
//           <div>
//             <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
//             <input type="text" placeholder="Nhập password ..." onChange={(e) => setPassword(e.target.value)} />
//             <input type="text" placeholder="Nhập tên người dùng ..." onChange={(e) => setUsername(e.target.value)} />
//           </div>

//           <div className={styles.btncontainer}>
//             <button type="submit" className={styles.todocontainer} onClick={addUser}>
//               Thêm
//             </button>
//           </div>
//         </div>

//         <div className={styles.todocontent}>
//           {users?.map((user, i) => (
//             <p key={i}>{user.email}</p>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddUser;

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import styles from './adduser.module.css';
import { database, auth } from '../../../../firebase';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [user, setUser] = useState([]);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
      });

    //   const databaseRef = ref(getDatabase());
    //   const newUserRef = push(database, 'user/');
    const newUserRef = push(ref(database, 'user/'));
    set(newUserRef,{
        email: email,
        password: password,
        username: username,
      });

      console.log('User added successfully');
      alert('Thêm thành công');
    } catch (e) {
      const errorCode = e.code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email đã được sử dụng';
          break;
        default:
          errorMessage = 'Đã xảy ra lỗi';
          break;
      }

      alert(errorMessage);
    // console.log(e)
    }
  };

//   const fetchUser = async () => {
//     // const databaseRef = ref(getDatabase());
//     const userRef = ref(database, 'user');
//     userRef.on('value', (snapshot) => {
//       const data = snapshot.val();
//       const newData = Object.keys(data).map((key) => ({
//         id: key,
//         ...data[key],
//       }));
//       setUser(newData);
//       console.log('user:', user, 'Newdata: ', newData);
//     });
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

  return (
    <section className={styles.todocontainer}>
      <div className={styles.todo}>
        <h1 className={styles.header}>Add User</h1>
        <div>
          <div>
            <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Nhập password ..." onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Nhập tên người dùng ..." onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.btncontainer}>
            <button type="submit" className={styles.todocontainer} onClick={addUser}>
              Thêm
            </button>
          </div>
        </div>

        {/* <div className={styles.todocontent}>
          {user?.map((users, i) => (
            <p key={i}>{users.email}</p>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default AddUser;