import * as React from "react";
import './GroupedColumnButton.scss';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";


type Props = {
  name: string,
  onColumnGroupDeleted: Function,
  columnKey: string
};

const GroupColumnButton = (props: Props) => {
  const { name, onColumnGroupDeleted, columnKey } = props;
  console.log(name)
  return (
    <Button
      className='grouped-col-button'
      variant="contained"
      color="secondary"
      onClick={() => onColumnGroupDeleted(columnKey, name)}
    >
      {name}
      <DeleteIcon />
    </Button>
  );
};

export default GroupColumnButton;
