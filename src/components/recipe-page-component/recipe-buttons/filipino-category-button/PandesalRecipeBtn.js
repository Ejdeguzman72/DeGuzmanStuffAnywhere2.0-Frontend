import React from  'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PandesalRecipeBtn = () => {
    return (
        <Button variant="outline-info">
            <Link to="/pandesal-recipe">
                Click Here!
            </Link>
        </Button>
    )
}

export default PandesalRecipeBtn;