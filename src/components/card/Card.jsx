import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { MAX_LENGTH_TEXT, CARD_TEXT_COLOR, FONT_SIZE, FONT_WEIGHT, TOOLTIP_TEXT_COLOR, LINE_HEIGHT } from '../../consts/const';
import { getTrim } from '../../utils/trim';
import './Card.scss';

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: `${CARD_TEXT_COLOR}`,
    color: `${TOOLTIP_TEXT_COLOR}`,
    fontSize: FONT_SIZE,
    fontWeight: FONT_WEIGHT,
    lineHeight: LINE_HEIGHT
  }
}));

export const Card = React.memo(({ image, name, occupation, email, phone }) => {
  const classes = useStyles();
  return (
    <div className="card">
      <div className="card__box-image">
        <img src={image} alt={name} className="card__image" />
      </div>
      <div className="card__info">
        <Tooltip classes={classes} describeChild title={`${name}`}>
          <h2 className="card__name">{getTrim(name, MAX_LENGTH_TEXT)}</h2>
        </Tooltip>
        <Tooltip classes={classes} describeChild title={`${occupation}`}>
          <p className="card__occupation">{getTrim(occupation, MAX_LENGTH_TEXT)}</p>
        </Tooltip>
        <Tooltip classes={classes} describeChild title={`${email}`}>
          <p className="card__email">{getTrim(email, MAX_LENGTH_TEXT)}</p>
        </Tooltip>
        <p className="card__phone">{phone}</p>
      </div>
    </div>
  );
});
Card.displayName = 'Card';
Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};
