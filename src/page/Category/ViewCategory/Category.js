import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';

import styles from './category.module.css';
// import { db } from '../../../../firebase';
import { storage, db } from '../../../firebase';
// import { db,  } from '../../../firebase';

import config from '../../../configRoute';

import Home from '../../Home/Home';

import '../../admin/style/style.css';
// import './category.css';
import AddCategory from '../AddCategory/Addcategory';

const Category = () => {
    const [idchon, setIdchon] = useState();
    const [imageUpload, setImageUpload] = useState();

    const [category, setCategory] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [stt, setStt] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [cate, setCate] = useState('');
    const [catecu, setCatecu] = useState('');

    const fetchCategory = async () => {
        await getDocs(collection(db, 'Category')).then((querySnapshot) => {
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setProduct(newData);
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setCategoryData(newData);
            setCategory(newData);
            console.log('category:', category, 'Newdata: ', newData);
        });
    };

    const handleSearch = () => {
        const filteredCategory = categoryData.filter((category) =>
            category.categoryname.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        // setSearchResult(filteredProducts);

        setCategory(filteredCategory);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };

    const deleteCategory = async (categoryId) => {
        try {
            // await deleteDoc(doc(db, 'Product', productId));
            await deleteDoc(doc(db, 'Category', categoryId));
            console.log('Document successfully deleted!');
            // Gọi lại fetchPost để cập nhật danh sách sản phẩm sau khi xóa
            fetchCategory();
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    const updatedUser = async (cateid) => {
        const Update = doc(db, 'Category', cateid);
        // Set the "capital" field of the city 'DC'
        await updateDoc(doc(db, 'Category', cateid), {
            // capital: true,
            categoryname: cate,
            image: imageUrl,
        });
        fetchCategory();
        setCate('');
        setImageUrl('');
        alert('thành công');
    };
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
    console.log('day là link anh cate: ', imageUrl);

    useEffect(() => {
        fetchCategory();
    }, []);

    const openModal = (Cateid) => {
        const selectedProduct = category.find((cate) => cate.id === Cateid);
        if (selectedProduct) {
            setModalIsOpen(true);
            setIdchon(Cateid);
            // console.log('id được chọn: ', userID2);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
                    <h2>Loại sản phẩm</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" value={searchKeyword} onChange={handleSearchKeyword} />
                        <button className="btnsearch" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <NavLink to={config.routes.addcategory}>
                        <button className="btnsearch">Thêm</button>
                    </NavLink>
                </div>
                <div>
                    <div
                        style={{
                            alignItems: 'center',
                            borderBottom: '1px',
                        }}
                    >
                        <div className={styles.labelviewcate}>
                            <div className={styles.labelsttcate}>
                                <h3>STT</h3>
                            </div>
                            <div className={styles.labelanhcate}>
                                <h3>Ảnh </h3>
                            </div>

                            <div className={styles.labeltencate}>
                                <h3>Tên loại sản phẩm</h3>
                            </div>
                        </div>
                        {category.map((categories, index) => (
                            <div key={index}>
                                <div className={styles.containerviewcate}>
                                    <div className={styles.viewcate}>
                                        <div className={styles.sttcate}>
                                            <h3 style={{ textAlign: 'center' }}>{categories.stt}</h3>
                                        </div>
                                        <div className={styles.anhcate}>
                                            <img src={categories.imageUrl} style={{ width: 148, height: 106, marginTop: 1 }} />
                                        </div>

                                        <div className={styles.tencate}>
                                            <h3 style={{ textAlign: 'center' }}>{categories.name}</h3>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: 105,
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <button onClick={() => deleteCategory(categories.id)}>
                                            <span>xóa</span>
                                        </button>
                                        <button
                                            className="btnsearch"
                                            onClick={() => openModal(categories.id)}
                                            style={{ marginLeft: 10 }}
                                        >
                                            sửa
                                        </button>
                                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                                            <button onClick={closeModal}>Hủy</button>
                                            <h2>Sửa thông tin tài khoản</h2>
                                            <div>
                                                {/* <label>Email cũ là: {selectedEmail} </label> */}
                                                <input
                                                    type="text"
                                                    // placeholder="Tên loại"
                                                    placeholder={catecu}
                                                    value={cate}
                                                    onChange={(e) => setCate(e.target.value)}
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
                                            <button onClick={() => updatedUser(idchon)}>Lưu</button>
                                            {/* <button>Lưu</button> */}
                                        </Modal>
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

export default Category;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { get, remove, update, push } from 'firebase/database';
// import Modal from 'react-modal';

// import styles from './category.module.css';
// import { storage, db } from '../../../firebase';
// import config from '../../../configRoute';
// import Home from '../../Home/Home';
// import AddCategory from '../AddCategory/Addcategory';

// const Category = () => {
//     const [idchon, setIdchon] = useState();
//     const [imageUpload, setImageUpload] = useState();
//     const [category, setCategory] = useState([]);
//     const [categoryData, setCategoryData] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [cate, setCate] = useState('');
//     const [catecu, setCatecu] = useState('');

//     const fetchCategory = async () => {
//         const categoryRef = ref(db, 'Category');
//         get(categoryRef).then((snapshot) => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 const categoryList = Object.keys(data).map((key) => ({ ...data[key], id: key }));
//                 setCategoryData(categoryList);
//                 setCategory(categoryList);
//                 console.log('category:', category, 'Newdata: ', categoryList);
//             }
//         });
//     };

//     const handleSearch = () => {
//         const filteredCategory = categoryData.filter((category) =>
//             category.categoryname.toLowerCase().includes(searchKeyword.toLowerCase()),
//         );
//         setCategory(filteredCategory);
//     };

//     const handleSearchKeyword = (event) => {
//         setSearchKeyword(event.target.value);
//     };

//     const deleteCategory = async (categoryId) => {
//         try {
//             const categoryRef = ref(db, `Category/${categoryId}`);
//             remove(categoryRef).then(() => {
//                 console.log('Document successfully deleted!');
//                 fetchCategory();
//             });
//         } catch (error) {
//             console.error('Error removing document: ', error);
//         }
//     };

//     const updatedUser = async (cateid) => {
//         const categoryRef = ref(db, `Category/${cateid}`);
//         update(categoryRef, {
//             categoryname: cate,
//             image: imageUrl,
//         }).then(() => {
//             fetchCategory();
//             setCate('');
//             setImageUrl('');
//             alert('Thành công');
//         });
//     };

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

//     useEffect(() => {
//         fetchCategory();
//     }, []);

//     const openModal = (Cateid) => {
//         const selectedCategory = category.find((cate) => cate.id === Cateid);
//         if (selectedCategory) {
//             setModalIsOpen(true);
//             setIdchon(Cateid);
//             setCatecu(selectedCategory.categoryname);
//         }
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//     };

//     return (
//         <Home>
//             {/* Giao diện màn hình user */}
//             <div>
//                 <div className="adminhead">
//                     <h2>Category</h2>
//                     <div style={{ display: 'flex' }}>
//                         <input placeholder="Search" value={searchKeyword} onChange={handleSearchKeyword} />
//                         <button className="btnsearch" onClick={handleSearch}>
//                             Search
//                         </button>
//                     </div>
//                     <NavLink to={config.routes.addcategory}>
//                         <button className="btnsearch">Thêm</button>
//                     </NavLink>
//                 </div>
//                 <div>
//                     <div
//                         style={{
//                             alignItems: 'center',
//                             borderBottom: '1px',
//                         }}
//                     >
//                         <div className={styles.labelviewcate}>
//                             <div className={styles.labelsttcate}>
//                                 <h3>STT</h3>
//                             </div>
//                             <div className={styles.labelanhcate}>
//                                 <h3>Ảnh </h3>
//                             </div>

//                             <div className={styles.labeltencate}>
//                                 <h3>Tên loại sản phẩm</h3>
//                             </div>
//                         </div>
//                         {category.map((categories, index) => (
//                             <div key={index}>
//                                 <div className={styles.containerviewcate}>
//                                     <div className={styles.sttcate}>
//                                         <p>{index + 1}</p>
//                                     </div>
//                                     <div className={styles.anhcate}>
//                                         <img src={categories.image} alt={categories.categoryname} />
//                                     </div>
//                                     <div className={styles.tencate}>
//                                         <p>{categories.categoryname}</p>
//                                     </div>
//                                     <div className={styles.btncate}>
//                                         <button className={styles.btnSua} onClick={() => openModal(categories.id)}>
//                                             Sửa
//                                         </button>
//                                         <button className={styles.btnXoa} onClick={() => deleteCategory(categories.id)}>
//                                             Xóa
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* Modal */}
//                 <Modal
//                     isOpen={modalIsOpen}
//                     onRequestClose={closeModal}
//                     contentLabel="Example Modal"
//                     ariaHideApp={false}
//                     style={{
//                         overlay: {
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                         },
//                         content: {
//                             top: '50%',
//                             left: '50%',
//                             right: 'auto',
//                             bottom: 'auto',
//                             marginRight: '-50%',
//                             transform: 'translate(-50%, -50%)',
//                             borderRadius: '10px',
//                             padding: '20px',
//                             width: '400px',
//                             height: 'fit-content',
//                         },
//                     }}
//                 >
//                     <div>
//                         <h2>Sửa Category</h2>
//                         <input
//                             type="text"
//                             placeholder="Tên loại sản phẩm"
//                             value={cate}
//                             onChange={(event) => setCate(event.target.value)}
//                         />
//                         <img src={imageUrl} alt={cate} style={{ width: '100px', height: '100px' }} />
//                         <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
//                         <button onClick={uploadFile}>Upload</button>
//                         <button onClick={() => updatedUser(idchon)}>Sửa</button>
//                     </div>
//                 </Modal>
//             </div>
//         </Home>
//     );
// };

// export default Category;