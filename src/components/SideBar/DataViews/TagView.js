import { useContext } from 'react';
import { FormControl, Table, Button } from 'react-bootstrap';
import { DataContext, DEFAULT_TAG_ID, ACTION_TOGGLE_OBJECT_VISIBILITY } from '../../../contexts/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlay, faPlus, faPause } from '@fortawesome/free-solid-svg-icons';


const TagRow = ({ tag }) => {

    const { dispatch } = useContext(DataContext);

    const handleOnDataChange = (event) => {

        const dispatchType = event.target.getAttribute('dispatchType');
        let value = event.target.value;
        let tagId = event.target.getAttribute('tagid');


        dispatch({
            type: dispatchType,
            payload: {
                tagId: tagId,
                data: value,
            }
        });
    }

    const handleDeleteTagButtonClick = (event) => {
        const tagId = event.target.getAttribute('tagid');

        if (tagId == DEFAULT_TAG_ID) {
            return;
        }
        dispatch({
            type: 'DELETE_TAG',
            payload: {
                tagId: tagId
            }
        });
    }

    const handleActiveButtonClick = (event) => {
        dispatch({
            type: ACTION_TOGGLE_OBJECT_VISIBILITY,
            payload: {
                object: tag,
                isActive: !tag.isActive
            }
        });
    }

    return (
        <tr>
            <td><FormControl type="text" defaultValue={tag.name} dispatchtype="SET_TAG_NAME" tagid={tag.id} onChange={handleOnDataChange} /></td>
            <td><FormControl type="color" defaultValue={tag.colour} dispatchtype="SET_TAG_COLOUR" tagid={tag.id} onChange={handleOnDataChange} /></td>
            <td><Button><FontAwesomeIcon onClick={handleActiveButtonClick} icon={tag.isActive ? faPlay: faPause} /></Button></td>
            <td>{tag.id != DEFAULT_TAG_ID && <Button variant="danger" tagid={tag.id} onClick={handleDeleteTagButtonClick}><FontAwesomeIcon icon={faMinus} /></Button>}</td>
        </tr>
    );
}


const TagTable = () => {

    const { state, dispatch } = useContext(DataContext);
    const { tags } = state;

    const handleAddTagButtonClick = (event) => {
        dispatch({
            type: 'ADD_TAG',
        })
    };

    return (
        <Table className='override-bs'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Colour</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tags.map((tag) => {
                    return <TagRow key={tag.id} tag={tag} />
                })}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Button variant="success" className="theme-active-primary" onClick={handleAddTagButtonClick}><FontAwesomeIcon icon={faPlus} /></Button></td>
                </tr>
            </tbody>
        </Table>
    )
}


const TagView = () => {
    return (
        <div>
            <h1>Tags</h1>
            <TagTable />
        </div>
    );
}

export default TagView;