import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "100vh"
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    width: "49%"
  }
}));

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(props.palettes[0].colors);
  const paletteIsFull = colors.length >= 20;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (currentColor, newColorName) => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);
  };

  const handleSubmit = newPaletteName => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/\s/g, "-"),
      colors
    };

    props.savePalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const clearColors = () => setColors([]);

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);

    setColors([...colors, allColors[rand]]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        palettes={props.palettes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
