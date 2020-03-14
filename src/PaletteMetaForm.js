import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  showEmojiPicker = () => {
    this.setState({
      stage: "emoji"
    });
  };
  savePalette = emoji => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: "" });
  };
  render() {
    const { newPaletteName } = this.state;
    return (
      <div>
        <Dialog
          open={this.state.stage === "emoji"}
          onClose={this.props.hideForm}
        >
          <Picker onSelect={this.savePalette} title='Pick a Palette Emoji' />
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.props.hideForm}
          aria-labelledby='form-dialog-title'
        >
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogTitle id='form-dialog-title'>
              Choose a Palette Name
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your palette. Make sure its unique.
              </DialogContentText>
              <TextValidator
                label='Palette Name'
                value={newPaletteName}
                fullWidth
                margin='normal'
                name='newPaletteName'
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Name required", "Name already taken"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideForm} color='primary'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
