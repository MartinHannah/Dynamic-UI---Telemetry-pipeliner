import * as React from 'react';
import * as shortid from 'shortid';
import { DropTarget } from 'react-dnd';
import GroupedColumnButton from './GroupColumnButton';
import ItemTypes from "../../utils/itemTypes";


type Props = {
  isOver: boolean,
  connectDropTarget: Function,
  canDrop: boolean,
  groupBy: Array,
  noColumnsSelectedMessage?: string,
  panelDescription?: string,
  onColumnGroupDeleted: Function
};


/** Should convert to chip input to be consistent with search bar.  */
class GroupColumnPanel extends React.Component<Props> {
    static defaultProps = {
        noColumnsSelectedMessage: 'Drag a column header here to group by that column',
        panelDescription: 'Drag a column header here to group by that column'
    };

  getPanelInstructionMessage() {
    let {groupBy, panelDescription, noColumnsSelectedMessage} = this.props;
    return groupBy && groupBy.length > 0 ? panelDescription : noColumnsSelectedMessage;
  }

  renderGroupedColumns() {
    const { groupBy, onColumnGroupDeleted } = this.props;
    return groupBy.map(c => {
      const groupedColumnButtonProps = {
        columnKey: typeof c === 'string' ? c : c.key,
        name: typeof c === 'string' ? c : c.name,
        onColumnGroupDeleted: onColumnGroupDeleted,
        key: typeof c === 'string' ? c : c.key
      };
      return (<GroupedColumnButton key={shortid.generate()} {...groupedColumnButtonProps} />);
    });
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} 
      />
    );
  }


  render() {
    const { connectDropTarget, isOver, canDrop} = this.props;
    return connectDropTarget(
      <div style={{ margin: '0px 5px 0px 5px', padding: '2px', position: 'relative', display: 'inline-block', border: '1px solid #eee' }}>
        {this.renderGroupedColumns()} 
        <span>{this.getPanelInstructionMessage()}</span>
        {isOver && canDrop && this.renderOverlay('yellow')}
        {!isOver && canDrop && this.renderOverlay('#DBECFA')}
      </div>);
  }
}

const columnTarget = {
  drop(props, monitor) {
    // Obtain the dragged item
    let item = monitor.getItem();
    if (typeof props.onColumnGroupAdded === 'function') {
      props.onColumnGroupAdded(item.key);
    }
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  draggedolumn: monitor.getItem()
});

export default DropTarget(ItemTypes.COLUMN, columnTarget, collect)(GroupColumnPanel);
