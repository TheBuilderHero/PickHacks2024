import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

const Layout = () => {
    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/blogs">Blog</Nav.Link>
                        <Nav.Link href="/contact">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
};

export default Layout;