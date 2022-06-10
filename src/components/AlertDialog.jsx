import React from 'react';
import { Paragraph, Dialog, Portal, Button } from 'react-native-paper';

export const AlertDialog = ({ visible, title, message, action, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title
        // style={}
        >
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="outlined" onPress={hideDialog} style={{ width: 100 }}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={action}
            style={{ width: 100, marginLeft: 12 }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
