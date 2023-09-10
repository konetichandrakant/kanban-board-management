import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import EditNoteModal from './EditNoteModal';
import AddContentModal from './AddContentModal';
import { BASE_URL } from '../validations';
import Cookies from 'js-cookie';

function Home() {
  /*
    -> tasks todo in one list
    -> tasks doing in one list
    -> tasks done in one list
  */

  // edit functionality should be enabled for each

  const changeHeadings = { 'todo': 'Todo', 'doing': 'Doing', 'done': 'Done' };

  const [tasks, setTasks] = useState(null);
  const [type, setType] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState('');
  const navigate = useNavigate();

  console.log(editedNote);

  useEffect(() => {
    getData();
  }, [])

  const handleEditNote = (note) => {
    setEditedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (editedNote) => {
    let mid = { ...tasks }
    mid[editedNote['type']][editedNote['index']] = editedNote['data'];
    setTasks(mid);
    postData(mid);
  };

  const handleCreateNote = (createNote) => {
    let mid = { ...tasks }
    mid[createNote['type']] = [{ title: createNote['title'], description: createNote['description'] }, ...mid[createNote['type']]];
    setType(null);
    setTasks(mid);
    postData(mid);
  }


  const getData = () => {
    axios.get(`${BASE_URL}/tasks`, { withCredentials: true })
      .then((resp) => {
        setTasks(resp.data)
      }).catch((reason) => {
        console.log(reason)
      });
  }

  const postData = (data) => {
    axios.post(`${BASE_URL}/tasks`, data, { withCredentials: true })
      .then(() => {
        console.log('data saved');
      }).catch(() => {
        console.log('error');
      });
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
    let mid = { ...tasks }
    const value = mid[result['source']['droppableId']][result['source']['index']]
    mid[result['source']['droppableId']].splice(result['source']['index'], 1);
    const newArray = [...mid[result['destination']['droppableId']].slice(0, result['destination']['index']),
      value,
    ...mid[result['destination']['droppableId']].slice(result['destination']['index'])]
    mid[result['destination']['droppableId']] = newArray;
    setTasks(mid);
    postData(mid);
  }

  const deleteCard = (name, j) => {
    let mid = { ...tasks }
    mid[name].splice(j, 1)
    setTasks(mid);
    postData(mid);
  }

  return (
    <>
      {
        tasks === null && (
          <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div>
              Loading please wait...
            </div>
          </div>
        )
      }
      {
        tasks === false && (
          <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              Login by click this button <button class='btn btn-primary' onClick={() => { navigate('/login') }}>LOGIN</button>
            </div>
          </div>
        )
      }
      {
        tasks !== null && tasks !== false && (
          <div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div>
                <div class="d-flex justify-content-between">
                  <h2>
                    Kanban Board Task Management
                  </h2>
                  <span>
                    <button class='btn btn-danger' onClick={() => { Cookies.remove('token'); navigate('/login'); }}>
                      Log Out <i class="bi bi-box-arrow-right" />
                    </button>
                  </span>
                </div>
                <div class="d-flex justify-content-around align-content-center flex-wrap" style={{ backgroundColor: 'aqua', minHeight: '90vh' }}>
                  {
                    Object.keys(tasks).map((type, ind) => {
                      return (
                        <div class='d-flex flex-column justify-content-center' style={{ backgroundColor: '#d3d3d3', borderRadius: '5px' }}>
                          <div class="d-flex justify-content-center">
                            <h3>{changeHeadings[type]}</h3>
                          </div>
                          <div class="d-flex justify-content-center">
                            <Droppable droppableId={type} index={ind}>
                              {
                                (provided) => (
                                  <div ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    class="pb-3 flex-column justify-content-center"
                                    style={{ width: '300px', maxHeight: '80vh', overflowY: 'scroll' }}>
                                    {
                                      tasks[type].map((x, i) => {
                                        return (
                                          <Draggable draggableId={`${type} ${i}`} index={i}>
                                            {
                                              (provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  <div class='card' style={{ margin: '10px' }}>
                                                    <div class='card-body' style={{ paddingBottom: '0px' }}>
                                                      <h5 class="card-title">
                                                        {x.title}
                                                      </h5>
                                                      <span class="card-text">
                                                        {x.description}
                                                      </span>
                                                    </div>
                                                    <div class="card-body d-flex justify-content-evenly">
                                                      <span class='ml-20' style={{ cursor: 'pointer' }}>
                                                        <i class="bi bi-pencil-square bi-100g" onClick={(e) => { e.preventDefault(); handleEditNote({ data: x, type: type, index: i }) }} />
                                                      </span>
                                                      <span class='mr-20' style={{ cursor: 'pointer' }}>
                                                        <i class="bi bi-trash-fill bi-100g" onClick={(e) => { e.preventDefault(); deleteCard(type, i) }} />
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {provided.placeholder}
                                                </div>
                                              )
                                            }
                                          </Draggable>
                                        )
                                      })
                                    }
                                    {provided.placeholder}
                                  </div>
                                )
                              }
                            </Droppable>
                          </div>
                          <div class='d-flex justify-content-center' style={{ marginBottom: '3px' }}>
                            <span>
                              <button onClick={() => { setIsAddModalOpen(true); setType(type); }} className='btn btn-primary'>Add Card</button>
                            </span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </DragDropContext>
            {
              editedNote !== '' && (
                <EditNoteModal
                  show={isModalOpen}
                  onHide={() => setIsModalOpen(false)}
                  initialTitle={editedNote.data.title}
                  initialContent={editedNote.data.description}
                  type={editedNote.type}
                  index={editedNote.index}
                  onSave={(editedNote) => {
                    handleSaveNote(editedNote);
                    setIsModalOpen(false);
                  }}
                />
              )
            }
            {
              type && (
                <AddContentModal
                  show={isAddModalOpen}
                  onHide={() => setIsAddModalOpen(false)}
                  type={type}
                  onSave={(newNote) => {
                    handleCreateNote(newNote);
                    setIsAddModalOpen(false);
                  }}
                />
              )
            }
          </div>
        )
      }
    </>
  )
}

export default Home