import { createMuiTheme } from "@material-ui/core/styles";
import { cyan } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    background: {
      default: cyan[500],
    },
    primary: {
      main: cyan[300],
    },
    secondary: {
      main: cyan[600],
    },
  },
  overrides: {
    MuiMenu: {
      list: {
        backgroundColor: cyan[500],
      },
    },
  },
});
