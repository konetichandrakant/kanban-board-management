import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditNoteModal({ show, onHide, initialTitle, initialContent, type, index, onSave }) {
  console.log(initialContent)
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave({ data: { title: title, description: content }, type: type, index: index });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="titleTextArea">
          <Form.Label>Title</Form.Label>
          <Form.Control
            as="textarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title..."
          />
        </Form.Group>
        <Form.Group controlId="contentTextArea">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Enter the content..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditNoteModal;