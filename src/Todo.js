import React, { useState } from 'react'
import { List, ListItem, ListItemText, Modal, Input, Button } from '@material-ui/core'
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const classes = useStyles();

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge:true})
        setOpen(false)
        setInput('')
    }

    return (
        <>
            <Modal open={open}
                onClose={e => setOpen(false)}>
                <div className="modal">
                    <div className={classes.paper}>
                        <h1>I am a Modal</h1>
                        <form>
                            <Input  placeholder={props.todo.todo} autoFocus value={input} onChange={event => setInput(event.target.value)}></Input>
                            <Button disabled={!input} onClick={updateTodo}>Update</Button>
                        </form>
                    </div>
                </div>
            </Modal>
            <List>
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary="Dummy Deadline 🕥"></ListItemText>
                    <EditIcon onClick={e => setOpen(true)}></EditIcon>
                    <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}></DeleteForeverIcon>
                </ListItem>
            </List>
        </>
    )
}

export default Todo
