// import React, { useState } from 'react';
// import styleaddpro from './Addcategory.module.css';
// import {  uploadBytes, getDownloadURL } from 'firebase/storage';
// // import { collection, addDoc } from 'firebase/firestore';
// import { ref, set,push } from 'firebase/database';
// // import Modal from 'react-modal';

// // import { storage, db } from '../../../../firebase';
// import { storage, db } from '../../../firebase';

// function AddCategory() {
//     const [imageUpload, setImageUpload] = useState();
//     const [categoryname, setCategoryname] = useState('');
//     const [imageUrl, setImageUrl] = useState('');

//     const uploadFile = () => {
//         if (!imageUpload) return;

//         const imageRef = ref(storage, `images/Category/${imageUpload.name}`);

//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 console.log(url);
//                 setImageUrl(url);
//                 alert('Upload thành công');
//             });
//         });
//     };
//     console.log('day là link anh: ', imageUrl);

//     // const addProduct = async (e) => {
//     //     e.preventDefault();

//     //     try {
//     //         const docRef = await addDoc(collection(db, 'Category'), {
//     //             categoryname: categoryname,
//     //             image: imageUrl,
//     //         });
//     //         console.log('Document written with ID: ', docRef.id);
//     //         alert('Thêm thành công');
//     //     } catch (e) {
//     //         console.error('Error adding document: ', e);
//     //     }
//     // };

//     // const addProduct = (e) => {
//     //     e.preventDefault();
    
//     //     try {
//     //         const categoryRef = ref(db, 'Category');
//     //         const newCategoryRef = push(categoryRef);
//     //         const newCategoryId = newCategoryRef.key;
    
//     //         set(newCategoryRef, {
//     //             categoryname: categoryname,
//     //             image: imageUrl,
//     //         }).then(() => {
//     //             console.log('Data written successfully');
//     //             alert('Thêm thành công');
//     //         });
//     //     } catch (error) {
//     //         console.error('Error writing data: ', error);
//     //     }
//     // };
//     const addProduct = (e) => {
//         e.preventDefault();
    
//         try {
//             const categoryRef = ref(db, 'Category');
//             const newCategoryRef = push(categoryRef);
    
//             set(newCategoryRef, {
//                 categoryname: categoryname,
//                 image: imageUrl,
//             }).then(() => {
//                 console.log('Data written successfully');
//                 alert('Thêm thành công');
//             });
//         } catch (error) {
//             console.error('Error writing data: ', error);
//         }
//     };

//     return (
//         // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//         //     <button onClick={() => onRequestClose()}>Trở lại</button>
//         <section className={styleaddpro.todocontainer}>
//             <div className={styleaddpro.todo}>
//                 <h1 className={styleaddpro.header}>Add Product</h1>

//                 <div>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Nhập tên loại sản phẩm ..."
//                             value={categoryname}
//                             onChange={(e) => setCategoryname(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="file"
//                             onChange={(event) => {
//                                 setImageUpload(event.target.files[0]);
//                             }}
//                         />
//                         <button onClick={uploadFile}>Upload</button>
//                     </div>

//                     <div className={styleaddpro.btncontainer}>
//                         <button type="submit" className="btn" onClick={addProduct}>
//                             Thêm loại sản phẩm
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         // </Modal>
//     );
// }

// export default AddCategory;

import React, { useState } from 'react';
import styleaddpro from './Addcategory.module.css';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, set, push } from 'firebase/database';
import { storage, database } from '../../../firebase';

function AddCategory() {
    const [imageUpload, setImageUpload] = useState();
    const [categoryname, setCategoryname] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const uploadFile = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `images/Category/${imageUpload.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImageUrl(url);
                alert('Upload thành công');
            });
        });
    };
    console.log('Đây là link ảnh: ', imageUrl);

    const addProduct = (e) => {
        e.preventDefault();

        try {
            const categoryRef = ref(database, 'Category');
            const newCategoryRef = push(categoryRef);

            set(newCategoryRef, {
                categoryname: categoryname,
                image: imageUrl,
            }).then(() => {
                console.log('Data written successfully');
                alert('Thêm thành công');
            });
        } catch (error) {
            console.error('Error writing data: ', error);
        }
    };

    return (
        <section className={styleaddpro.todocontainer}>
            <div className={styleaddpro.todo}>
                <h1 className={styleaddpro.header}>Add Product</h1>

                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập tên loại sản phẩm ..."
                            value={categoryname}
                            onChange={(e) => setCategoryname(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}
                        />
                        <button onClick={uploadFile}>Upload</button>
                    </div>

                    <div className={styleaddpro.btncontainer}>
                        <button type="submit" className="btn" onClick={addProduct}>
                            Thêm loại sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddCategory;