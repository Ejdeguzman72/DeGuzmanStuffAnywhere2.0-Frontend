import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GnocchiSpinachPestoRecipeBtn  =  () => {
    return (
        <Button variant="outline-info">
            <Link to="/gnocchi-spinach-pesto-recipe">
                Click Here!
            </Link>
        </Button>
    )
}

export default GnocchiSpinachPestoRecipeBtn;