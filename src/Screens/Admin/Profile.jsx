import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import ProfileForm from '../../components/profile/ProfileForm';
import ClassEditForm from '../../components/profile/ClassEdits/ClassEditForm';
const Profile = () => {
  const options = ['Profile', 'Class edits'];
  const [selected, setSelected] = useState('Profile')

  const  {user} = useSelector(state => state.user);
  console.log(user);
  const renderContent = () => {
    switch (selected) {
      case 'Profile':
          return <ProfileForm />
      case 'Class edits':
          return <ClassEditForm />
    }
  }
  return (
    <div className='p-2'>
      <h1 className='text-3xl'>Profile</h1>
      <h1>Name:  {user && user.username}</h1>
     
       <div className='bg-white rounded-lg shadow-inner grid grid-cols-3'>
        <ul className='bg-blue-400 col-span-1'>
          {
            options.map((option, index) => (
              <li key={index} className={`py-2 h-fit px-5 hover:bg-white hover: cursor-pointer  ${selected === option ? 'bg-white' : 'rounded'}`} onClick={() => setSelected(option)}>
                {option}
                </li>
                
            ))
          }
        </ul>
        <div className=' min-h-[70vh] col-span-2'>
         {
          renderContent()
         }
        </div>
       </div>

      
    </div>
  )
}

export default Profile