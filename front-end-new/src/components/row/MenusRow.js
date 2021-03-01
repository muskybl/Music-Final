import React from 'react';
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import '../../mylib/supports/CSSClass.css'

const MenusRow = ({ items }) => {    
    const history = useHistory()
    return (
        <React.Fragment>
            {
                items.map(element => (
                    <Grid item xs={4} key={`row-item:${element.content}`}>
                        <div className='menu' onClick={() => history.push(element.link)}>
                            {element.content}
                        </div>

                    </Grid>
                ))
            }

        </React.Fragment>
    );
}

export default React.memo(MenusRow);
