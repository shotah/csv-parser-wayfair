import React from 'react';
import Link from 'next/link';
import { Container, Breadcrumb, Button } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>About</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          About
          <Link href="/" passHref>
            <Button variant="primary">
              back
              {'\n'}
              &larr;
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default About;
