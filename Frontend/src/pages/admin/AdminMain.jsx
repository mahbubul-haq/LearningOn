import { useContext, useEffect } from 'react';
import { AdminContext } from '../../state/AdminContext';

const AdminMain = () => {
    const { verifyAdmin} = useContext(AdminContext);
    
    useEffect(() => {
        console.log("admin main calling");
        verifyAdmin();
    }, []);

  return (
    <div>AdminMain</div>
  )
}

export default AdminMain