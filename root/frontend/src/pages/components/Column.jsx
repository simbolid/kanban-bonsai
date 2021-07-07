import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonToTextField from './ButtonToTextField';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: '270px',
  },
  paper: {
    paddingInline: theme.spacing(2), // left and right
    paddingBlock: theme.spacing(1), // top and bottom
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const Column = (props) => {
  const [newCardRequested, setNewCardRequested] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const classes = useStyles();

  const handleNewCardCancel = () => {
    setNewCardRequested(false);
    setNewCardTitle('');
  };

  const handleNewCardSubmit = () => {
    setNewCardRequested(false);
    props.addCard(props.index, { title: newCardTitle });
    setNewCardTitle('');
  };

  return (
    <Grid item className={classes.gridItem} xs={12} md={4} lg={3}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          {props.title}
        </Typography>
        {props.cards.map((card, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={index} title={card.title} />
        ))}
        <ButtonToTextField
          buttonPressed={newCardRequested}
          onButtonClick={() => setNewCardRequested(true)}
          onCancel={handleNewCardCancel}
          onTextFieldChange={(e) => setNewCardTitle(e.target.value)}
          onTextFieldSubmit={handleNewCardSubmit}
          textFieldLabel="Card title"
          textFieldValue={newCardTitle}
          title="Add Card"
        />
      </Paper>
    </Grid>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
