import React, { PropTypes } from 'react';

function Item ({title, description, children, disabled, large}) {
  const isDisabled = disabled ? 'disabled' : '';
  return (
    <li
      className={`mdl-list__item mdl-list__item--two-line ${isDisabled}`}
      style={{overflow: 'hidden', 'margin-bottom': '20px', height: 'auto'}}
      >
      <span className='mdl-list__item-primary-content'>
        <span>{title}</span>
        <span className='mdl-list__item-sub-title'>
          {description}
        </span>
      </span>
      <span className='mdl-list__item-secondary-content'>
        {children}
      </span>
    </li>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  disabled: PropTypes.bool,
  large: PropTypes.bool
};

Item.defaultPropTypes = {
  disabled: false,
  large: false
};

export default Item;
