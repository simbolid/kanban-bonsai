import React from 'react';
import PropTypes from 'prop-types';
import IssueCard from './IssueCard';

/* React.memo prevents dragging a card over a column from
 * re-rendering the tasks in that column. */
const CardList = React.memo(({ cards, filter, columnTitle }) => (
  cards
    .filter((card) => (
      card.title.toLowerCase().includes(filter.toLowerCase())
    ))
    .map((card, index) => (
      <IssueCard
        key={card.id}
        cardId={card.id}
        index={index}
        title={card.title}
        columnTitle={columnTitle}
      />
    ))
));

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      // TODO: add id?
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  columnTitle: PropTypes.string.isRequired,
};

export default CardList;
