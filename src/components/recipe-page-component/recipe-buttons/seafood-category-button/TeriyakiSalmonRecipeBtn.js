import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TeriyakiSalmonRecipeBtn  =  () => {
    return (
        <Button variant="outline-info">
            <Link to="teriyaki-salmon-recipe">
                Click Here!
            </Link>
        </Button>
    )
}

export default TeriyakiSalmonRecipeBtn;