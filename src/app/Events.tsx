import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UIcode from '../components/events/events'

const EventsPage: React.FC = () => {
    const nav = useNavigate();
    const redirectToEvents = () => {
        nav(`/eventspage`);
    };

    return (
        <Fragment>
          <div>
            <UIcode />
          </div>
          <Outlet />
        </Fragment>
      );
}

export default EventsPage