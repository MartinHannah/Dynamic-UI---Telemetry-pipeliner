import * as React from "react";
import * as shortid from 'shortid';
import './ItemListAction.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';

type Props = { 
    item: Object,
    label: string,
    secondary?: string,
    click: Function
}

class ItemListAction extends React.Component<Props> { 
  static defaultProps = { 
    secondary: ''
  }

  renderList(){}

  render() { 
    const { label, secondary, click, item} = this.props;
    return ( 
      <ListItem
        key={shortid.generate()}
        classes={{
          container: 'item-list-action'
        }}
      >
        <ListItemText
          primary={label}
          secondary={secondary}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit" onClick={() => click(item)}>
            <ChevronRight />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default ItemListAction;