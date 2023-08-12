import { useContext } from 'react';
import { FormControl, Table } from 'react-bootstrap';
import { DataContext } from '../../contexts/DataContext';


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

    return (
        <tr>
            <td><FormControl type="text" defaultValue={tag.name} dispatchtype="SET_TAG_NAME" tagid={tag.id} onChange={handleOnDataChange} /></td>
            <td><FormControl type="color" defaultValue={tag.colour} dispatchtype="SET_TAG_COLOUR" tagid={tag.id} onChange={handleOnDataChange} /></td>
        </tr>
    );
}


const TagTable = () => {

    const { state } = useContext(DataContext);
    const { tags } = state;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Colour</th>
                </tr>
            </thead>
            <tbody>
                {tags.map((tag) => {
                    return <TagRow tag={tag} />
                })}
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