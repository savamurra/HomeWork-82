import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectArtist, selectDelete, selectLoading } from "../artistSlice.ts";
import { useEffect } from "react";
import {
  deleteArtistThunks,
  getArtistThunks,
  publishArtistThunks,
} from "../artistThunks.ts";
import { apiUrl } from "../../../globalConstants.ts";
import { NavLink } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import { selectUser } from "../../users/userSlice.ts";
import { toast } from "react-toastify";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDelete);

  useEffect(() => {
    dispatch(getArtistThunks());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    try {
      if (id) {
        await dispatch(deleteArtistThunks(id)).unwrap();
        await dispatch(getArtistThunks());
        toast.success("Artist deleted successfully.");
      }
    } catch (error) {
      toast.error((error as { error: string }).error);
    }
  };

  const upDate = async (id: string) => {
    try {
      if (id) {
        await dispatch(publishArtistThunks(id)).unwrap();
        await dispatch(getArtistThunks());
        toast.success("Artist published successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredArtist = artists.filter(
    (item) =>
      item.isPublished || item.user === user?._id || user?.role === "admin",
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box sx={{ display: "flex", gap: 5, justifyContent: "center" }}>
          {filteredArtist.length > 0 ? (
            filteredArtist.map((item) => {
              const image = item.photo
                ? apiUrl + "/" + item.photo
                : "https://mui.com/static/images/cards/contemplative-reptile.jpg";
              const deleteForAdmin =
                user?.role === "admin" ||
                (user?.role === "user" && item.user === user._id);
              return (
                <Box key={item._id} sx={{ display: "flex" }}>
                  <Card
                    sx={{
                      width: 305,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={item.name || "Artist Image"}
                      width="100%"
                      height="250px"
                      image={image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.info}
                      </Typography>
                      {item.isPublished === false && (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          component="div"
                        >
                          Не опубликовано
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        to={`/album/${item._id}`}
                        component={NavLink}
                      >
                        Learn More
                      </Button>
                      {deleteForAdmin && (
                        <Button
                          size="small"
                          onClick={() => onDelete(item._id)}
                          color="warning"
                          disabled={deleteLoading}
                        >
                          Delete
                        </Button>
                      )}
                      {item.isPublished === false && user?.role === "admin" && (
                        <Button
                          size="small"
                          onClick={() => upDate(item._id)}
                          color="warning"
                        >
                          Publish
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Box>
              );
            })
          ) : (
            <Typography>
              Unfortunately, the artist haven't been released yet.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Artists;
