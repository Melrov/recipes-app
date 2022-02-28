import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbars from "./Snackbars";
import { RecipesContext } from "../../context/RecipesContext";


function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, options, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Substitutes</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function SubstitutesPopup({ open, setOpen, data }) {
    const [snackOpen, setSnackOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { addSubstitutes } = React.useContext(RecipesContext)

    React.useEffect(() => {
        if(data.status === "failure"){
            setSnackOpen(true)
        }
    }, [data])

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  React.useEffect(() => {
    if(!open && value){
        addSubstitutes({ingredient: data.ingredient, value: value})
    }
  }, [open, value])

  return (
    <>
      {data && data.status !== "failure" && (
        <Box>
          <List component="div" role="group">
            <ConfirmationDialogRaw
              id="ringtone-menu"
              keepMounted
              open={open}
              onClose={handleClose}
              value={value}
              options={data.substitutes}
            />
          </List>
        </Box>
      )}
        <Snackbars message={data.message} snackOpen={snackOpen} setSnackOpen={setSnackOpen}/>
      
    </>
  );
}
