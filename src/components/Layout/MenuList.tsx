import AddTaskIcon from '@mui/icons-material/AddTask';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MedicationIcon from '@mui/icons-material/Medication';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import useNavigate from 'hooks/useNavigate';
import { NavLink } from 'react-router-dom';
const Link = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',

  '&.active > div': {
    backgroundColor: 'whitesmoke',
  },
});

export function MenuList() {
  const { handleRouterChange: banner } = useNavigate('/banner');
  const { handleRouterChange: cases } = useNavigate('/case');
  const { handleRouterChange: content } = useNavigate('/content');
  const { handleRouterChange: producer } = useNavigate('/producer');
  const { handleRouterChange: reason } = useNavigate('/reason');
  return (
    <List component="nav" style={{ height: 'calc(100vh - 65px)', overflow: 'auto' }}>
      <Link to="/banner" onClick={banner}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Banner'} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />

      <Link to="/case" onClick={cases}>
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={'Case'} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />

      <Link to="/content" onClick={content}>
        <ListItemButton>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary={'Content'} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />
      <Link to="/producer" onClick={producer}>
        <ListItemButton>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary={'Producer'} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />
      <Link to="/reason" onClick={reason}>
        <ListItemButton>
          <ListItemIcon>
            <AddTaskIcon />
          </ListItemIcon>
          <ListItemText primary={'Reason'} />
        </ListItemButton>
      </Link>
    </List>
  );
}
