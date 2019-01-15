/* eslint-disable */
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type Props = {
  title: string,
  children: Node,
  toc: Node
};

class StyleGuideRenderer extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = { 
      activeSection: props.children.props.sections[0],
      sections: props.children.props.sections
    }
  }

  render() {
    const { title, children, toc } = this.props;
    const { activeSection, sections } = this.state;
    console.log(toc);
    return (
      <div>
        <header>
          <div>
            <div>
              <div>{title}</div>
              <AppBar>
                <Toolbar>
                  <Typography variant="h6">{title}</Typography>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent">
                { sections.map((section) => 
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{section.name}</Typography>
                    </ExpansionPanelSummary>
                  </ExpansionPanel>
                )}
              </Drawer>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    );
  }
}

export default StyleGuideRenderer;
