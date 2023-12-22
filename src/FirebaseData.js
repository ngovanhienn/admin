import React, { Component } from 'react';
import firebase from './firebase';

class FirebaseData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // Lắng nghe sự thay đổi dữ liệu từ Firebase
    firebase.database().ref('https://newproject-c8af3-default-rtdb.firebaseio.com/').on('value', snapshot => {
      // Lấy dữ liệu từ snapshot
      const data = snapshot.val();

      // Cập nhật state với dữ liệu mới
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {data && (
          <ul>
            {Object.keys(data).map(key => (
              <li key={key}>{data[key]}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default FirebaseData;