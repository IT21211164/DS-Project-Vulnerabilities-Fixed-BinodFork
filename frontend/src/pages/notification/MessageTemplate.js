import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MessageTemplateForm from './MessageTemplateForm';
import TemplateList from './MessageTemplateList';

const MessageTemplate = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom marginTop={4} marginBottom={4}>
        Message Templates
      </Typography>
      <Typography align="center" marginBottom={2}>
      &quot;Create and manage message templates to streamline communication with your students.
       Use templates for common notifications such as course enrollment confirmations, event reminders,
        announcements, and more. Customize the title and content of each template to suit your needs,
       and easily send notifications using pre-defined templates.&quot;
      </Typography>
      <Grid container spacing={4} >
        <Grid item xs={12} md={8.5}>
          <TemplateList />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <MessageTemplateForm />
        </Grid>

      </Grid>
    </Container>
  );
}

export default MessageTemplate;
