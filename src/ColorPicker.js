import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerStyles";

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "red",
      newColorName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
  }
  updateCurrentColor = color => {
    this.setState({ currentColor: color.hex });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor
    };
    console.log(this.props.colors);
    this.props.addNewColor(newColor);
  }
  render() {
    const { paletteIsFull, classes } = this.props;

    return (
      <div className={classes.container}>
        <ChromePicker
          color={this.state.currentColor}
          onChange={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            variant='filled'
            placeholder='Enter a Color'
            margin='normal'
            value={this.state.newColorName}
            name={"newColorName"}
            className={classes.colorNameInput}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a name",
              "Name is taken",
              "Color already used"
            ]}
          />
          <Button
            variant='contained'
            className={classes.addColor}
            color='primary'
            style={{
              backgroundColor: paletteIsFull ? "grey" : this.state.currentColor
            }}
            type='submit'
            disabled={paletteIsFull}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
