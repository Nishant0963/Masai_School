import { ChakraProvider, Box, Flex, Grid, Button, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import { useMediaQuery } from '@chakra-ui/react';

// Sidebar Component
const Sidebar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Box
      display={isLargerThan768 ? "block" : "none"}
      w="250px"
      p="4"
      bg={theme === 'light' ? 'gray.200' : 'gray.700'}
      color={theme === 'light' ? 'black' : 'white'}
    >
      <Text fontSize="xl" mb="4">Welcome, {isLoggedIn ? 'User' : 'Guest'}</Text>
      {isLoggedIn && (
        <Box>
          <Text mb="4">Dashboard</Text>
          <Text mb="4">Settings</Text>
          <Text mb="4">Logout</Text>
        </Box>
      )}
    </Box>
  );
};

// Main Content (Cards)
const MainContent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
      gap="4"
      p="4"
    >
      {['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'].map((product, index) => (
        <Box
          key={index}
          p="4"
          shadow="md"
          bg={theme === 'light' ? 'gray.100' : 'gray.600'}
          borderRadius="8px"
          textAlign="center"
        >
          {product}
        </Box>
      ))}
    </Grid>
  );
};

// Navbar Component
const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Flex
      as="nav"
      p="4"
      bg={theme === 'light' ? 'gray.100' : 'gray.700'}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="bold">Dashboard</Text>
      <Stack direction="row" spacing={4}>
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Stack>
    </Flex>
  );
};

// Footer Component
const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      as="footer"
      p="4"
      position="sticky"
      bottom="0"
      w="100%"
      bg={theme === 'light' ? 'gray.300' : 'gray.800'}
      color={theme === 'light' ? 'black' : 'white'}
      textAlign="center"
    >
      Footer Content
    </Box>
  );
};

// App Component
function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Navbar />
          <Flex>
            <Sidebar />
            <Box w="full" p="4">
              <MainContent />
            </Box>
          </Flex>
          <Footer />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
