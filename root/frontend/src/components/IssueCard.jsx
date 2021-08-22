import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import { Draggable } from 'react-beautiful-dnd';
import DropdownMenu from './DropdownMenu';
import EditableTitle from './EditableTitle';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '2px',
    boxShadow: ' 0 1.25px 1px 0 rgba(0, 0, 0, 0.15)',
    '&:hover': {
      // otherwise, cursor defaults to grab
      cursor: 'pointer',
      '& + $dropdown': {
        opacity: 1,
      },
    },
  },
  dropdown: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  dropdownFocus: {
    opacity: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dialog: {
    backgroundColor: theme.palette.grey[50],
    boxShadow: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  description: {
    marginBlock: '10px',
    padding: '4px 10px',
    height: '60px',
    width: '92%',
    fontFamily: 'arial',
  },
  descriptionButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0F0F0',
    '&:hover': {
      backgroundColor: '#E8E8E8',
    },
  },
  descriptionTextArea: {
    resize: 'none',
    fontFamily: 'roboto, sans-serif',
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const IssueCard = ({
  card,
  index,
  columnTitle,
  deleteCard,
  updateCard,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [description, setDescription] = useState(card.description ? card.description : '');
  const [editDescription, setEditDescription] = useState(false);

  const resetDescription = () => {
    setDescription(card.description);
    setEditDescription(false);
  };

  const updateDescription = () => {
    setEditDescription(false);
    updateCard({
      ...card,
      description,
    });
  };

  const updateTitle = (newTitle) => {
    updateCard({
      ...card,
      title: newTitle,
    });
  };

  const descriptionButton = () => {
    const placeholderText = () => (
      <Box color="gray">
        <Typography>
          Enter a description...
        </Typography>
      </Box>
    );

    const text = () => (
      <Typography>
        {description}
      </Typography>
    );

    return (
      <ButtonBase
        className={`${classes.description} ${classes.descriptionButton}`}
        onClick={() => setEditDescription(true)}
        disableRipple
      >
        {description === ''
          ? placeholderText()
          : text()}
      </ButtonBase>
    );
  };

  const descriptionInput = () => (
    <form onSubmit={updateDescription}>
      <textarea
        className={`${classes.description} ${classes.descriptionTextArea}`}
        type="text"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        placeholder="Enter a description..."
        aria-label={`Enter a description for the task ${card.title}`}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <Button
        style={{ textTransform: 'none' }}
        variant="contained"
        size="small"
        color="primary"
        className={classes.addButton}
        type="submit"
      >
        Save
      </Button>
      <IconButton aria-label="delete" onClick={resetDescription}>
        <CloseIcon />
      </IconButton>
    </form>
  );

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <Box display="flex" position="relative" cursor="pointer">
            <ListItem
              className={classes.card}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              button
              disableRipple
              onClick={() => setOpenDialog(true)}
            >
              <ListItemText primary={card.title} />
            </ListItem>
            <div className={openMenu ? classes.dropdownFocus : classes.dropdown}>
              <DropdownMenu
                onDelete={deleteCard}
                onClick={() => setOpenMenu(true)}
                onClose={() => setOpenMenu(false)}
              />
            </div>
          </Box>
        )}
      </Draggable>

      <Dialog
        PaperProps={{
          className: classes.dialog,
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        scroll="body"
      >
        <DialogTitle onClose={() => setOpenDialog(false)} disableTypography>
          <Box display="flex" alignItems="flex-end">
            <Box marginRight="10px">
              <AssignmentIcon />
            </Box>
            <EditableTitle
              initialTitle={card.title}
              TypographyProps={{
                variant: 'h5',
              }}
              onSubmit={updateTitle}
            />
          </Box>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
          <Box marginLeft="36px" color="#505050">
            <Typography variant="body2">
              {`in list ${columnTitle}`}
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box fontWeight="fontWeightBold" fontSize="16px">
            Description
          </Box>
          {editDescription ? descriptionInput() : descriptionButton()}
        </DialogContent>
      </Dialog>
    </>
  );
};

IssueCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  columnTitle: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default IssueCard;