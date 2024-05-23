import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import AdminDashboard from './AdminDashboard';
import ManageUsers from './ManageUsers';
import ManageServices from './ManageServices';
import ManageProducts from './ManageProducts';
import ManageRooms from './ManageRooms';

function AdminPage() {
  let { path } = useRouteMatch();

  const buttons = [
    { label: 'Dashboard', path: `${path}` },
    { label: 'Manage Users', path: `${path}/users` },
    { label: 'Manage Services', path: `${path}/services` },
    { label: 'Manage Products', path: `${path}/products` },
    { label: 'Manage Rooms', path: `${path}/rooms` }
  ];

  return (
    <div>
      <Header buttons={buttons} />
      <Switch>
        <Route exact path={path} component={AdminDashboard} />
        <Route path={`${path}/users`} component={ManageUsers} />
        <Route path={`${path}/services`} component={ManageServices} />
        <Route path={`${path}/products`} component={ManageProducts} />
        <Route path={`${path}/rooms`} component={ManageRooms} />
      </Switch>
    </div>
  );
}

export default AdminPage;