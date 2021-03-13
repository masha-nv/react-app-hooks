import React, { useState } from "react";
import { Card, ListGroupItem, Button, Collapse, Badge } from "react-bootstrap";

const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  const styles = open ? "inline" : "";
  return (
    <ListGroupItem style={{ wordBreak: "break-word" }} className='my-3'>
      {/* <Card > */}
      <Card.Body className='d-flex justify-content-between'>
        <div>
          <Card.Title>
            {job.title}
            <span className='text-secondary font-weight-light ml-4'>
              {job.company}
            </span>
            <p className='text-muted mt-3' style={{ fontSize: ".8rem" }}>
              {new Date(job.created_at).toLocaleDateString()}
            </p>
          </Card.Title>
          <Badge variant='secondary' className='mb-5 mr-4 p-2'>
            {job.type}
          </Badge>
          <Badge variant='secondary' className='mb-5 p-2'>
            {job.company}
          </Badge>
          <p>{job.how_to_apply}</p>
          <Button
            className='mb-3'
            aria-controls='collapse-description'
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
          <Card.Text
            style={{
              cursor: "pointer",
              lineHeight: "1.8rem",
              wordWrap: "break-word",
            }}
          >
            {job.description.substring(0, 100)}
            <span>{open ? "" : "..."}</span>
            <Collapse
              in={open}
              style={{ display: styles, wordBreak: "break-all" }}
            >
              <div id='collapse-description' style={{ wordBreak: "break-all" }}>
                {job.description.substring(100)}
              </div>
            </Collapse>
          </Card.Text>
        </div>
        <div>
          <Card.Img
            src={job.company_logo}
            variant='right'
            className='img-fluid d-none d-md-block'
            style={{ width: "100px" }}
          />
        </div>
      </Card.Body>
      {/* </Card> */}
    </ListGroupItem>
  );
};

export default Job;
