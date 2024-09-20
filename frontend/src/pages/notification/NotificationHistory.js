import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, RadioGroup,
  FormControlLabel, Radio} from '@mui/material';

function NotificationHistory() {
  const [smsHistory, setSmsHistory] = useState([]);
  const [emailHistory, setEmailHistory] = useState([]);
  const [selectedOption, setSelectedOption] = useState('sms');

  useEffect(() => {
    // Fetch notification history
    const fetchNotificationHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4003/learnup/api/notification/notification-history');
        const { smsHistory, emailHistory } = response.data;
        setEmailHistory(emailHistory);
        setSmsHistory(smsHistory);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotificationHistory();
  }, []);

  const refreshNotificationHistory = async () => {
    try {
      const response = await axios.get('http://localhost:4003/learnup/api/notification/notification-history');
      const { smsHistory, emailHistory } = response.data;
      setEmailHistory(emailHistory);
      setSmsHistory(smsHistory);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container width={100}>
      <Box mb={4}>
        <Typography variant="h4" align="center" gutterBottom marginTop={4} marginBottom={4}>
          Notification History
        </Typography>
        <Box marginBottom={2}>
        <Button variant="contained" href="/admin/dashboard/notification/" style={{ backgroundColor:"#92e3a9", marginRight:5}}>
          <Typography color={'black'}>Back</Typography>
        </Button>
        <Button variant="contained" onClick={refreshNotificationHistory} style={{ backgroundColor:"#92e3a9" }}>
          <Typography color={'black'}>Refresh</Typography>
        </Button>
        </Box>
        <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
          <FormControlLabel value="sms" control={<Radio />} label="SMS History" />
          <FormControlLabel value="email" control={<Radio />} label="Email History" />
        </RadioGroup>
      </Box>
      {selectedOption === "sms"?
        <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          SMS History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date/Time</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {smsHistory.map((notification, index) => (
                <TableRow key={index}>
                  <TableCell>{notification.dateTime}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      :
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Email History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date/Time</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emailHistory.map((notification, index) => (
                <TableRow key={index}>
                  <TableCell>{notification.dateTime}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>{notification.emailSubject}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      } 
    </Container>
  );
}

export default NotificationHistory;
