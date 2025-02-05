import { Button, CardMedia, Menu, MenuItem } from "@mui/material";
import { User } from "../../../types";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks.ts";
import { unsetUser } from "../../../features/users/userSlice.ts";
import { logout } from "../../../features/users/userThunks.ts";
import { clearTrackHistory } from "../../../features/trackHistory/trackHistorySlice.ts";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../../globalConstants.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [secondAnchorEl, setSecondAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSecondAnchorEl(event.currentTarget);
  };

  const formClose = () => {
    setSecondAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    dispatch(clearTrackHistory());
  };

  const updateAvatar = { ...user };
  const image = user.avatar;

  if (image && image.startsWith("http")) {
    updateAvatar.avatar = image;
  } else if (image) {
    updateAvatar.avatar = apiUrl + "/" + image;
  } else {
    updateAvatar.avatar =
      "https://mui.com/static/images/cards/contemplative-reptile.jpg"; // Значение по умолчанию
  }
  return (
    <>
      <Button color="inherit" onClick={formOpen} style={{ marginRight: 5 }}>
        Add
      </Button>
      <Menu
        anchorEl={secondAnchorEl}
        keepMounted
        open={Boolean(secondAnchorEl)}
        onClose={formClose}
      >
        <MenuItem component={NavLink} to="track/new">
          Track
        </MenuItem>
        <MenuItem component={NavLink} to="artist/new">
          Artist
        </MenuItem>
        <MenuItem component={NavLink} to="album/new">
          Album
        </MenuItem>
      </Menu>

      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}!
        <CardMedia
          component="img"
          alt={user.username || "Artist Image"}
          image={updateAvatar.avatar}
          sx={{ width: 30, height: 30, borderRadius: "50%", marginLeft: 1 }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
