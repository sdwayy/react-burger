import React from 'react';
import styles from './not-found.module.css';

import { Link } from 'react-router-dom';

export const NotFound404 = () => (
  <main className={`${styles.main} pl-4`}>
    <h1 className="text text_type_main-large mb-4">
      Oops! 404 Error
    </h1>
    <p className="text text_type_main-medium mb-4">
      The page you requested does not exist.
    </p>
    <p className="text text_type_main-medium">
      <span className="mr-2">Check the address or try</span>
      <Link to='/' className="link text_color_accent">
        homepage
      </Link>
      .
    </p>
  </main>
);
