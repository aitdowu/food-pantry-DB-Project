import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FoodItems from './components/FoodItems';
import Donors from './components/Donors';
import Recipients from './components/Recipients';
import Distributions from './components/Distributions';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Food Pantry Management System
                        </Typography>
                        <Button color="inherit" component={Link} to="/food-items">Food Items</Button>
                        <Button color="inherit" component={Link} to="/donors">Donors</Button>
                        <Button color="inherit" component={Link} to="/recipients">Recipients</Button>
                        <Button color="inherit" component={Link} to="/distributions">Distributions</Button>
                    </Toolbar>
                </AppBar>
                <Box
                   
                >
                    <Container
                      sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: 'calc(100vh - 150px)',
                          textAlign: 'center',
                      }}
                  >
                      <Routes>
                          <Route path="/food-items" element={<FoodItems />} />
                          <Route path="/donors" element={<Donors />} />
                          <Route path="/recipients" element={<Recipients />} />
                          <Route path="/distributions" element={<Distributions />} />
                      </Routes>
                  </Container>
                </Box>
            </Box>
        </Router>
    );
}

export default App; // Default export