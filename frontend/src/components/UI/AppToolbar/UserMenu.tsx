import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { unsetUser } from '../../../features/users/userSlice.ts';
import { logout } from '../../../features/users/userThunks.ts';
import {clearTrackHistory} from "../../../features/trackHistory/trackHistorySlice.ts";

interface Props {
  user: User;
}


const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout =  () => {
    dispatch(logout());
    dispatch(unsetUser());
    dispatch(clearTrackHistory());
  }
  return (
    <>
     <Button
        onClick={handleClick}
        color='inherit'
     >
        Hello, {user.username}!
     </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;