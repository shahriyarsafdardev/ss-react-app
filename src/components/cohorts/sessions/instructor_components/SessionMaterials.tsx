import { useState } from 'react';
import { Container, Box, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/styles';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { GroupedSessionMaterial } from '../../../../@types/cohorts';
import PreReadingRow from '../../home/PreReadingRow';
import { useDispatch } from '../../../../redux/store';
import { updateMaterialStatus } from '../../../../redux/slices/cohort';
import SessionMaterialForm from './SessionMaterialForm';

const ResourcesContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  ul: {
    marginLeft: '25px'
  }
}));

const StyledButton = styled(Button)(() => ({
  width: '100%',
  marginTop: '10px'
}));

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)'
  }
});

type SessionMaterialProps = {
  groupedMaterialsProp: GroupedSessionMaterial[];
  sessionId: string | undefined;
  cohortId: string | undefined;
  onTrack: Function;
};

export default function SessionMaterials({
  groupedMaterialsProp,
  sessionId,
  cohortId,
  onTrack
}: SessionMaterialProps) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [category, setCategory] = useState('Pre-Reading');

  const [groupedMaterials, setGroupedMaterials] =
    useState<GroupedSessionMaterial[]>(groupedMaterialsProp);

  const onUpdate = (data: GroupedSessionMaterial[]) => {
    axios.post(
      `/cohort_sessions/${sessionId}/session_materials/update_session_materials_order.json`,
      {
        data
      }
    );
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const tempMaterials: GroupedSessionMaterial[] = [...groupedMaterials];

      let affectedArray = [...tempMaterials[source.droppableId].session_materials];
      const [removed] = affectedArray.splice(source.index, 1);

      affectedArray.splice(destination.index, 0, removed);

      affectedArray = affectedArray.map((item, index) => ({ ...item, index }));

      tempMaterials[destination.droppableId] = {
        ...tempMaterials[destination.droppableId],
        session_materials: affectedArray
      };

      setGroupedMaterials(tempMaterials);
      onUpdate(tempMaterials);
    } else {
      const tempMaterials: GroupedSessionMaterial[] = [...groupedMaterials];

      let sourceItems = [...tempMaterials[source.droppableId].session_materials];
      const [removed] = sourceItems.splice(source.index, 1);

      let destinationItems = [...tempMaterials[destination.droppableId].session_materials];

      destinationItems.splice(destination.index, 0, removed);

      sourceItems = sourceItems.map((item, index) => ({ ...item, index }));
      destinationItems = destinationItems.map((item, index) => ({ ...item, index }));

      tempMaterials[destination.droppableId] = {
        ...tempMaterials[destination.droppableId],
        session_materials: destinationItems
      };

      tempMaterials[source.droppableId] = {
        ...tempMaterials[source.droppableId],
        session_materials: sourceItems
      };

      setGroupedMaterials(tempMaterials);
      onUpdate(tempMaterials);
    }
  };

  const onSavePrereading = (data: any) => {
    const uploadData = new FormData();

    uploadData.append('title', data.title);
    uploadData.append('source', data.source);
    uploadData.append('url', data.url);
    uploadData.append('category', category);
    uploadData.append('file', data.file);

    axios
      .post(`/cohort_sessions/${sessionId}/session_materials.json`, uploadData)
      .then((res) => {
        const tempMaterials: GroupedSessionMaterial[] = [...groupedMaterials];
        const index = tempMaterials.findIndex(
          (material) => material.category === res.data.category
        );

        tempMaterials[index] = {
          ...tempMaterials[index],
          session_materials: [res.data, ...tempMaterials[index].session_materials]
        };
        setGroupedMaterials(tempMaterials);
        enqueueSnackbar('Prereading created successfully', { variant: 'success' });
        setModalState(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (groupedMaterials.length === 0) {
    return null;
  }

  return (
    <ResourcesContainer id="session_materials">
      <SessionMaterialForm
        modalState={modalState}
        modalHandler={setModalState}
        action="create"
        category={category}
        onSave={(formData: any) => onSavePrereading(formData)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        {groupedMaterials.map((group, index) => (
          <Droppable key={group.category} droppableId={`${index}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ marginBottom: '20px' }}
              >
                <Box>
                  <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{group.category}s:</p>

                  <div style={{ maxHeight: '500px', overflowY: 'scroll', paddingBottom: '50px' }}>
                    {group.session_materials.map((preReading, index) => (
                      <Draggable draggableId={preReading.id} index={index} key={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? classes.draggingListItem : ''}
                          >
                            <div style={{ display: 'flex' }}>
                              <div style={{ display: 'flex', maxWidth: '25px' }}>
                                <img
                                  src="/static/icons/drag-dots.svg"
                                  alt="dots"
                                  // style={{ width: '1.5rem' }}
                                />
                              </div>
                              <PreReadingRow
                                onPreReadingClick={() => {}}
                                // onPreReadingClick={() => onTrack('Opened Resource from Sessions Page')}
                                key={preReading.index}
                                item={preReading}
                                number={preReading.index}
                                checkboxHanlder={(value: boolean) => {
                                  // onTrack(`Marked Item as ${value ? 'true' : 'false'} from Sessions Page`);
                                  // dispatch(updateMaterialStatus(cohortId, sessionId, preReading.id, value));
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  <StyledButton
                    onClick={() => {
                      setCategory(group.category);
                      setModalState(true);
                    }}
                    variant="outlined"
                    startIcon={<img src="/static/icons/plus-icon.svg" alt="plus" />}
                  >
                    Add {group.category}
                  </StyledButton>
                </Box>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </ResourcesContainer>
  );
}
