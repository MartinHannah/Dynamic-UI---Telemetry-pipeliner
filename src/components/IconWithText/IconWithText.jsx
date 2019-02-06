import React from "react";
import classNames from "classnames";
//Components
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

type Props = {
  icon: string,
  value: string
};

const IconWithText = (props: Props) => {
  const { icon, value } = props;
  return (
    <div>
      <Icon className={classNames(icon, "icon")} />
      <Typography>{value}</Typography>
    </div>
  );
};

export default IconWithText;
