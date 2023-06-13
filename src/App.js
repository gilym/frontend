import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Food from './food/inputFood';
import FoodList from './food/fooddata';
import UserList from './user/userdata';
import User from './user/inputUser';
import UpdateUser from './user/updateuser';
import UpdateFood from './food/updatefood';
import ImagePicker from './classification/tes';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/addFood" element={<Food />} />
          <Route path="/listuser" element={<UserList />} />
          <Route path="/inputUser" element={<User />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/updatefood/:id" element={<UpdateFood/>} />
          <Route path="/image" element={<ImagePicker/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
// import React from 'react';
// import Canvas from './canvas';

// const App = () => {
//   return (
//     <div>
     
//       <Canvas />
//     </div>
//   );
// };

// export default App;

