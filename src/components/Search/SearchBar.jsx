import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Paper component="form" sx={{ display: "flex", alignItems: "center", width: 230, height: "3.5vh" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Google Maps" inputProps={{ "aria-label": "search google maps" }} />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
