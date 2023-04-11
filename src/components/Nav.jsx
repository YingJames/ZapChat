import logo from '../logo.svg';
import firebase from 'firebase/compat/app';
import { SignIn, SignOut } from './SignInOut';
import { Navbar } from 'flowbite-react';

export function Nav() {
    let user = firebase.auth().currentUser;

    return (

        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="ZapChat Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    ZapChat
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {user ? <SignOut /> : <SignIn />}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/navbars"
                    active={true}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>

    )
}