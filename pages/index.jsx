import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { csvState, itemSelector } from '../state/csvState';
import Papa from 'papaparse';
import FileUploadModal from '../components/fileUploadModal';
import AddFavIcon from '../components/addFavIcon';
import CSVTable from '../components/table';

export default function Home() {
  const reset = useResetRecoilState(csvState);
  const [data, setData] = useRecoilState(itemSelector);
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setShow(true);
    setSelectedFile({});
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(data.data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(csvData);
    tempLink.setAttribute('download', 'download.csv');
    tempLink.click();
  };

  async function callAddFavIcon() {
    await AddFavIcon(data, setData);
  }

  return (
    <Container className="md-container">
      <Container>
        <h1> Welcome to Favicon Finder! </h1>
        <h5>Designed to enable you to quickly find all the favicons!</h5>
        <br />
        <Button variant="primary" onClick={handleShow}>
          Upload CSV
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="primary"
          onClick={callAddFavIcon}
          disabled={!data.data || data?.data?.length < 1}
        >
          Get FavIcons
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={downloadCSV}
          disabled={!data.data || data?.data?.length < 1}
        >
          Export CSV
        </Button>
        &nbsp;&nbsp;
        <Button onClick={reset} disabled={!data.data || data?.data?.length < 1}>
          Clear
        </Button>
        <FileUploadModal
          show={show}
          handleClose={handleClose}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <br />
        <br />
        <CSVTable />
      </Container>
    </Container>
  );
}
