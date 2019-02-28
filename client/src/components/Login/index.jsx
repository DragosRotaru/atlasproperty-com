import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { AuthService } from "../../services";
import Style from "./style.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    return (
      <div className={Style.container}>
        <Card className={Style.card}>
          <h1>Log In</h1>
          <TextField
            label="Username"
            onChange={event => {
              this.setState({ username: event.target.value });
            }}
          />
          <TextField
            label="Password"
            type="password"
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className={Style.buttons}>
            <Button
              ripple
              raised
              onClick={() =>
                this.auth.login(this.state.username, this.state.password)
              }
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
