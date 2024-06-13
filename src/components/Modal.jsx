import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';

function showModal (movie){
    return (
        <Modal className='movie-modal'>
            <Modal.Body className = 'modal-card-details'>
                <Modal.Header>
                    <CloseButton className='close-button'></CloseButton>
                </Modal.Header>
                <Modal.Title>{movie.title}</Modal.Title>
                <Image src = {movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`:null} alt = "Movie image" className='movie-pic'></Image>
                <h4> Runtime: {movie.runtime}</h4>
                <h4>Release Date: {movie.release_date}</h4>
                <h4>Blurb: {movie.overview}</h4>
            </Modal.Body>
        </Modal>
    )
}
export default showModal;