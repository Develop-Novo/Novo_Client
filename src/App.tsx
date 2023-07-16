import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  //test//
  useEffect(() => {
    const postMember = async () => {
      try {
        const response = await axios.post('/member/new', {
          email: 'email_seoyoung',
          password: 'password_seoyoung',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const getMemberByID= async () => {
      try {
        const response = await await axios.get('/member/1')
        .then(res => {
          if (res.status === 200) {
            console.log(res);
          }
        })
        .catch(error => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getMemberAll= async () => {
      try {
        const response = await await axios.get('/member/all')
        .then(res => {
          if (res.status === 200) {
            console.log(res);
          }
        })
        .catch(error => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    };

    //postMember();
    //getMemberByID();
    //getMemberAll();
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
