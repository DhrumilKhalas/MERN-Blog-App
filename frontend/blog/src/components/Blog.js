import React from "react";
import "./blog.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Blog = ({ description, title, image, userName, isUser, id }) => {
  // console.log(isUser);

  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.isLoggedin);

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blog/delete/${id}`);
      alert("Blog deleted successfully!");
      window.location.reload();
    } catch (err) {
      document.getElementById("deleteerror").innerHTML = toast.error(
        "Error occured while deleting a Blog! Please try again later."
      );
    }
  };

  return ( 
    <>
      {!isLoggedin ? (
        <div className="notlogin">Please Login to continue.</div>
      ) : ( 
        <>
          <div className="singleblogouter">
          <ToastContainer/>
            <Card className="singleblog">
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt="Not Available"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Box className="blogtitleandeditanddeletebtn">
                    <Box className="nameofblog">{title}</Box>
                    {isUser && (
                      <Box display="flex">
                         <IconButton onClick={handleEdit}>
                          <EditIcon className="editiconblog" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                          <DeleteIcon className="deleteiconblog" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          <div className="accordianread">Read</div>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="typographydesc">{description}</div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/* {description} */}
                </Typography>

                {userName && (
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 3, fontWeight: 500, fontSize: "14px" }}
                  >
                    By {userName}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
