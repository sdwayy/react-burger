import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

type TNavItemProps = {
  title: string;
  exact?: boolean;
  Icon?: React.ElementType;
  className: string;
  textType?: string;
  path: string;
};

const NavItem: React.FC<TNavItemProps> = ({
  title,
  exact,
  Icon,
  className,
  textType = 'default',
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

export default NavItem;
