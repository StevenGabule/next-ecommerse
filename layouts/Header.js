import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import Link from "next/link";

function Header({token}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen)
    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <Link href="/"><a className={'navbar-brand'}>EBooksPlace</a></Link>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link href={"/about"}><a className={'nav-link'}>About</a></Link>
                            </NavItem>
                            <NavItem>
                                <Link href={"/contact"}><a className={'nav-link'}>Contact Us</a></Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <div className="form-inline my-2 my-lg-0">
                            <Nav className="mr-auto" navbar>
                                {token ? (
                                    <NavItem>
                                        <Link href={"/profile"}>
                                            <a className={'nav-link text-capitalize'}>
                                                Someone
                                            </a>
                                        </Link>
                                    </NavItem>
                                ) : (
                                    <>
                                        <NavItem>
                                            <Link href={"/login"}><a className={'nav-link'}>Login</a></Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link href={"/register"}><a className={'nav-link'}>Register</a></Link>
                                        </NavItem>
                                    </>
                                )}
                            </Nav>
                        </div>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default Header;