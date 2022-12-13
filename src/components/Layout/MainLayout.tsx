import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header } from 'components/Common/Header';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid whitesmoke`,
    backgroundColor: 'white',
    transition: 'all 1s',
  },
  main: {
    gridArea: 'main',
    backgroundColor: 'white',
    padding: '16px',
  },
}));

const MainLayout = (props: { children: any }) => {
  const classes = useStyles();
  const [showResults, setShowResults] = useState(true);
  const { children } = props;

  const handeClick = () => {
    setShowResults(!showResults);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.main}>{children}</Box>
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
