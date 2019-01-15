import React from "react";
import classNames from "classnames";
//Components
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

type Props = {
  icon: string,
  message: string
};

const IconWithText = (props: Props) => {
  const { icon, message } = props;
  return (
    <div>
      <Icon className={classNames(icon, "icon")} />
      <Typography>{message}</Typography>
      <Typography>Empty</Typography>
    </div>
  );
};

export default IconWithText;
