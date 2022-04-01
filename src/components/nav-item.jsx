import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const NavItem = ({
  title,
  exact,
  Icon,
  className,
  textType,
  path,
}) => {
  const match = useRouteMatch(path);

  return match && (exact ? match.isExact : true)
    ? (
        <div className={`${className || ''} text text_type_main-${textType} text_color_primary`}>
          { Icon && <Icon type="primary" /> }
          <span className={`${Icon ? 'ml-2' : ''}`}>
            {title}
          </span>
        </div>
      )
    : (
        <Link
          className={`${className || ''} text text_type_main-${textType} text_color_inactive link`}
          to={path}
        >
          { Icon && <Icon type="secondary" /> }
          <span className={`${Icon ? 'ml-2' : ''}`}>
            {title}
          </span>
        </Link>
      )
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  Icon: PropTypes.elementType,
  className: PropTypes.string,
  textType: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  textType: 'default',
};

export default NavItem;
