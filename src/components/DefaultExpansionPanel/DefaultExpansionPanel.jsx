import * as React from "react";

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import EditIcon from '@material-ui/icons/Edit';

type Props = { 
  icon: string,
  title: string,
  children: Node
}

const DefaultExpansionPanel = (props: Props) => { 
  const { icon, title, children } = props;
  return ( 
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<EditIcon />}>
        <Icon className={icon} />
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default DefaultExpansionPanel;