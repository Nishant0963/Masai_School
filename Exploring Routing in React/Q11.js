import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Link, Stack, useBreakpointValue } from '@chakra-ui/react';

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="gray.800" color="white" p="4">
      <Flex justify="space-between" align="center">
        <Box fontSize="xl" fontWeight="bold">
          My Website
        </Box>

        {/* Mobile vs Desktop Navbar */}
        {isMobile ? (
          <Stack spacing={4} align="center">
            <NavLinks />
          </Stack>
        ) : (
          <Flex gap="4">
            <NavLinks />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

const NavLinks = () => {
  return (
    <>
      <NavLink
        to="/"
        exact
        style={{ textDecoration: 'none' }}
        activeClassName="active"
      >
        <Link
          _hover={{ color: 'blue.300' }}
          p="2"
          borderRadius="md"
          className="nav-link"
          isActive={(match, location) => location.pathname === '/'}
        >
          Home
        </Link>
      </NavLink>

      <NavLink
        to="/about"
        style={{ textDecoration: 'none' }}
        activeClassName="active"
      >
        <Link
          _hover={{ color: 'blue.300' }}
          p="2"
          borderRadius="md"
          className="nav-link"
          isActive={(match, location) => location.pathname === '/about'}
        >
          About
        </Link>
      </NavLink>

      <NavLink
        to="/contact"
        style={{ textDecoration: 'none' }}
        activeClassName="active"
      >
        <Link
          _hover={{ color: 'blue.300' }}
          p="2"
          borderRadius="md"
          className="nav-link"
          isActive={(match, location) => location.pathname === '/contact'}
        >
          Contact
        </Link>
      </NavLink>

      <NavLink
        to="/services"
        style={{ textDecoration: 'none' }}
        activeClassName="active"
      >
        <Link
          _hover={{ color: 'blue.300' }}
          p="2"
          borderRadius="md"
          className="nav-link"
          isActive={(match, location) => location.pathname === '/services'}
        >
          Services
        </Link>
      </NavLink>
    </>
  );
};

export default Navbar;
