import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Papa from 'papaparse';
import { useSetRecoilState } from 'recoil';
import { csvState } from '../state/csvState';
import { Form, Button, Modal } from 'react-bootstrap';

FileUploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedFile: PropTypes.object,
  setSelectedFile: PropTypes.func.isRequired
};

export default function FileUploadModal({
  show,
  handleClose,
  selectedFile,
  setSelectedFile
}) {
  // Making states and defaults available:
  const setCSVData = useSetRecoilState(csvState);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  // Method to handle all closing and clearing of data
  function clearAndClose() {
    setSelectedFile({});
    handleClose();
    setUploading(false);
  }

  // Method to handle parsing of parsing of CSV into state and closing of modal.
  const uploadAndClose = () => {
    setUploading(true);
    const input = inputRef?.current;
    const reader = new FileReader();
    const [file] = input.files;

    reader.onloadend = ({ target }) => {
      setCSVData(
        Papa.parse('id,domain,favicon\r\n'.concat(target.result), {
          header: true,
          newline: '\r\n',
          skipEmptyLines: false
        })
      );
    };

    reader.readAsText(file);
    setUploading(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload CSV Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              Get started Uploading{' '}
              <a href="https://nextjs.org">Alexa Top 1000 Domains</a> here as a
              csv!
              <br />
              Expected format:
              <code>
                <br /> &emsp; 1,domain1.com
                <br /> &emsp; 2,domain2.com
              </code>
            </Form.Label>
            <Form.Control
              type="file"
              data-testid="file_input"
              ref={inputRef}
              onChange={(event) => setSelectedFile(event.target.files[0])}
              isValid={selectedFile.type === 'application/vnd.ms-excel'}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={uploadAndClose}
            disabled={
              (selectedFile.type !== 'application/vnd.ms-excel' && selectedFile.type !== '.csv') || uploading
            }
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
          <Button variant="secondary" onClick={clearAndClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
