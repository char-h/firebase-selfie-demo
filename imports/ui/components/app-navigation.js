import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';

import { Link } from 'react-router';

import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';


export class AppNavigation extends Component {

    renderNavigation(hasUser) {
        return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
    }

    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">98Labs React-Meteor Starter Project</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                { this.renderNavigation(this.props.hasUser) }
            </Navbar.Collapse>
        </Navbar>;
    }
}

AppNavigation.propTypes = {
    hasUser: React.PropTypes.object,
};