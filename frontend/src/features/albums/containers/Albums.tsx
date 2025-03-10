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
import { useEffect } from "react";
import { apiUrl } from "../../../globalConstants.ts";
import {
  deleteAlbumThunks,
  getAlbumsThunks,
  publishAlbumThunks,
} from "../albumThunks.ts";
import {
  removeAlbum,
  selectAlbum,
  selectDelete,
  updateStatus,
} from "../albumSlice.ts";
import { NavLink, useParams } from "react-router-dom";
import { selectLoading } from "../albumSlice.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import { selectUser } from "../../users/userSlice.ts";
import { toast } from "react-toastify";

const Artists = () => {
  const dispatch = useAppDispatch();
  const { results: albums, artist } = useAppSelector(selectAlbum);
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectUser);
  const { id } = useParams<{ id: string }>();
  const deleteLoading = useAppSelector(selectDelete);

  useEffect(() => {
    if (id) {
      dispatch(getAlbumsThunks(id));
    }
  }, [dispatch, id]);

  const onDelete = async (id: string) => {
    try {
      if (id) {
        await dispatch(deleteAlbumThunks(id)).unwrap();
        dispatch(removeAlbum(id));
        toast.success("Artist deleted successfully.");
      }
    } catch (error) {
      toast.error((error as { error: string }).error);
    }
  };

  const upDate = async (id: string) => {
    try {
      if (id) {
        await dispatch(publishAlbumThunks(id)).unwrap();
        dispatch(updateStatus(id));
        toast.success("Artist published successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAlbums = albums.filter(
    (item) =>
      item.isPublished || item.user === user?._id || user?.role === "admin",
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {artist && (
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "center", mb: 5 }}
            >
              Artist Name: {artist.name}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((item) => {
                const image = item.image
                  ? apiUrl + "/" + item.image
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
                        alt={item.title || "Artist Image"}
                        width="100%"
                        height="250px"
                        image={image}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Release: {item.releaseDate}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Count of tracks: {item.trackCount}
                        </Typography>
                        {item.isPublished === false && (
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            component="div"
                          >
                            Status: Не опубликовано
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          to={`/tracks/${item._id}`}
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
                        {item.isPublished === false &&
                          user?.role === "admin" && (
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
                Unfortunately, the albums haven't been released yet.
              </Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Artists;
