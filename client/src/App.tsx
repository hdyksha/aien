import React, { useState } from "react";
import { Layout, Container, Card, Button, Alert, Input, Modal, ThemeToggle } from "./components";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Layout
      header={
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-400">AIEN</h1>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">AI English Learning Application</p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button label="Contact" variant="secondary" onClick={() => setShowModal(true)} />
          </div>
        </div>
      }
      footer={
        <div className="text-center text-secondary-500 dark:text-secondary-400 text-sm">
          &copy; {new Date().getFullYear()} AIEN. All rights reserved.
        </div>
      }
    >
      <Container maxWidth="md">
        {showAlert && (
          <Alert 
            type="info" 
            title="Welcome to AIEN" 
            onClose={() => setShowAlert(false)}
          >
            This application is currently under development. Stay tuned for the first release!
          </Alert>
        )}

        <Card title="AI English Learning" className="mb-6">
          <p className="text-secondary-700 dark:text-secondary-300 mb-4">
            Practice your English conversation skills with our AI-powered chat system.
            Learn new vocabulary and improve your fluency.
          </p>
          <div className="flex space-x-4">
            <Button label="Start Learning" variant="primary" />
            <Button label="Learn More" variant="secondary" />
          </div>
        </Card>

        <Card title="Get Started" variant="outlined">
          <p className="text-secondary-700 dark:text-secondary-300 mb-4">
            Create an account to track your progress and save your vocabulary.
          </p>
          <form className="space-y-4">
            <Input 
              label="Email" 
              type="email" 
              placeholder="your@email.com" 
              fullWidth 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              helperText="Must be at least 8 characters" 
              fullWidth 
            />
            <Button label="Sign Up" variant="primary" />
          </form>
        </Card>
      </Container>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Contact Us"
        footer={
          <div className="flex justify-end space-x-2">
            <Button label="Cancel" variant="secondary" onClick={() => setShowModal(false)} />
            <Button label="Send" variant="primary" />
          </div>
        }
      >
        <form className="space-y-4">
          <Input label="Name" placeholder="Your name" fullWidth />
          <Input label="Email" type="email" placeholder="your@email.com" fullWidth />
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-200 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white"
              rows={4}
              placeholder="How can we help you?"
            ></textarea>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}

export default App;
